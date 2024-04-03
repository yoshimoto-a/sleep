import { IndexResponse } from "../../_types/apiRequests/login";

export const GetLoginUser = async (token: string, supabaseUserId: string) => {
  const resp = await fetch(`/api/login?supabaseUserId=${supabaseUserId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const data: IndexResponse = await resp.json();
  if ("data" in data && data.data !== null) {
    return {
      isRegistered: true,
      babyId: data.data.babyId,
      userName: data.data.userName,
    };
  } else {
    return { isRegistered: false, babyId: null, userName: null };
  }
};
