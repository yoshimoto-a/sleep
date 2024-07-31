import { type NextRequest } from "next/server";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  try {
    const email = process.env.GUEST_USER_ID as string;
    const password = process.env.GUEST_USER_PASS as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    }
    return Response.json({
      status: 200,
      message: "success",
      session: data.session,
    });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json({ status: 400, message: e.message });
    }
  }
};
