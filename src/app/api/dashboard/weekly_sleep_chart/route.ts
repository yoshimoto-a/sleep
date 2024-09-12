import { SleepingSituation } from "@prisma/client";
import { type NextRequest } from "next/server";
import { dayjs } from "../../../../utils/dayjs";
import { SleepChartDataGenerator } from "../../_utils/SleepChartDataGenerator";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { findLatestData } from "./_utils/findLatestData";
import { splitDataByDate } from "./_utils/splitDataByDate";
import { FindLatestResponse } from "@/app/_types/apiRequests/dashboard/nextSleepTime";
import { buildPrisma } from "@/utils/prisema";

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
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
    const { babyId } = await getUserAndBabyIds(token);
    const endOfDay = date.endOf("day").toDate();
    const startOfRange = date.subtract(6, "day").startOf("day").toDate();

    const respData = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        OR: [
          {
            bedTime: {
              gte: startOfRange,
              lt: endOfDay,
            },
          },
          {
            sleep: {
              gte: startOfRange,
              lt: endOfDay,
            },
          },
          {
            wakeup: {
              gte: startOfRange,
              lt: endOfDay,
            },
          },
        ],
      },
      orderBy: { wakeup: "asc" },
    });

    const sleepData = splitDataByDate(respData, dateRanges);

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
    let latestData: FindLatestResponse;
    const action = findLatestData(latest[0]);
    latestData = {
      record: latest[0],
      action,
    };

    const sleepChartDataGenerator = new SleepChartDataGenerator(
      [],
      latestData,
      dateRanges,
      sleepData,
      yesterdayData
    );
    const { data, totalSleepTimeAverage, keyname } =
      sleepChartDataGenerator.generateChartDatas();

    return Response.json({
      status: 200,
      message: "success",
      chartData: data.reverse(),
      keyname: Array.from(new Set(keyname.flat())),
      totalSleepTimeAverage: `${Math.floor(
        totalSleepTimeAverage / 60
      )}時間${Math.floor(totalSleepTimeAverage % 60)}分`,
      latestData,
    });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json({ status: 400, message: e.message });
    }
  }
};
