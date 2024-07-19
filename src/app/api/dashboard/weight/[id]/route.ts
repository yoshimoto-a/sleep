import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../../_utils/getUserAndBabyIds";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weight/Index";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/weight/UpdateRequest";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";

  try {
    const { userId } = await getUserAndBabyIds(token);
    const body: UpdateRequests = await req.json();
    const id = params.id;
    const { measurementDate, weight } = body;
    await prisma.weight.update({
      where: {
        id: parseInt(id),
      },
      data: {
        measurementDate,
        weight,
        changeUser: userId,
      },
    });
    return Response.json(<ApiResponse>{
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
