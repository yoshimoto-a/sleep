//リファクタリングしたいけどわからない。。
import { type NextRequest } from "next/server";
import { ChangeTimeZone } from "@/utils/chageTimeZone";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) Response.json({ status: 401, message: "Unauthorized" });
  try {
    const body = await req.json();
    const { babyId, bedTime: time, createUser } = body;
    const bedTime = ChangeTimeZone(time);
    //登録出来ないパターンが存在しないか確認する
    //wakeupがmull
    const records = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        OR: [{ sleep: null }, { wakeup: null }],
      },
    });
    if (records.length !== 0) {
      return Response.json({
        status: 400,
        message: "There is incomplete data",
      });
    }
    //レコードを登録する
    await prisma.sleepingSituation.create({
      data: {
        babyId,
        bedTime,
        createUser,
        changeUser: createUser,
      },
    });
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
