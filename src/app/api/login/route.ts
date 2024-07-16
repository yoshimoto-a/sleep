import { Milestone } from "@prisma/client";
import { type NextRequest } from "next/server";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);

  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });

  try {
    //登録があるかどうか確認する
    const getUser = await prisma.user.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });
    if (getUser) {
      //既に登録あれば何もしない
      return Response.json(<ApiResponse>{
        status: 200,
        message: "success",
        userExists: true,
      });
    }
    const userPostResp = await prisma.user.create({
      data: {
        supabaseUserId: data.user.id,
        role: data.user.user_metadata.babyId ? "SUB" : "MAIN",
        babyId: data.user.user_metadata.babyId,
      },
    });

    //BabyIdをUserテーブルに登録するためにcreate
    const babyResp = await prisma.baby.create({
      data: {
        name: "",
        birthday: new Date(),
        birthWeight: 0,
        expectedDateOfBirth: new Date(),
        gender: "BOY",
      },
    });
    //userのbabyIdを更新
    await prisma.user.update({
      where: {
        id: userPostResp.id,
      },
      data: {
        babyId: babyResp.id,
      },
    });

    //ここで成長記録のデータの登録を空で行う
    const milestones: Milestone[] = [
      "TURNING_OVER",
      "TURNING_OVER_AND_OVER",
      "CRAWLING",
      "SITTING",
      "CRAWLING_ON_HANDS_AND_KNEES",
      "PULLING_UP_TO_STAND",
      "CRUISING",
      "STANDING",
      "WALKING",
    ];
    for (const milestone of milestones) {
      await prisma.growth.create({
        data: {
          babyId: babyResp.id,
          milestone,
          createUser: userPostResp.id,
          changeUser: userPostResp.id,
        },
      });
    }
    return Response.json(<ApiResponse>{
      status: 200,
      message: "success",
      userExists: false,
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
    const supabaseUserId = req.nextUrl.searchParams.get("supabaseUserId");
    if (!supabaseUserId)
      return Response.json({
        status: 400,
        error: "Failed to obtain supabaseUserId",
      });
    const getUser = await prisma.user.findUnique({
      where: {
        supabaseUserId,
      },
    });
    return Response.json({ status: 200, data: getUser });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, error: e.message });
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
    const body = await req.json();
    const { id, babyId } = body;
    if (!id)
      return Response.json({
        status: 400,
        error: "Failed to obtain id",
      });
    const putUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        babyId,
      },
    });
    return Response.json({ status: 200, data: putUser });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, error: e.message });
    }
  }
};
