import { type NextRequest } from "next/server";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weight/Index";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/weight/PostResponse";
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
        measurementDate: "desc",
      },
    });
    return Response.json(<IndexResponse>{ status: 200, data: getWeigth });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<IndexResponse>{ status: 400, error: e.message });
    }
  }
};
