"use client";
import { ja } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import { dayjs } from "../../../../utils/dayjs";
import { useSelectableDate } from "../_hooks/useSelectedDate";
import { Button } from "@/app/_components/Button";
import { CustomModal } from "@/app/_components/modal";
import "react-datepicker/dist/react-datepicker.css";
registerLocale("ja", ja);
interface Props {
  date: Date;
  setGetDate: (date: Date) => void;
}

export const SelectableDate: React.FC<Props> = ({ date, setGetDate }) => {
  const { isOpen, setIsOpen, selectedDate, setModalDate, handleSubmit } =
    useSelectableDate(date, setGetDate);

  return (
    <>
      <span
        onClick={() => {
          setIsOpen(true);
        }}
        className="cursor-pointer"
      >
        {dayjs(selectedDate).format("YYYY年M月D日(ddd)")}
      </span>
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
