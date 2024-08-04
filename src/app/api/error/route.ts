import { type NextRequest } from "next/server";
import { SlackApi } from "../_utils/slackApi";
import { PostRequest } from "@/app/_types/apiRequests/error/PostRequest";
export const POST = async (req: NextRequest) => {
  try {
    const body: PostRequest = await req.json();
    const slack = new SlackApi();
    await slack.postMessage({
      channel: "C07FGJVFNGL",
      message: body.message,
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
