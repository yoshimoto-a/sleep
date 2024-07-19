import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/bedTime/Postequests";
import { ChangeTimeZone } from "@/utils/chageTimeZon";
import { buildPrisma } from "@/utils/prisema";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const { babyId, userId } = await getUserAndBabyIds(token);
    const body: PostRequests = await req.json();
    const { bedTime: time } = body;
    const bedTime = ChangeTimeZone(time);
    //登録出来ないパターンが存在しないか確認する
    //wakeupがnull
    const records = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        OR: [{ sleep: null }, { wakeup: null }],
      },
    });
    if (records.length !== 0) {
      return Response.json({
        status: 400,
        message:
          "寝た～起きたまで完成していないデータがあります。過去データの場合は一括登録をご使用ください。",
      });
    }
    //レコードを登録する
    await prisma.sleepingSituation.create({
      data: {
        babyId,
        bedTime,
        createUser: userId,
        changeUser: userId,
      },
    });
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
