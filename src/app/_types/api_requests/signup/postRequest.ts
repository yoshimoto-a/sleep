enum Role {
  MAIN,
  SUB,
}
interface User {
  babyId: number;
  supabaseUserId: number;
  userName: String;
  role: Role;
}
export interface PostRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: User;
}
