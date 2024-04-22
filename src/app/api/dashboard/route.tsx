//リファクタリングしたいけどわからない。。
import { supabase } from "@/utils/supabase";
import { buildPrisma } from "@/utils/prisema";
import { type NextRequest } from "next/server";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { SleepingSituation } from "@/app/_types/apiRequests/dashboard/sleep";
import { ContainNull } from "@/app/_types/dashboard/change";
import { CompletedData } from "@/app/_types/dashboard/change";
import { formatRecords } from "./sleep/_utils/formatRecords";

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
  const { data, error } = await supabase.auth.getUser(token);
  if (error) Response.json({ status: 401, message: "Unauthorized" });
  try {
    //検索対象の日付を取得する
    const params = req.nextUrl.searchParams;
    const date = params.get("date");
    const startOfDay = dayjs.tz(date, "Asia/Tokyo").startOf("day").toDate();
    const endOfDay = dayjs.tz(date, "Asia/Tokyo").endOf("day").toDate();
    //ユーザーに紐づくbabyId取得する
    if (!data.user)
      return Response.json({ status: 400, message: "Userdata is null" });
    const user = await prisma.user.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
      include: {
        baby: {
          select: {
            id: true,
          },
        },
      },
    });
    const babyId = user?.babyId;
    if (!babyId)
      return Response.json({ status: 400, message: "BabyId is null" });

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
    });
    const mappedContainTodayRecords: CompletedData[] = containTodayRecords.map(
      record => FormatNotContainNull(record)
    );

    //必要な時に備えて前日に起床した最後のレコードを取得しておく
    const startOfYesterday = dayjs(startOfDay)
      .subtract(1, "d")
      .startOf("day")
      .toDate();
    const endOfYesterday = dayjs(startOfDay)
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
    //2件以上はあってはいけない。まず最初のデータになる
    const containYesterdayRecord = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        AND: [
          {
            OR: [
              {
                bedTime: {
                  gte: startOfYesterday,
                  lt: endOfYesterday,
                },
              },
              {
                sleep: {
                  gte: startOfYesterday,
                  lt: endOfYesterday,
                },
              },
              {
                wakeup: {
                  gte: startOfYesterday,
                  lt: endOfYesterday,
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
    const mappedContainYesterdayRecord: ContainNull[] =
      containYesterdayRecord.map(record => FormatContainNull(record));

    //必要な時に備えて翌日に寝たか起きたレコードを取得しておく
    const startOfTomorrow = dayjs(startOfDay)
      .add(1, "d")
      .startOf("day")
      .toDate();
    const endOfTomorrow = dayjs(startOfDay).add(1, "d").endOf("day").toDate();
    //当日と翌日が混じったデータ
    //2件以上はあってはいけない。まず最初のデータになる
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

    const formatData = formatRecords(
      mappedCompletedRecords,
      mappedContainNullRecords,
      mappedContainTodayRecords,
      mappedYesterdayRecord,
      mappedContainYesterdayRecord,
      mappedContainTomorrowRecord
    );
    return Response.json({
      status: 200,
      message: "success",
      data: formatData,
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, message: e.message });
    }
  }
};
