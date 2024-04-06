//userテーブルにbabyIdがあるか返す

export const GetLoginUser = async (
  token: string,
  supabaseUserId: string | null,
  userId: string | null
) => {
  const url: string = supabaseUserId
    ? `/api/login?supabaseUserId=${supabaseUserId}`
    : userId
    ? `/api/login?id=${userId}`
    : (console.log("リクエストできない"), "");
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const data = await resp.json();
  if ("data" in data && data.data !== null) {
    return {
      isRegistered: true,
      babyId: data.data.babyId,
      userName: data.data.userName,
      id: data.id,
    };
  } else {
    return { isRegistered: false, babyId: null, userName: null, id: Number };
  }
};
