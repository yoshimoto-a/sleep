export interface Chat {
  babyId: number;
  text: String;
  createUser: number;
}
export interface PostRequests {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
  body: {
    data: Chat;
  };
}
