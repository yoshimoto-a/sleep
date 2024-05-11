import { IndexResponse } from "../app/_types/apiRequests/login";

export const getLoginUser = async (token: string, supabaseUserId: string) => {
  try {
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
        id: data.data.id,
      };
    } else {
      return { isRegistered: false, babyId: null, userName: null, id: null };
    }
  } catch (e) {
    throw e;
  }
};
