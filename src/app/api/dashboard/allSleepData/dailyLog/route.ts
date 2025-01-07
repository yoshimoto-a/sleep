import { type NextRequest } from "next/server";
import { dayjs } from "../../../../../utils/dayjs";
import { buildPrisma } from "@/utils/prisema";

export const GET = async (request: NextRequest) => {
  const prisma = await buildPrisma();
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  try {
    const babyId = parseInt(process.env.BABY_ID as string);
    const userId = parseInt(process.env.USER_ID as string);
    const sleep = dayjs()
      .subtract(1, "day")
      .set("hour", 19)
      .set("minute", 30)
      .toDate();
    const wakeup = dayjs().set("hour", 6).set("minute", 30).toDate();
    const resp = await prisma.sleepingSituation.create({
      data: {
        babyId,
        sleep,
        wakeup,
        createUser: userId,
        changeUser: userId,
      },
    });
    return Response.json({ status: 200, id: resp.id, message: "success" });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, message: e.message });
    }
  }
};
