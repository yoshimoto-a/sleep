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
    return Response.json({ status: 200, id: resp.id });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json({ status: 400, error: e.message });
    }
  }
};
