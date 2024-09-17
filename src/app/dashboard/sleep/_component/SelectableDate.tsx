"use client";
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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-3"
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
