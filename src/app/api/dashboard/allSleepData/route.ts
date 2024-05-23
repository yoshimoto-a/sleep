import { type NextRequest } from "next/server";
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
    const body: PostRequest = await req.json();
    const { babyId, bedtime, sleep, wakeup, createUser, changeUser } = body;

    const resp = await prisma.sleepingSituation.create({
      data: {
        babyId,
        bedTime: ChangeTimeZone(bedtime),
        sleep: ChangeTimeZone(sleep),
        wakeup: ChangeTimeZone(wakeup),
        createUser,
        changeUser,
      },
    });
    return Response.json({ status: 200, id: resp.id });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, error: e.message });
    }
  }
};
