import { type NextRequest } from "next/server";
import { ChangeTimeZone } from "@/utils/chageTimeZon";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) Response.json({ status: 401, message: "Unauthorized" });
  try {
    const body = await req.json();
    const { babyId, sleep: time, createUser } = body;
    const sleep = ChangeTimeZone(time);
    //登録出来ないパターンが存在しないか確認する
    //パターン①連続して寝たボタン押した場合(wakeupはnullで、①bedtimeがnot null且つsleepもnot null②bedtimeがnull且つsleep はnot null)
    //パターン①-①
    const badRecords1 = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        bedTime: {
          not: null,
        },
        sleep: {
          not: null,
        },
        wakeup: null,
      },
    });
    if (badRecords1.length !== 0)
      return Response.json({
        status: 400,
        message: "There is incomplete data",
      });
    //パターン①-②
    const badRecords2 = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        bedTime: null,
        sleep: {
          not: null,
        },
        wakeup: null,
      },
    });
    if (badRecords2.length !== 0)
      return Response.json({
        status: 400,
        message: "There is incomplete data",
      });

    const records = await prisma.sleepingSituation.findMany({
      where: {
        babyId,
        bedTime: {
          not: null,
        },
        sleep: null,
        wakeup: null,
      },
    });

    if (records.length === 1) {
      //レコードを更新する場合
      await prisma.sleepingSituation.update({
        where: {
          id: records[0].id,
        },
        data: {
          sleep,
          changeUser: createUser,
        },
      });
    } else if (records.length === 0) {
      //レコードを登録する場合
      await prisma.sleepingSituation.create({
        data: {
          babyId,
          sleep,
          createUser,
          changeUser: createUser,
        },
      });
    } else {
      return Response.json({
        status: 400,
        message: "Unable to identify data to update",
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

export const PUT = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) Response.json({ status: 401, message: "Unauthorized" });
  try {
    const body = await req.json();
    const { id, bedtime, sleep, wakeup, changeUser } = body;

    await prisma.sleepingSituation.update({
      where: {
        id,
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

export const DELETE = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) return Response.json({ status: 401, message: "Unauthorized" });
  try {
    const body = await req.json();
    const { id } = body;

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
