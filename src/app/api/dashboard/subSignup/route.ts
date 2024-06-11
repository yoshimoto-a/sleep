import { createClient } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";
import { getBabyId } from "../../_utils/getBabyId";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { supabase } from "@/utils/supabase";

export const POST = async (req: NextRequest) => {
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error) {
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });
  }

  try {
    const body = await req.json();
    const babyId = await getBabyId(token);
    const { email } = body;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;
    if (typeof email === "string" && supabaseUrl && supabaseServiceRole) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);
      const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          data: { babyId },
          redirectTo: `${process.env.APP_URL}/resetPassword/sendEmail/`,
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
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};
