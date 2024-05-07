import { type NextRequest } from "next/server";
import { checkBabyId } from "../../_utils/checkBabyId";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { updateRequests } from "@/app/_types/apiRequests/dashboard/advancedSetting/updateRequest";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/setting/postResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/wakeWindows";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

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
    const babyIdCheck = await checkBabyId(token, Number(id));
    if (!babyIdCheck)
      return Response.json(<ApiResponse>{
        status: 401,
        message: "Unauthorized",
      });
    const getGrowth = await prisma.growth.findMany({
      where: {
        babyId: parseInt(id),
      },
    });

    if (getGrowth) {
      return Response.json({
        status: 200,
        data: getGrowth,
      });
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
    const body: updateRequests = await req.json();
    const { babyId } = body.body.data;
    const babyIdCheck = await checkBabyId(token, babyId);
    if (!babyIdCheck)
      return Response.json({
        status: 401,
        message: "Unauthorized",
      });

    const { id } = body.body;
    const { startedAt, archevedAt, changeUser } = body.body.data;
    await prisma.growth.update({
      where: {
        id,
      },
      data: {
        startedAt,
        archevedAt,
        changeUser,
      },
    });

    return Response.json(<PostResponse>{
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};
