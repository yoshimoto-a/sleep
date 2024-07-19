import dayjs from "dayjs";
import { useState } from "react";
import { Action } from "../_types/action";
import { checkType } from "../_utils/checkType";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";
import { ApiResponse } from "@/app/_types/apiRequests/apiResponse";

interface Props {
  mutate: any;
  action: Action;
  datetime: Date;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const InputAcionModal: React.FC<Props> = ({
  mutate,
  action,
  datetime,
  setIsModalOpen,
}) => {
  const { token } = useSupabaseSession();
  const [datetimeState, setDatetimeState] = useState(datetime);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const modalClose = () => {
    setIsModalOpen(false);
  };
  const saveValue = async () => {
    setIsSubmitting(true);
    if (!token) return;
    const resp = await fetch(`/api/dashboard/${action}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        [action]: datetimeState,
      }),
    });
    const data: ApiResponse = await resp.json();
    data.status !== 200
      ? alert(`登録できませんでした。${data.message}`)
      : mutate();
    setIsSubmitting(false);
    modalClose();
  };
  return (
    <>
      <h2 className="text-center">{checkType(action)}</h2>
      <input
        id="datetime"
        type="datetime-local"
        defaultValue={dayjs(new Date()).format("YYYY-MM-DDTHH:mm")}
        className="block p-2 m-5 border"
        disabled={isSubmitting}
        onChange={e => setDatetimeState(new Date(e.target.value))}
      />
      <div className="w-full flex justify-between">
        <button
          onClick={modalClose}
          disabled={isSubmitting}
          className="w-2/5 rounded bg-gray-300 px-4 py-2"
        >
          閉じる
        </button>
        <button
          onClick={saveValue}
          disabled={isSubmitting}
          className="w-2/5 rounded bg-blue-500 px-4 py-2"
        >
          保存
        </button>
      </div>
    </>
  );
};
