import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { ModalButton } from "../../growth/_components/ModalButton";

interface Props {
  closeModal: () => void;
  id: number;
  action: string;
  dateTime: Date;
  put: (id: number, action: string, datetime: Date) => void;
  del: (id: number, action: string) => void;
}
export const InputModal: React.FC<Props> = ({
  closeModal,
  id,
  action,
  dateTime,
  put,
  del,
}) => {
  const [datetime, setDatetime] = useState(dateTime);

  const handleSave = () => {
    put(id, action, datetime);
    closeModal();
  };
  const handleDelete = () => {
    if (!prompt("削除していいですか？")) return;
    del(id, action);
    closeModal();
  };
  return (
    <div>
      <h2>{action} 編集</h2>
      <input
        id="date"
        type="date"
        defaultValue={dayjs(datetime).format("YYYY-MM-DD")}
        className="block p-2 m-5 border"
        onChange={e => {
          if (dayjs(e.target.value).isValid()) {
            setDatetime(new Date(e.target.value));
          }
        }}
      />
      <ModalButton
        onClick={closeModal}
        text="閉じる"
        colorClass="bg-gray-300"
      ></ModalButton>
      <ModalButton
        onClick={handleSave}
        text="保存"
        colorClass="bg-blue-500"
      ></ModalButton>
      <button onClick={handleDelete} className="absolute inset-b-0 right-20">
        <Image
          alt="削除"
          src="/weight/rubbish.png"
          width={20}
          height={20}
        ></Image>
      </button>
    </div>
  );
};
