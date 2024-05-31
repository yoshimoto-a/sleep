import { type NextRequest } from "next/server";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/setting/postResponse";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });

  try {
    const body = await req.json();
    const { name, birthday, expectedDateOfBirth, birthWeight, gender } = body;
    const resp = await prisma.baby.create({
      data: {
        name,
        birthday,
        expectedDateOfBirth,
        birthWeight,
        gender,
      },
    });

    //出生体重を計測日が誕生日で体重テーブルに登録する→動作確認未済
    const user = await prisma.user.findUnique({
      where: {
        supabaseUserId: data.user.id,
      },
    });
    if (!user) throw new Error("user is not found");
    const weightResp = await prisma.weight.create({
      data: {
        babyId: resp.id,
        measurementDate: expectedDateOfBirth,
        weight: birthWeight,
        createUser: user?.id,
        changeUser: user?.id,
      },
    });

    return Response.json(<PostResponse>{
      status: 200,
      message: "success",
      id: resp.id,
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
    const getBaby = await prisma.baby.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        birthday: true,
        expectedDateOfBirth: true,
        birthWeight: true,
        gender: true,
        created: true,
        updated: true,
      },
    });
    if (getBaby) {
      return Response.json(<IndexResponse>{ status: 200, data: getBaby });
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
    const body = await req.json();
    const { id } = body;
    const { name, birthday, expectedDateOfBirth, birthWeight, gender } =
      body.data;
    await prisma.baby.update({
      where: {
        id,
      },
      data: {
        name,
        birthday,
        expectedDateOfBirth,
        birthWeight,
        gender,
      },
    });
    return Response.json(<ApiResponse>{
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};