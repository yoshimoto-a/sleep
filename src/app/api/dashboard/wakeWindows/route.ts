import { type NextRequest } from "next/server";
import { checkBabyId } from "../../_utils/checkBabyId";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/setting/postResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/wakeWindows";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows/postRequest";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/wakeWindows/updateRequest";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });
  try {
    const body: PostRequests = await req.json();
    const { babyId } = body.sleepPrepTime;
    const babyIdCheck = await checkBabyId(token, babyId);
    if (!babyIdCheck)
      return Response.json(<ApiResponse>{
        status: 401,
        message: "Unauthorized",
      });

    const { wakeWindows } = body;
    await prisma.wakeWindows.createMany({
      data: wakeWindows.map(record => {
        const { time, type, createUser, changeUser, babyId } = record;
        return { time, type, createUser, changeUser, babyId };
      }),
    });
    const { time, createUser, changeUser } = body.sleepPrepTime;
    await prisma.sleepPrepTime.create({
      data: {
        babyId,
        time,
        createUser,
        changeUser,
      },
    });
    return Response.json(<PostResponse>{
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id)
      return Response.json(<IndexResponse>{
        status: 400,
        error: "Failed to obtain Id",
      });
    const babyIdCheck = await checkBabyId(token, Number(id));
    if (!babyIdCheck)
      return Response.json(<ApiResponse>{
        status: 401,
        message: "Unauthorized",
      });
    const getWakeWindows = await prisma.wakeWindows.findMany({
      where: {
        babyId: parseInt(id),
      },
    });
    const getSleepPrepTime = await prisma.sleepPrepTime.findMany({
      where: {
        babyId: parseInt(id),
      },
    });

    if (getWakeWindows && getSleepPrepTime) {
      return Response.json({
        status: 200,
        data: {
          activityTime: getWakeWindows,
          sleepPrepTime: getSleepPrepTime[0],
        },
      });
    } else {
      return Response.json(<IndexResponse>{
        status: 404,
        error: "Requested record not found",
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<IndexResponse>{ status: 400, error: e.message });
    }
  }
};

export const PUT = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });
  try {
    const body: UpdateRequests = await req.json();
    const { babyId } = body.sleepPrepTime;
    const babyIdCheck = await checkBabyId(token, babyId);
    if (!babyIdCheck)
      return Response.json({
        status: 401,
        message: "Unauthorized",
      });

    const { id, time, changeUser } = body.sleepPrepTime;
    await prisma.sleepPrepTime.update({
      where: {
        id,
      },
      data: {
        time,
        changeUser,
      },
    });
    const { wakeWindows } = body;
    wakeWindows.map(async item => {
      const { id, time, changeUser } = item;
      await prisma.wakeWindows.update({
        where: {
          id,
        },
        data: {
          time,
          changeUser,
        },
      });
    });

    return Response.json(<PostResponse>{
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};