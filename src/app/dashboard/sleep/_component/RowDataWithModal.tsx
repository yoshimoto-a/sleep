"use client";
import { useState } from "react";
import { useCallback } from "react";
import { InputModal } from "./InputModal";
import { RowItem } from "./rowItem";
import { CustomModal } from "@/app/_components/modal";
import { FormatedData } from "@/app/_types/apiRequests/dashboard/sleep";

interface Props {
  rowKey: number;
  id: number;
  action: string;
  HourAndMinutes: string;
  data: FormatedData[];
  MinutesOnly: string;
  mutate: any;
}
export const RowDataWithModal: React.FC<Props> = ({
  rowKey,
  id,
  action,
  HourAndMinutes,
  data,
  MinutesOnly,
  mutate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div key={rowKey} onClick={() => setIsOpen(true)}>
      <RowItem
        key={rowKey}
        id={id}
        time={HourAndMinutes}
        action={action}
        interval={MinutesOnly}
      ></RowItem>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <InputModal id={id} onClose={onClose} mutate={mutate}></InputModal>
      </CustomModal>
    </div>
  );
};
