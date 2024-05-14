import { type NextRequest } from "next/server";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weight";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/weight/postResponse";
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
    const { babyId, measurementDate, weight, createUser, changeUser } =
      body.data;
    const resp = await prisma.weight.create({
      data: {
        babyId,
        measurementDate,
        weight,
        createUser,
        changeUser,
      },
    });
    return Response.json(<PostResponse>{
      status: 200,
      message: "success",
      data: {
        id: resp.id,
        babyId: resp.babyId,
        weight: resp.weight,
        measurementDate: resp.measurementDate,
        createUser: resp.createUser,
        changeUser: resp.changeUser,
      },
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
    const getWeigth = await prisma.weight.findMany({
      where: {
        babyId: parseInt(id),
      },
      orderBy: {
        measurementDate: "asc",
      },
    });
    return Response.json(<IndexResponse>{ status: 200, data: getWeigth });
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
    const { measurementDate, weight, changeUser } = body.data;
    await prisma.weight.update({
      where: {
        id,
      },
      data: {
        measurementDate,
        weight,
        changeUser,
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

export const DELETE = async (req: NextRequest) => {
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
    await prisma.weight.delete({
      where: {
        id: parseInt(id),
      },
    });
    return Response.json(<IndexResponse>{ status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<IndexResponse>{ status: 400, error: e.message });
    }
  }
};
