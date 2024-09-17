"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ja } from "date-fns/locale";
import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { dayjs } from "../../../../utils/dayjs";
import { Button } from "@/app/_components/Button";
import { CustomModal } from "@/app/_components/modal";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ja", ja);
interface Props {
  date: Date;
  setGetDate: (date: Date) => void;
}

export const SelectableDate: React.FC<Props> = ({ date, setGetDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(date);
  const [modalDate, setModalDate] = useState(selectedDate);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSelectedDate(modalDate);
    setGetDate(modalDate);
    setIsOpen(false);
  };
  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className="cursor-pointer"
      >
        {dayjs(selectedDate).format("YYYY年M月D日(ddd)")}
      </button>
      <CustomModal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        className=""
      >
        <div
          className="flex justify-end cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faXmark} className="h-6" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-5 h-[90%]"
        >
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => setModalDate(date as Date)}
            inline
            open={true}
            locale="ja"
          />
          <div className="h-10 w-32">
            <Button type="submit" variant="contained-blu500">
              表示する
            </Button>
          </div>
        </form>
      </CustomModal>
    </>
  );
};
