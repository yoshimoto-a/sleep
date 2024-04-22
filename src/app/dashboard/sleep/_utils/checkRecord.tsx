/**レコードを登録してもいいか確認する関数 */

/**レコードを作成するときにチェック
 * →(bedTime~wakeup||sleep~wakeUp)まで登録済のデータしか存在していない状況(wakeupがnullが存在しない))
 * 想定するaction(1)bedTime(2)sleep*/
/** レコードを更新するときにチェック
 *想定するaction(1)sleep(2)wakeup
 *sleep→bedTimeが登録済でsleepとwakeupがnull
 *wakeUp→sleepが登録済&&wakeUpがnull
 */

import { IndexResponse } from "@/app/_types/apiRequests/dashboard/sleep";

export const CheckRecords = async (
  action: string,
  token: string
): Promise<string> => {
  let method: string = "";
  const URL = "/api/dashboard/sleep";
  switch (action) {
    case "bedTime":
      //wakeUpが空のレコードが0件であることを確認してからcreateのみ
      const resp = await fetch(`${URL}?wakeUp=true&sleep=true&bedTime=false`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data: IndexResponse = await resp.json();
      if (data.status !== 200) {
        method = "error";
      }
      if ("data" in data && Array.isArray(data.data)) {
        if (data.data.length <= 1) {
          method = "error";
        } else {
          method = "POST";
        }
      } else {
        console.log(`${data.status} is null!`);
        method = "POST";
      }
      break;
    case "sleep":
      //bedTimeに時間入っていて、sleepが空のレコード取得
      //存在する→PUT
      //存在しない→POST
      break;
    case "wakeUp":
      //sleepがnullではない&&wakeUpがnullのレコード取得
      //存在する→PUT
      //存在しない→
      break;
    default:
      throw new Error("想定外のデータ");
  }
  return method;
};
