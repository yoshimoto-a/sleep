import { type NextRequest } from "next/server";
import { SlackApi } from "../_utils/slackApi";
import { PostRequest } from "@/app/_types/apiRequests/error/PostRequest";
import { buildPrisma } from "@/utils/prisema";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  try {
    const body: PostRequest = await req.json();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let message = "";
    if (session) {
      const getUser = await prisma.user.findUnique({
        where: {
          supabaseUserId: session?.user.id,
        },
      });
      message = `userId:${getUser?.id}  babyId:${getUser?.babyId}  エラーメッセージ：${body.message}`;
    } else {
      message = `session情報なし→エラーメッセージ：${body.message}`;
    }

    const slack = new SlackApi();
    await slack.postMessage({
      channel: "C07FGJVFNGL",
      message,
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
