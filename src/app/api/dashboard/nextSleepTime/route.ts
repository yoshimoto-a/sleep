import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { type NextRequest } from "next/server";
import { calculate } from "./_utils/calculate";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });
  try {
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
    if (!babyId) {
      return Response.json({ status: 400, error: "babyId is not found" });
    }
    const practicing = await prisma.growth.findMany({
      where: {
        babyId,
        AND: [
          {
            startedAt: {
              not: null,
            },
          },
          {
            archevedAt: null,
          },
        ],
      },
    });
    const acquisition = await prisma.growth.findMany({
      where: {
        babyId,
        AND: [
          {
            archevedAt: null,
          },
          {
            archevedAt: {
              gte: dayjs().subtract(7, "days").toDate(),
            },
          },
        ],
      },
    });
    const walking = await prisma.growth.findMany({
      where: {
        babyId,
        AND: [
          {
            archevedAt: null,
          },
          {
            archevedAt: {
              gte: dayjs().subtract(7, "days").toDate(),
            },
          },
          {
            milestone: "WALKING",
          },
        ],
      },
    });

    const wakeWindows = await prisma.wakeWindows.findMany({
      where: {
        babyId,
      },
    });
    if (wakeWindows.length === 0)
      return Response.json({ status: 400, error: "no wakeWindowsData" });
    const baby = await prisma.baby.findUnique({
      where: {
        id: babyId,
      },
    });
    if (!baby) return Response.json({ status: 400, error: "no babyData" });

    const sleepingSituation = await prisma.sleepingSituation.findMany({
      where: {
        AND: {
          babyId,
          wakeup: {
            not: null,
          },
        },
      },
      orderBy: {
        wakeup: "desc",
      },
      take: 1,
    });
    if (sleepingSituation.length === 0)
      return Response.json({ status: 400, error: "no sleepingSituationData" });
    const result = calculate(
      practicing,
      acquisition,
      walking,
      wakeWindows,
      baby,
      sleepingSituation
    );
    return Response.json({ status: 200, data: result });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, error: e.message });
    }
  }
};
