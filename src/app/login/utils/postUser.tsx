import { PostRequests } from "@/app/_types/apiRequests/login/postRequest";
import { Role } from "@prisma/client";

export const PostUser = async (
  supabaseUserId: string,
  role: Role,
  token: string
) => {
  const prams: PostRequests = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: {
      supabaseUserId,
      role,
    },
  };
  const resp = await fetch("/api/login/", {
    ...prams,
    body: JSON.stringify(prams.body),
  });
  return resp;
};
