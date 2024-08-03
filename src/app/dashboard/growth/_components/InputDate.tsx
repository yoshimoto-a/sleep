import { useState } from "react";
import { dayjs } from "../../../../utils/dayjs";
import { Button } from "@/app/_components/Button";
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
        className="block p-2 mb-3 border w-full"
        onChange={e => {
          if (dayjs(e.target.value).isValid()) {
            setModalDate(new Date(e.target.value));
          }
        }}
      />
      <div className="w-full flex flex-col justify-between gap-3">
        <div className="h-10">
          <Button onClick={closeModal} type="button" variant="contained-gry">
            閉じる
          </Button>
        </div>
        <div className="h-10">
          <Button onClick={handleSave} type="button" variant="contained-blu500">
            保存
          </Button>
        </div>
      </div>
    </>
  );
};
