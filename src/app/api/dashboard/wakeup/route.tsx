import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/wakeup/PostRequests";
import { buildPrisma } from "@/utils/prisema";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const { babyId, userId } = await getUserAndBabyIds(token);
    const body: PostRequests = await req.json();
    const { wakeup } = body;
    //登録出来ないパターンが存在しないか確認する
    //sleepがnullのレコードが存在する場合
    const badRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        sleep: null,
      },
    });
    if (badRecords.length !== 0)
      return Response.json({
        status: 400,
        message: "There is incomplete data",
      });

    //更新するレコードはsleepがnot nullでwakeupがnullのレコード
    const records = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        sleep: { not: null },
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
          wakeup,
          changeUser: userId,
        },
      });
      return Response.json({
        status: 200,
        message: "success",
      });
    } else {
      return Response.json({
        status: 400,
        message: "Unable to identify data to update",
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json({ status: 400, error: e.message });
    }
  }
};
