import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/setting/postResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/wakeWindows";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows/updateRequest";
import { buildPrisma } from "@/utils/prisema";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const body: PostRequests = await req.json();
    const { babyId, userId } = await getUserAndBabyIds(token);

    const { wakeWindows } = body;
    await prisma.wakeWindows.createMany({
      data: wakeWindows.map(record => {
        const { time, type } = record;
        return { time, type, createUser: userId, changeUser: userId, babyId };
      }),
    });
    const { time } = body.sleepPrepTime;
    await prisma.sleepPrepTime.create({
      data: {
        babyId,
        time,
        createUser: userId,
        changeUser: userId,
      },
    });
    return Response.json(<PostResponse>{
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const { babyId } = await getUserAndBabyIds(token);
    const getWakeWindows = await prisma.wakeWindows.findMany({
      where: {
        babyId,
      },
    });
    const getSleepPrepTime = await prisma.sleepPrepTime.findMany({
      where: {
        babyId,
      },
    });

    if (getWakeWindows.length >= 1 && getSleepPrepTime.length >= 1) {
      return Response.json({
        status: 200,
        data: {
          activityTime: getWakeWindows,
          sleepPrepTime: getSleepPrepTime[0],
        },
      });
    } else {
      return Response.json(<IndexResponse>{
        status: 204,
        error: "record not found",
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json(<IndexResponse>{ status: 400, error: e.message });
    }
  }
};

export const PUT = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const body: UpdateRequests = await req.json();
    const { id, time } = body.sleepPrepTime;
    const { userId } = await getUserAndBabyIds(token);

    await prisma.sleepPrepTime.update({
      where: {
        id,
      },
      data: {
        time,
        changeUser: userId,
      },
    });
    const { wakeWindows } = body;
    wakeWindows.map(async item => {
      const { id, time } = item;
      await prisma.wakeWindows.update({
        where: {
          id,
        },
        data: {
          time,
          changeUser: userId,
        },
      });
    });

    return Response.json(<PostResponse>{
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};
