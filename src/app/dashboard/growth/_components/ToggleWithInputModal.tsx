import React from "react";
import { Toggle } from "./toggle";
import { CustomModal } from "@/app/_components/modal";
import { InputDate } from "./inputDate";
import dayjs from "dayjs";

export const ToggleWithInputModal: React.FC<any> = ({
  isChecked,
  onChange,
  onUpdate,
  date,
  value,
  state,
}) => {
  const [openModal, setOpenModal] = React.useState(false);
  return (
    <div className="w-1/4 text-center">
      <Toggle
        isChecked={isChecked}
        handleChange={onChange}
        date={
          !date.turningOverCompDate
            ? ""
            : dayjs(date.turningOverCompDate).format("YYYY-MM-DD")
        }
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
          state={state}
          updateDate={onUpdate}
        ></InputDate>
      </CustomModal>
    </div>
  );
};
