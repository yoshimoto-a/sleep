import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { PostRequest } from "@/app/_types/apiRequests/dashboard/allSleepData/postRequest";
import { ChangeTimeZone } from "@/utils/chageTimeZon";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) Response.json({ status: 401, message: "Unauthorized" });
  try {
    const { babyId, userId } = await getUserAndBabyIds(token);
    const body: PostRequest = await req.json();
    const { bedtime, sleep, wakeup } = body;
    const resp = await prisma.sleepingSituation.create({
      data: {
        babyId,
        bedTime: ChangeTimeZone(bedtime),
        sleep: ChangeTimeZone(sleep),
        wakeup: ChangeTimeZone(wakeup),
        createUser: userId,
        changeUser: userId,
      },
    });
    return Response.json({ status: 200, id: resp.id });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, error: e.message });
    }
  }
};
