import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { PostRequest } from "@/app/_types/apiRequests/dashboard/allSleepData/postRequest";
import { buildPrisma } from "@/utils/prisema";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const { babyId, userId } = await getUserAndBabyIds(token);
    const body: PostRequest = await req.json();
    const { bedtime, sleep, wakeup } = body;

    const incompleteRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        OR: [{ sleep: null }, { wakeup: null }],
      },
    });
    //完成していないデータが存在する場合は、その時間より前の時間でしか登録できない
    if (incompleteRecords.length !== 0) {
      const incompleteRecord = incompleteRecords[0];
      const incompleteRecordTime =
        incompleteRecord.bedTime || (incompleteRecord.sleep as Date);
      const newDataTime = bedtime || sleep || wakeup;
      if (new Date(newDataTime) > new Date(incompleteRecordTime)) {
        throw new Error("起床していない場合、過去の登録しかできません。");
      }
    }

    const resp = await prisma.sleepingSituation.create({
      data: {
        babyId,
        bedTime: bedtime,
        sleep: sleep,
        wakeup: wakeup,
        createUser: userId,
        changeUser: userId,
      },
    });
    return Response.json({ status: 200, id: resp.id, message: "success" });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, message: e.message });
      }
      return Response.json({ status: 400, message: e.message });
    }
  }
};
