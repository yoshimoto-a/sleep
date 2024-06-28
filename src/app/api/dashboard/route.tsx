import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { type NextRequest } from "next/server";
import { getBabyId } from "../_utils/getBabyId";
import { findLatest } from "./sleep/_utils/findLatest";
import { FindLatestResponse } from "./sleep/_utils/findLatest";
import { formatRecordsWithYesterdayData } from "./sleep/_utils/formatRecordsWithYesterdayData";
import { formatRecordsWithoutYesterdayData } from "./sleep/_utils/formatRecordsWithoutYesterdayData";
import { generateChartData } from "./sleep/_utils/generateChartData";
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
import { ContainNull } from "@/app/_types/dashboard/change";
import { CompletedData } from "@/app/_types/dashboard/change";
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
    const date = params.get("date");
    if (!date)
      return Response.json({ status: 401, message: "date is undefined" });
    const startOfDay = dayjs.tz(date, "Asia/Tokyo").startOf("day").toDate();
    const endOfDay = dayjs.tz(date, "Asia/Tokyo").endOf("day").toDate();

    //ユーザーに紐づくbabyId取得する
    const babyId = await getBabyId(token);

    //bedtime(null許容)以外すべて当日で完成したデータのみ
    const completedRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        AND: [
          {
            OR: [
              {
                bedTime: null,
              },
              {
                bedTime: {
                  gte: startOfDay,
                  lt: endOfDay,
                },
              },
            ],
          },
          {
            sleep: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
          {
            wakeup: {
              gte: startOfDay,
              lt: endOfDay,
            },
          },
        ],
      },
      orderBy: { wakeup: "asc" },
    });

    const mappedCompletedRecords: CompletedData[] = completedRecords.map(
      record => FormatNotContainNull(record)
    );

    //当日で!sleep||!wakeup → 必ず最新で0か1件になる
    const containNullRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        OR: [
          {
            AND: [
              {
                sleep: {
                  gte: startOfDay,
                  lt: endOfDay,
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
                  gte: startOfDay,
                  lt: endOfDay,
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
    const mappedContainNullRecords: ContainNull[] = containNullRecords.map(
      record => FormatContainNull(record)
    );

    //当日をbedtimeかsleepかwakeupどれかに必ず含んでいて、bedtime以外nullは許容しない
    //翌日のデータか前日のデータを含むレコード
    const containTodayRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        AND: [
          {
            OR: [
              {
                bedTime: {
                  gte: startOfDay,
                  lt: endOfDay,
                },
              },
              {
                sleep: {
                  gte: startOfDay,
                  lt: endOfDay,
                },
              },
              {
                wakeup: {
                  gte: startOfDay,
                  lt: endOfDay,
                },
              },
            ],
          },
          {
            sleep: {
              not: null,
            },
          },
          {
            wakeup: {
              not: null,
            },
          },
        ],
      },
      orderBy: { wakeup: "desc" },
    });
    const mappedContainTodayRecords: CompletedData[] = containTodayRecords.map(
      record => FormatNotContainNull(record)
    );

    //前日以前に起床した最後のレコードを取得しておく
    const startOfYesterday = dayjs
      .tz(startOfDay, "Asia/Tokyo")
      .subtract(1, "d")
      .startOf("day")
      .toDate();
    const endOfYesterday = dayjs
      .tz(startOfDay, "Asia/Tokyo")
      .subtract(1, "d")
      .endOf("day")
      .toDate();

    const yesterdayRecord = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        wakeup: {
          lt: startOfDay,
        },
      },
      orderBy: {
        wakeup: "desc",
      },
      take: 1,
    });
    const mappedYesterdayRecord: CompletedData[] = yesterdayRecord.map(record =>
      FormatNotContainNull(record)
    );

    //当日と昨日が混じったデータ
    //2件以上はあってはいけない。
    const containYesterdayRecord = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        AND: [
          {
            OR: [
              {
                AND: [
                  {
                    bedTime: null,
                  },
                  {
                    sleep: {
                      gte: startOfYesterday,
                      lt: endOfYesterday,
                    },
                  },
                ],
              },
              {
                bedTime: {
                  gte: startOfYesterday,
                  lt: endOfYesterday,
                },
              },
            ],
          },
          {
            OR: [
              {
                AND: [
                  {
                    wakeup: null,
                  },
                  {
                    sleep: {
                      gte: startOfYesterday,
                      lt: endOfYesterday,
                    },
                  },
                ],
              },
              {
                wakeup: {
                  gte: startOfDay,
                  lt: endOfDay,
                },
              },
            ],
          },
        ],
      },
    });
    const mappedContainYesterdayRecord: ContainNull[] =
      containYesterdayRecord.map(record => FormatContainNull(record));

    //必要な時に備えて翌日に寝たか起きたレコードを取得しておく
    const startOfTomorrow = dayjs
      .tz(startOfDay, "Asia/Tokyo")
      .add(1, "d")
      .startOf("day")
      .toDate();
    const endOfTomorrow = dayjs
      .tz(startOfDay, "Asia/Tokyo")
      .add(1, "d")
      .endOf("day")
      .toDate();
    //当日と翌日が混じったデータ
    //2件以上はあってはいけない。最後のデータになる
    const containTomorrowRecord = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        AND: [
          {
            OR: [
              {
                bedTime: {
                  gte: startOfTomorrow,
                  lt: endOfTomorrow,
                },
              },
              {
                sleep: {
                  gte: startOfTomorrow,
                  lt: endOfTomorrow,
                },
              },
              {
                wakeup: {
                  gte: startOfTomorrow,
                  lt: endOfTomorrow,
                },
              },
            ],
          },
          {
            OR: [
              {
                bedTime: {
                  gte: startOfDay,
                  lt: endOfDay,
                },
              },
              {
                sleep: {
                  gte: startOfDay,
                  lt: endOfDay,
                },
              },
              {
                wakeup: {
                  gte: startOfDay,
                  lt: endOfDay,
                },
              },
            ],
          },
        ],
      },
    });
    const mappedContainTomorrowRecord: ContainNull[] =
      containTomorrowRecord.map(record => FormatContainNull(record));

    //前日以前のデータの有無で呼び出す関数を変える
    //ユーザーの初期登録が済んで登録し始めた1日目(＝前日のデータがない)
    let formatData;
    if (
      mappedYesterdayRecord.length === 0 &&
      mappedContainYesterdayRecord.length === 0
    ) {
      formatData = formatRecordsWithoutYesterdayData(
        startOfDay,
        mappedCompletedRecords,
        mappedContainNullRecords,
        mappedContainTomorrowRecord,
        mappedContainTodayRecords
      );
    } else {
      //登録2日目以降(＝前日のデータがある)
      formatData = formatRecordsWithYesterdayData(
        startOfDay,
        mappedCompletedRecords,
        mappedContainNullRecords,
        mappedContainTodayRecords,
        mappedYesterdayRecord,
        mappedContainYesterdayRecord,
        mappedContainTomorrowRecord
      );
    }

    //最新のレコードを探すため、未完成のデータ(常に最新)を日付問わず取得
    const allContainNullRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        OR: [
          {
            AND: [
              {
                sleep: {
                  not: null,
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
                  not: null,
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
                wakeup: {
                  not: null,
                },
              },
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
    //未完成のデータがない場合、全てのレコードの中から完成していて最新のデータを探す
    const allCompletedRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        wakeup: {
          not: null,
        },
      },
      orderBy: {
        wakeup: "desc",
      },
      take: 1,
    });

    //現在の活動時間等を取得するため常に現在の日時で取得する
    let latestData: FindLatestResponse | undefined;

    latestData = findLatest(allContainNullRecords, allCompletedRecords);
    const chartData = generateChartData(formatData, latestData, startOfDay);
    return Response.json({
      status: 200,
      message: "success",
      data: formatData,
      latestData,
      chartData,
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, message: e.message });
    }
  }
};
