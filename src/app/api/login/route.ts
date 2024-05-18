import { Milestone } from "@prisma/client";
import { type NextRequest } from "next/server";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);

  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });

  try {
    const body = await req.json();
    const { supabaseUserId, role, babyId } = body;
    const userPostResp = await prisma.user.create({
      data: {
        supabaseUserId,
        role,
        babyId,
      },
    });

    if (!babyId) {
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
    }

    //ここでも成長記録のデータの登録を空で行う→挙動の確認未済
    const milestoneResp = await prisma.growth.findMany({
      where: {
        babyId,
      },
    });
    if (milestoneResp.length === 0) {
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
      milestones.map(async milestone => {
        await prisma.growth.create({
          data: {
            babyId,
            milestone,
            createUser: userPostResp.id,
            changeUser: userPostResp.id,
          },
        });
      });
    }

    return Response.json(<ApiResponse>{ status: 200, message: "success" });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e);
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
