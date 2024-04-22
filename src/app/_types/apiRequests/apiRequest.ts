export interface ApiRequest {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
}
