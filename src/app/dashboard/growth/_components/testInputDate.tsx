import dayjs from "dayjs";
import { useState } from "react";
import { ModalButton } from "./ModalButton";
interface Props {
  closeModal: () => void;
  value: string;
  date: Date | null | undefined;
  state: boolean;
  updateDate: (key: string, isActive: boolean, date: Date) => void;
}

export const InputDate: React.FC<Props> = ({
  closeModal,
  value,
  date,
  state,
  updateDate,
}) => {
  const [modalDate, setModalDate] = useState(date || new Date());
  const handleSave = () => {
    updateDate(value, state, modalDate);
    closeModal();
  };
  return (
    <>
      <input
        id="date"
        type="date"
        value={dayjs(modalDate).format("YYYY-MM-DD")}
        className="block p-2 m-5 border"
        onChange={e => {
          if (dayjs(e.target.value).isValid()) {
            setModalDate(new Date(e.target.value));
          }
        }}
      />
      <div className="w-full flex justify-between">
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
      </div>
    </>
  );
};
