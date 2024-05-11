import dayjs from "dayjs";
import React from "react";
import { Toggle } from "./Toggle";
import { InputDate } from "./inputDate";
import { CustomModal } from "@/app/_components/modal";

interface Props {
  isChecked: boolean;
  onChange: () => void;
  onUpdate: (key: string, isActive: boolean, date: Date) => void;
  date: Date | null | undefined;
  value: string;
}
export const ToggleWithInputModal: React.FC<Props> = ({
  isChecked,
  onChange,
  onUpdate,
  date,
  value,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div className="w-1/4 text-center">
      <Toggle
        isChecked={isChecked}
        handleChange={onChange}
        date={!date ? "" : dayjs(date).format("YYYY-MM-DD")}
        openModal={() => setOpenModal(true)}
      ></Toggle>
      <CustomModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <InputDate
          closeModal={() => setOpenModal(false)}
          value={value}
          state={isChecked}
          updateDate={onUpdate}
        ></InputDate>
      </CustomModal>
    </div>
  );
};
