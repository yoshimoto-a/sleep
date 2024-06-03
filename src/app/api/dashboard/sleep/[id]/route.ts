import { type NextRequest } from "next/server";
import { ChangeTimeZone } from "@/utils/chageTimeZon";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) Response.json({ status: 401, message: "Unauthorized" });
  try {
    const id = params.id;
    const body = await req.json();
    const { bedtime, sleep, wakeup, changeUser } = body;

    await prisma.sleepingSituation.update({
      where: {
        id: parseInt(id),
      },
      data: {
        bedTime: ChangeTimeZone(bedtime),
        sleep: ChangeTimeZone(sleep),
        wakeup: ChangeTimeZone(wakeup),
        changeUser,
      },
    });

    //更新した結果、すべてがnullのデータあったら削除する
    const resp = await prisma.sleepingSituation.findMany({
      where: {
        bedTime: null,
        sleep: null,
        wakeup: null,
      },
    });

    if (resp.length !== 0) {
      const delTargetId = resp.map(record => record.id);
      await prisma.sleepingSituation.deleteMany({
        where: {
          id: {
            in: delTargetId,
          },
        },
      });
    }

    return Response.json({
      status: 200,
      message: "success",
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
      return Response.json({ status: 400, message: e.message });
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
  if (error) return Response.json({ status: 401, message: "Unauthorized" });
  try {
    const id = params.id;

    await prisma.sleepingSituation.delete({
      where: {
        id: parseInt(id),
      },
    });
    return Response.json({ status: 200 });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, error: e.message });
    }
  }
};
