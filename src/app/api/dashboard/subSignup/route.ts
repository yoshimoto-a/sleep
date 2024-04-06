import { supabase } from "@/utils/supabase";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { createClient } from "@supabase/supabase-js";
import { PostRequests } from "@/app/_types/apiRequests/dashboard/subSignup/postRequest";

export const POST = async (req: PostRequests) => {
  const token = req.headers.Authorization ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });

  try {
    const { email, babyId } = req.body;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;
    if (typeof email === "string" && supabaseUrl && supabaseServiceRole) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRole);
      const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          data: { babyId },
        }
      );
      if (error) {
        return Response.json(<ApiResponse>{
          status: 400,
          message: error.message,
        });
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
