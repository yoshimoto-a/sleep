import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { type NextRequest } from "next/server";
import { getBabyId } from "../../_utils/getBabyId";
import { SleepChartDataGenerator } from "../sleep/_utils/SleepChartDataGenerator";
import { FindLatestResponse } from "../sleep/_utils/findLatest";
import { getTotalSleepTime } from "../sleep/_utils/getTotalSleepTime";
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");
const FormatContainNull = (record: SleepingSituation) => {
  return {
    id: record.id,
    bedTime: record.bedTime,
    sleep: record.sleep || null,
    wakeup: record.wakeup || null,
    changeUser: record.changeUser,
  };
};
const FormatNotContainNull = (record: SleepingSituation) => {
  return {
    id: record.id,
    bedTime: record.bedTime,
    sleep: record.sleep as Date,
    wakeup: record.wakeup as Date,
    changeUser: record.changeUser,
  };
};
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
    
    const date = dayjs.tz(strDate, "Asia/Tokyo")
    const startOfDay = date.startOf("day").toDate();
    const endOfDay = date.endOf("day").toDate();
    const dateRanges:{startOfDay:Date,endOfDay:Date}[] = [];
    for(let i=0 ; i < 7 ; i++) {
      const startOfDay = date.subtract(i, 'day').startOf('day').toDate();
      const endOfDay = date.subtract(i, 'day').endOf('day').toDate();
      dateRanges.push({ startOfDay, endOfDay });
    }

    //ユーザーに紐づくbabyId取得する
    const babyId = await getBabyId(token);

    //promise.allで当日を含むデータを一気に取得する
    const testPromiseAll = await Promise.all(dateRanges.map(item=>{
      return prisma.sleepingSituation.findMany({
        where: {
          babyId,
          OR: [
            {
              OR: [
                {
                  bedTime: null,
                },
                {
                  bedTime: {
                    gte: item.startOfDay,
                    lt: item.endOfDay,
                  },
                },
              ],
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
      })
    }))

    //bedtime(null許容)以外どこかに当日が入っている完成したデータのみ
    const completedRecords = await Promise.all(
      dateRanges.map(item=>{
return prisma.sleepingSituation.findMany({
  where: {
    babyId,
    OR: [
      {
        OR: [
          {
            bedTime: null,
          },
          {
            bedTime: {
              gte: item.startOfDay,
              lt: item.endOfDay,
            },
          },
        ],
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
})
}));


    //当日で!sleep||!wakeup → 必ず最新で0か1件になる
    const containNullRecords = await Promise.all(
      dateRanges.map(item=>{
        return prisma.sleepingSituation.findMany({
          where: {
            babyId,
            OR: [
              {
                AND: [
                  {
                    sleep: {
                      gte: item.startOfDay,
                      lt: item.endOfDay,
                    },
                  },
                  {
                    wakeup: null,
                  },
                ],
              },
              {
                AND: [
                  {
                    wakeup: {
                      gte: item.startOfDay,
                      lt: item.endOfDay,
                    },
                  },
                  {
                    sleep: null,
                  },
                ],
              },
              {
                AND: [
                  {
                    sleep: null,
                  },
                  {
                    wakeup: null,
                  },
                ],
              },
            ],
          },
        });
      })
    )
    const yesterdayRecord = await Promise.all(
      dateRanges.map(item=>{
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
    )

    //前日以前のデータの有無で呼び出す関数を変える
    //ユーザーの初期登録が済んで登録し始めた1日目(＝前日のデータがない)
    let formatData;

    //現在の活動時間等を取得するため常に現在の日時で取得する
    let latestData: FindLatestResponse | undefined;

    //latestData = findLatest(allContainNullRecords, allCompletedRecords);
    const sleepChartDataGenerator = new SleepChartDataGenerator(
      formatData,
      latestData,
      startOfDay
    );
    const { chartData, keyName } = sleepChartDataGenerator.generateChartData();
    const totalSleepTime = getTotalSleepTime(chartData);

    return Response.json({
      status: 200,
      message: "success",
      data: formatData,
      latestData,
      chartData,
      keyName,
      totalSleepTime,
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, message: e.message });
    }
  }
};
