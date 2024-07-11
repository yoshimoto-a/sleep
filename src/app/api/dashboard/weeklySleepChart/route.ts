import { SleepingSituation } from "@prisma/client";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { type NextRequest } from "next/server";
import { getBabyId } from "../../_utils/getBabyId";
import { SleepChartDataGenerator } from "../sleep/_utils/SleepChartDataGenerator";
import { FindLatestResponse } from "../sleep/_utils/findLatest";
import { getTotalSleepTime } from "../sleep/_utils/getTotalSleepTime";
import { findLatestData } from "./_utiles/findLatestData";
import { formatData } from "./_utiles/formatData";
import {
  ChartData,
  FormatedData,
} from "@/app/_types/apiRequests/dashboard/sleep";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) Response.json({ status: 401, message: "Unauthorized" });
  try {
    //検索対象の日付を取得する
    const params = req.nextUrl.searchParams;
    const strDate = params.get("date");
    if (!strDate)
      return Response.json({ status: 401, message: "date is undefined" });

    const date = dayjs.tz(strDate, "Asia/Tokyo");
    const dateRanges: { startOfDay: Date; endOfDay: Date }[] = [];
    for (let i = 0; i < 7; i++) {
      const startOfDay = date.subtract(i, "day").startOf("day").toDate();
      const endOfDay = date.subtract(i, "day").endOf("day").toDate();
      dateRanges.push({ startOfDay, endOfDay });
    }

    //ユーザーに紐づくbabyId取得する
    const babyId = await getBabyId(token);

    //promise.allで当日を含むデータを一気に取得する
    const respData = await Promise.all(
      dateRanges.map(item => {
        return prisma.sleepingSituation.findMany({
          where: {
            babyId,
            OR: [
              {
                bedTime: {
                  gte: item.startOfDay,
                  lt: item.endOfDay,
                },
              },
              {
                sleep: {
                  gte: item.startOfDay,
                  lt: item.endOfDay,
                },
              },
              {
                wakeup: {
                  gte: item.startOfDay,
                  lt: item.endOfDay,
                },
              },
            ],
          },
          orderBy: { wakeup: "asc" },
        });
      })
    );

    const yesterdayData = await Promise.all(
      dateRanges.map(item => {
        return prisma.sleepingSituation.findMany({
          where: {
            babyId,
            wakeup: {
              lt: item.startOfDay,
            },
          },
          orderBy: {
            wakeup: "desc",
          },
          take: 1,
        });
      })
    );

    //現在の活動時間等を取得するため常に現在の日時で取得する
    const latest: SleepingSituation[] = await prisma.$queryRaw`
    SELECT *
    FROM "SleepingSituation"
    WHERE "babyId" = ${babyId}
    ORDER BY GREATEST(COALESCE("wakeup", '1970-01-01'), COALESCE("sleep", '1970-01-01')) DESC
    LIMIT 1;
  `;
    let latestData: FindLatestResponse | undefined;
    latestData = findLatestData(latest[0]);

    //前日以前のデータの有無で呼び出す関数を変える
    //ユーザーの初期登録が済んで登録し始めた1日目(＝前日のデータがない)
    const data: ChartData[] = [];
    const totalSleepTime: number[] = [];
    const keyname: string[][] = [];
    for (let i = 0; i < 7; i++) {
      const formatedData: FormatedData[] = formatData(
        respData[i],
        yesterdayData[i],
        dateRanges[i].startOfDay
      );
      const sleepChartDataGenerator = new SleepChartDataGenerator(
        formatedData,
        latestData,
        dateRanges[i].startOfDay
      );
      const { chartData, keyName } =
        sleepChartDataGenerator.generateChartData();

      data.push(chartData);
      totalSleepTime.push(getTotalSleepTime(chartData));
      keyname.push(keyName);
    }

    return Response.json({
      status: 200,
      message: "success",
      chartData: data.reverse(),
      keyname: Array.from(new Set(keyname.flat())),
      totalSleepTime,
      latestData,
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, message: e.message });
    }
  }
};
