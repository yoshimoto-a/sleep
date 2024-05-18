import dayjs from "dayjs";
import { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../layout";
import { Action } from "../_types/action";
import { checkType } from "../_utils/checkType";
import { Button } from "./button";
import { CustomModal } from "@/app/_components/modal";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { PostResponse } from "@/app/_types/apiRequests/dashboard/sleep/postResponse";

interface Props {
  mutate: any;
}
export const ButtonArea: React.FC<Props> = ({ mutate }) => {
  const { token } = useSupabaseSession();
  const [dbUserId, babyId] = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<Action>("sleep");
  const [datetime, setDatetime] = useState(new Date());
  const handleClick = async (action: Action) => {
    setDatetime(new Date());
    setAction(action);
    setIsModalOpen(true);
  };
  const modalClose = () => {
    setIsModalOpen(false);
  };
  const saveValue = async () => {
    modalClose();
    if (!token) return;
    const resp = await fetch(`/api/dashboard/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        babyId,
        [action]: datetime,
        createUser: dbUserId,
      }),
    });
    const data: PostResponse = await resp.json();
    data.status !== 200
      ? alert(`登録できませんでした。${data.message}`)
      : mutate();
  };
  return (
    <>
      <div className="absolute bottom-100 w-full px-3 py-1 bg-custom-blue flex justify-between items-center">
        <Button
          icon="/_buttonIcon/start.png"
          text="寝かしつけ開始"
          action="bedTime"
          onclick={() => handleClick("bedTime")}
        ></Button>
        <Button
          icon="/_buttonIcon/sleep.png"
          text="寝た"
          action="sleep"
          onclick={() => handleClick("sleep")}
        ></Button>
        <Button
          icon="/_buttonIcon/wakeUp.png"
          text="起きた"
          action="wakeup"
          onclick={() => handleClick("wakeup")}
        ></Button>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <h2 className="text-center">{checkType(action)}</h2>
        <input
          id="datetime"
          type="datetime-local"
          defaultValue={dayjs(new Date()).format("YYYY-MM-DDTHH:mm")}
          className="block p-2 m-5 border"
          onChange={e => setDatetime(new Date(e.target.value))}
        />
        <div className="w-full flex justify-between">
          <button
            onClick={modalClose}
            className="w-2/5 rounded bg-gray-300 px-4 py-2"
          >
            閉じる
          </button>
          <button
            onClick={saveValue}
            className="w-2/5 rounded bg-blue-500 px-4 py-2"
          >
            保存
          </button>
        </div>
      </CustomModal>
    </>
  );
};
