import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { updateRequests } from "@/app/_types/apiRequests/dashboard/advancedSetting/updateRequest";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/setting/postResponse";
import { buildPrisma } from "@/utils/prisema";

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const { babyId } = await getUserAndBabyIds(token);
    const getGrowth = await prisma.growth.findMany({
      where: {
        babyId,
      },
    });

    if (getGrowth) {
      return Response.json({
        status: 200,
        data: getGrowth,
      });
    } else {
      return Response.json({
        status: 404,
        error: "Requested record not found",
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json({ status: 400, error: e.message });
    }
  }
};

export const PUT = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const body: updateRequests = await req.json();
    const { id } = body;
    const { userId } = await getUserAndBabyIds(token);
    const { startedAt, archevedAt } = body.data;
    await prisma.growth.update({
      where: {
        id,
      },
      data: {
        startedAt,
        archevedAt,
        changeUser: userId,
      },
    });
    return Response.json(<PostResponse>{
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
