import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { formatGraphData } from "./_utils/formatGraphData";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weight/Index";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/weight/PostRequest";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/weight/PostResponse";
import { buildPrisma } from "@/utils/prisema";
export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const { babyId, userId } = await getUserAndBabyIds(token);
    const body: PostRequests = await req.json();
    const { measurementDate, weight } = body;
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
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
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
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json(<IndexResponse>{ status: 400, error: e.message });
    }
  }
};
