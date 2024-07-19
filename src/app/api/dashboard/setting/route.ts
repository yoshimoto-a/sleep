import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/setting/updateRequest";
import { buildPrisma } from "@/utils/prisema";

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  try {
    const { babyId } = await getUserAndBabyIds(token);
    if (!babyId)
      return Response.json({
        status: 400,
        error: "Failed to obtain Id",
      });
    const getBaby = await prisma.baby.findUnique({
      where: {
        id: babyId,
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
      return Response.json({ status: 200, data: getBaby });
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
    const { babyId, userId } = await getUserAndBabyIds(token);
    const body: UpdateRequests = await req.json();
    const { name, birthday, expectedDateOfBirth, birthWeight, gender } =
      body.data;
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

    //体重データがない場合は出生体重をweightに登録する
    const getWeigth = await prisma.weight.findMany({
      where: {
        babyId,
      },
    });

    if (getWeigth.length === 0) {
      await prisma.weight.create({
        data: {
          babyId,
          measurementDate: expectedDateOfBirth,
          weight: birthWeight,
          createUser: userId,
          changeUser: userId,
        },
      });
    }

    return Response.json({
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json({ status: 400, message: e.message });
    }
  }
};
