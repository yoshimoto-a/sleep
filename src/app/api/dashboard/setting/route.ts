import { type NextRequest } from "next/server";
import { getBabyId } from "../../_utils/getBabyId";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) return Response.json({ status: 401, message: "Unauthorized" });
  try {
    const id = await getBabyId(token);
    if (!id)
      return Response.json({
        status: 400,
        error: "Failed to obtain Id",
      });
    const getBaby = await prisma.baby.findUnique({
      where: {
        id,
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
      return Response.json({ status: 400, error: e.message });
    }
  }
};

export const PUT = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { data, error } = await supabase.auth.getUser(token);
  if (error) return Response.json({ status: 401, message: "Unauthorized" });

  try {
    const id = await getBabyId(token);
    const body = await req.json();
    const { name, birthday, expectedDateOfBirth, birthWeight, gender } =
      body.data;
    await prisma.baby.update({
      where: {
        id,
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
        babyId: id,
      },
    });

    if (getWeigth.length === 0) {
      const user = await prisma.user.findUnique({
        where: {
          supabaseUserId: data.user.id,
        },
      });
      if (!user) throw new Error("user is not found");
      await prisma.weight.create({
        data: {
          babyId: id,
          measurementDate: expectedDateOfBirth,
          weight: birthWeight,
          createUser: user?.id,
          changeUser: user?.id,
        },
      });
    }

    return Response.json({
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, message: e.message });
    }
  }
};
