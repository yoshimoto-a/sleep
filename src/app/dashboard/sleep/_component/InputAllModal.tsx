import dayjs from "dayjs";
import { useContext } from "react";
import { useState } from "react";
import { ModalButton } from "../../growth/_components/ModalButton";
import { UserContext } from "../../layout";
import { Action } from "../_types/action";
import { useApi } from "@/app/_hooks/useApi";
import { PostRequest } from "@/app/_types/apiRequests/dashboard/allSleepData/postRequest";
import { PostResonse } from "@/app/_types/apiRequests/dashboard/allSleepData/postResponse";

interface Props {
  mutate: any;
  setAllIsModalOpen: (isOpen: boolean) => void;
}
export const InputAllModal: React.FC<Props> = ({
  mutate,
  setAllIsModalOpen,
}) => {
  const [dbUserId, babyId] = useContext(UserContext);
  const [allDatetime, setAllDatetime] = useState<{
    bedtime: Date | null;
    sleep: Date;
    wakeup: Date;
  }>({ bedtime: null, sleep: new Date(), wakeup: new Date() });
  const fetcher = useApi();
  const handleChange = (date: Date, action: Action) => {
    setAllDatetime({ ...allDatetime, [action]: date });
  };
  const handleSave = async () => {
    if (!babyId || !dbUserId) return;
    const body = {
      babyId,
      bedtime: allDatetime.bedtime,
      sleep: allDatetime.sleep,
      wakeup: allDatetime.wakeup,
      createUser: dbUserId,
      changeUser: dbUserId,
    };
    try {
      await fetcher.post<PostRequest, PostResonse>(
        "/api/dashboard/allSleepData",
        body
      );
      mutate();
    } catch (e) {
      alert("登録に失敗しました");
    }
  };

  return (
    <>
      <h2 className="text-center">編集</h2>
      <label className="flex justify-center">寝かしつけ開始</label>
      <input
        id="bedtime"
        type="datetime-local"
        value={dayjs(allDatetime.bedtime).format("YYYY-MM-DDTHH:mm:ss")}
        className="block p-2 m-5 border"
        onChange={e => {
          handleChange(new Date(e.target.value), "bedTime");
        }}
      />
      <label className="flex justify-center">寝た</label>
      <input
        id="sleep"
        type="datetime-local"
        value={dayjs(allDatetime.sleep).format("YYYY-MM-DDTHH:mm:ss")}
        className="block p-2 m-5 border"
        onChange={e => {
          handleChange(new Date(e.target.value), "sleep");
        }}
      />
      <label className="flex justify-center">起きた</label>
      <input
        id="wakeup"
        type="datetime-local"
        value={dayjs(allDatetime.wakeup).format("YYYY-MM-DDTHH:mm:ss")}
        className="block p-2 m-5 border"
        onChange={e => {
          handleChange(new Date(e.target.value), "bedTime");
        }}
      />
      <div>
        <ModalButton
          onClick={() => setAllIsModalOpen(false)}
          text="閉じる"
          colorClass="bg-gray-300"
        ></ModalButton>
        <ModalButton
          onClick={handleSave}
          text="保存"
          colorClass="bg-blue-500"
        ></ModalButton>
      </div>
    </>
  );
};
