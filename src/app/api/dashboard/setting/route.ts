import { supabase } from "@/utils/supabase";
import { buildPrisma } from "@/utils/prisema";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/setting";
import { type NextRequest } from "next/server";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/setting/postResponse";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
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
    return Response.json(<IndexResponse>{ status: 200, data: getBaby });
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
    const { babyId, name, birthday, expectedDateOfBirth, birthWeight, gender } =
      body;
    await prisma.baby.update({
      where: {
        id: babyId,
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
