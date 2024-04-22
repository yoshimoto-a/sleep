import { supabase } from "@/utils/supabase";
import { buildPrisma } from "@/utils/prisema";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { IndexResponse } from "@/app/_types/apiRequests/login";
import { type NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);

  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });

  try {
    const body = await req.json();
    const { supabaseUserId, role, babyId } = body;
    console.log(babyId);
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
      return Response.json(<IndexResponse>{
        status: 400,
        error: "Failed to obtain supabaseUserId",
      });
    const getUser = await prisma.user.findUnique({
      where: {
        supabaseUserId,
      },
    });
    return Response.json(<IndexResponse>{ status: 200, data: getUser });
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
    const body = await req.json();
    const { id, babyId } = body;
    if (!id)
      return Response.json(<IndexResponse>{
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
