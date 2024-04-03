import { supabase } from "@/utils/supabase";
import { buildPrisma } from "@/utils/prisema";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";
import { PostRequests } from "@/app/_types/apiRequests/login/postRequest";
import { IndexResponse } from "@/app/_types/apiRequests/login";
import { type NextRequest } from "next/server";

export const POST = async (req: PostRequests) => {
  const prisma = await buildPrisma();
  console.log("token " + req.headers.Authorization); //undefined
  const token = req.headers.Authorization ?? "";
  const { error } = await supabase.auth.getUser(token);
  console.log(error); //AuthApiError: invalid claim: missing sub claim
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });

  try {
    const { supabaseUserId, role } = req.body;
    await prisma.user.create({
      data: {
        supabaseUserId,
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

export const GET = async (req: NextRequest) => {
  const prisma = await buildPrisma();
  const token = req.headers.get("Authorization") ?? "";
  const { error } = await supabase.auth.getUser(token);
  if (error)
    return Response.json(<ApiResponse>{ status: 401, message: "Unauthorized" });
  try {
    const supabaseUserId = req.nextUrl.searchParams.get("supabaseUserId");
    if (!supabaseUserId)
      return Response.json(<IndexResponse>{
        status: 400,
        error: "Failed to obtain supabaseUserId",
      });
    const getUser = await prisma.user.findMany({
      where: {
        supabaseUserId,
      },
    });
    const responseData = getUser.length === 0 ? null : getUser[0];
    return Response.json(<IndexResponse>{ status: 200, data: responseData });
  } catch (e) {
    if (e instanceof Error) {
      return Response.json(<IndexResponse>{ status: 400, error: e.message });
    }
  }
};
