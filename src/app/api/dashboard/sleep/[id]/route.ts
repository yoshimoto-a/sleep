import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../../_utils/getUserAndBabyIds";
import { UpdateRequests } from "@/app/_types/apiRequests/dashboard/sleep/updateRequest";
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
    const id = params.id;
    const body: UpdateRequests = await req.json();
    const { bedtime, sleep, wakeup } = body;

    await prisma.sleepingSituation.update({
      where: {
        id: parseInt(id),
      },
      data: {
        bedTime: bedtime,
        sleep: sleep,
        wakeup: wakeup,
        changeUser: userId,
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
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json({ status: 400, error: e.message });
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
