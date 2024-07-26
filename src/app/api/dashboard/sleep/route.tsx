import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/sleep/postRequest";
import { buildPrisma } from "@/utils/prisema";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const { babyId, userId } = await getUserAndBabyIds(token);
    const body: PostRequests = await req.json();
    const { sleep } = body;
    //登録出来ないパターンが存在しないか確認する
    //パターン①連続して寝たボタン押した場合(wakeupはnullで、①bedtimeがnot null且つsleepもnot null②bedtimeがnull且つsleep はnot null)
    //パターン①-①
    const badRecords1 = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        bedTime: {
          not: null,
        },
        sleep: {
          not: null,
        },
        wakeup: null,
      },
    });
    if (badRecords1.length !== 0)
      return Response.json({
        status: 400,
        message:
          "寝た～起きたまで完成していないデータがあります。過去データの場合は一括登録をご使用ください。",
      });
    //パターン①-②
    const badRecords2 = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        bedTime: null,
        sleep: {
          not: null,
        },
        wakeup: null,
      },
    });
    if (badRecords2.length !== 0)
      return Response.json({
        status: 400,
        message:
          "寝た～起きたまで完成していないデータがあります。過去データの場合は一括登録をご使用ください。",
      });

    //過去のデータの登録をする場合は一括登録
    const laterRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        OR: [
          {
            bedTime: {
              gt: sleep,
            },
          },
          {
            sleep: {
              gt: sleep,
            },
          },
          {
            wakeup: {
              gt: sleep,
            },
          },
        ],
      },
    });

    // 既に遅い時間に登録がある場合
    if (laterRecords.length !== 0) {
      return Response.json({
        status: 400,
        message: "過去の登録は一括登録をご利用ください。",
      });
    }

    const records = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        bedTime: {
          not: null,
        },
        sleep: null,
        wakeup: null,
      },
    });

    if (records.length === 1) {
      //レコードを更新する場合
      await prisma.sleepingSituation.update({
        where: {
          id: records[0].id,
        },
        data: {
          sleep,
          changeUser: userId,
        },
      });
    } else if (records.length === 0) {
      //レコードを登録する場合
      await prisma.sleepingSituation.create({
        data: {
          babyId,
          sleep,
          createUser: userId,
          changeUser: userId,
        },
      });
    } else {
      return Response.json({
        status: 400,
        message: "Unable to identify data to update",
      });
    }
    return Response.json({
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json({ status: 400, error: e.message });
    }
  }
};
