import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { formatGraphData } from "./_utils/formatGraphData";
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
    const { babyId, userId } = await getUserAndBabyIds(token);
    const body = await req.json();
    const { measurementDate, weight } = body.data;
    const resp = await prisma.weight.create({
      data: {
        babyId,
        measurementDate,
        weight,
        createUser: userId,
        changeUser: userId,
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
    const { babyId } = await getUserAndBabyIds(token);
    const [data, baby] = await Promise.all([
      prisma.weight.findMany({
        where: {
          babyId,
        },
        orderBy: {
          measurementDate: "desc",
        },
      }),
      prisma.baby.findUnique({
        where: {
          id: babyId,
        },
        select: {
          birthday: true,
        },
      }),
    ]);
    const graphData = formatGraphData(data, baby?.birthday);
    return Response.json(<IndexResponse>{ status: 200, data, graphData });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<IndexResponse>{ status: 400, error: e.message });
    }
  }
};
