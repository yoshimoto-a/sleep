import { type NextRequest } from "next/server";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weight/Index";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });

  try {
    const body = await req.json();
    const id = params.id;
    const { measurementDate, weight, changeUser } = body.data;
    await prisma.weight.update({
      where: {
        id: parseInt(id),
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });
  try {
    const id = params.id;
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
