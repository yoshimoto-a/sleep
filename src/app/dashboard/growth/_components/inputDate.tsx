import dayjs from "dayjs";
import { useState } from "react";
interface Props {
  closeModal: () => void;
  value: string;
  state: boolean;
  updateDate: (key: string, isActive: boolean, date: Date) => void;
}

export const InputDate: React.FC<Props> = ({
  closeModal,
  value,
  state,
  updateDate,
}) => {
  const [modalDate, setModalDate] = useState(new Date());
  const handleSave = () => {
    updateDate(value, state, modalDate);
    closeModal();
  };
  return (
    <>
      <input
        id="date"
        type="date"
        defaultValue={dayjs(modalDate).format("YYYY-MM-DD")}
        className="block p-2 m-5 border"
        onChange={e => {
          if (dayjs(e.target.value).isValid()) {
            setModalDate(new Date(e.target.value));
          }
        }}
      />
      <div className="w-full flex justify-between">
        <button
          onClick={closeModal}
          className="w-2/5 rounded bg-gray-300 px-4 py-2"
        >
          閉じる
        </button>
        <button
          onClick={handleSave}
          className="w-2/5 rounded bg-blue-500 px-4 py-2"
        >
          保存
        </button>
      </div>
    </>
  );
};
