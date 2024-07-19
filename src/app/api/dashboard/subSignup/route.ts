import { createClient } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { getUserAndBabyIds } from "../../_utils/getUserAndBabyIds";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/subSignup/postRequest";

export const POST = async (req: NextRequest) => {
  const token = req.headers.get("Authorization") ?? "";

  try {
    const body: PostRequests = await req.json();
    const { babyId } = await getUserAndBabyIds(token);
    const { email } = body;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;
    if (typeof email === "string" && supabaseUrl && supabaseServiceRole) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);
      const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          data: { babyId },
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/resetPassword/sendEmail/`,
        }
      );
      if (error) {
        throw error;
      } else {
        return Response.json(<ApiResponse>{ status: 200, message: "success" });
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      if (e.message.includes("Unauthorized")) {
        return Response.json({ status: 401, error: e.message });
      }
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};
