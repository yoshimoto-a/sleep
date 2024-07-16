/**全てレスポンスは共通の型 */
export interface ApiResponse {
  status: 200;
  message: string;
  userExists: boolean;
}
