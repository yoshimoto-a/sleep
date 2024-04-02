import { supabase } from "@/utils/supabase";
import { buildPrisma } from "@/utils/prisema";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { PostRequests } from "@/app/_types/apiRequests/signup/postRequest";

export const POST = async (req: PostRequests) => {
  const prisma = await buildPrisma();
  const token = req.headers.Authorization ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });

  try {
    const { supabaseUserId, userName, role } = req.body;
    await prisma.user.create({
      data: {
        supabaseUserId,
        userName,
        role,
      },
    });
    return Response.json(<ApiResponse>{ status: 200, message: "success" });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<ApiResponse>{ status: 400, message: e.message });
    }
  }
};
