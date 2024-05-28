"use client";
import { useState } from "react";
import { Button } from "../../weight/_components/Button";
import { CustomModal } from "@/app/_components/modal";
export const Guideline = () => {
  const [isOpenWakeWindows, setIsOpenWakeWindows] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sleepData = [
    {
      period: "出産 – 6週間",
      wakeWindow: "45分～1時間",
    },
    {
      period: "6週間～3ヶ月",
      wakeWindow: "1時間～1時間45分",
    },
    {
      period: "3～6ヶ月",
      wakeWindow: "~2時間",
    },
    {
      period: "6～9ヶ月",
      wakeWindow: "2～3時間",
    },
    {
      period: "9～12ヶ月",
      wakeWindow: "~3時間",
    },
    {
      period: "12～18か月",
      wakeWindow: "3時間",
    },
    {
      period: "18か月 – 3歳",
      wakeWindow: "-",
    },
  ];
  return (
    <div className="pt-3 mx-3">
      登録した活動時間を元にお勧めねんね時刻を算出します。
      <div className="flex justify-center gap-4 pt-5">
        <button
          onClick={() => setIsOpenWakeWindows(true)}
          className="w-40 h-10 mb-2 flex flex-col justify-center items-center border-solid border-2 border-slate-600 rounded-full"
        >
          目安
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="w-40 h-10 mb-3 flex flex-col justify-center items-center border-solid border-2 border-slate-600 rounded-full"
        >
          見極めポイント
        </button>
      </div>
      <CustomModal
        isOpen={isOpenWakeWindows}
        onClose={() => setIsOpenWakeWindows(false)}
        className=""
      >
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1">月齢</th>
                <th className="border border-gray-300 px-2 py-1">活動時間</th>
              </tr>
            </thead>
            <tbody>
              {sleepData.map((data, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-2 py-1">
                    {data.period}
                  </td>
                  <td className="border border-gray-300 px-2 py-1">
                    {data.wakeWindow}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            出典: 「 子供の睡眠の問題を解決する」、R.
            ファーバー医師、「健康的な睡眠習慣」、「ハッピー チャイルド」、M.
            ワイスブルース医師
          </div>
          <div className="flex justify-center pt-5">
            <Button
              text="閉じる"
              onclick={() => setIsOpenWakeWindows(false)}
            ></Button>
          </div>
        </div>
      </CustomModal>
      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className=""
      >
        <div>
          <ol>
            <li>
              <strong>眠いサイン観察</strong>
              <div>
                以下のサインが見られたら、赤ちゃんが眠い状態の可能性が高いです。
                愚図ってから寝かしつけるのでは遅すぎるので注意してください。
              </div>
              <ul>
                <li>顔をこする(目は遅い)</li>
                <li>耳を触る</li>
                <li>背中を反る(低月齢に多い)</li>
                <li>あくび（疲れすぎ）</li>
                <li>おもちゃや人への興味を無くす</li>
                <li>ぼーっとする</li>
                <li>動きがゆっくりになる</li>
                <li>叫ぶ</li>
                <li>コケやすくなる</li>
              </ul>
            </li>
            <li>
              <strong>寝つきまでの時間</strong>
              <div>
                入眠までの時間が7～8分以内だと疲れすぎ、15分～20分で入眠したら程よいです。
                入眠までの時間が早くてすぐ起きる、夜泣き、早朝起きのトラブルがあれば10～15分早く寝かせてみてください。
              </div>
            </li>
          </ol>
          <div className="flex justify-center pt-5">
            <Button text="閉じる" onclick={() => setIsOpen(false)}></Button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};
