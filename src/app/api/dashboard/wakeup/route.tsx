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
    const { babyId, wakeup: time, createUser: changeUser } = body;
    const wakeup = ChangeTimeZone(time);
    //登録出来ないパターンが存在しないか確認する
    //sleepがnullのレコードが存在する場合
    const badRecords = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        sleep: null,
      },
    });
    if (badRecords.length !== 0)
      return Response.json({
        status: 400,
        message: "There is incomplete data",
      });

    //更新するレコードはsleepがnot nullでwakeupがnullのレコード
    const records = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        sleep: { not: null },
        wakeup: null,
      },
    });
    if (records.length === 1) {
      //console.log(wakeup); 日本時間になっている
      //レコードを更新する場合
      await prisma.sleepingSituation.update({
        where: {
          id: records[0].id,
        },
        data: {
          wakeup,
          changeUser,
        },
      });
      return Response.json({
        status: 200,
        message: "success",
      });
    } else {
      return Response.json({
        status: 400,
        message: "Unable to identify data to update",
      });
    }
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, message: e.message });
    }
  }
};
