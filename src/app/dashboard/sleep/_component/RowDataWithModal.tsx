"use client";
import { useState } from "react";
import { useCallback } from "react";
import { InputModal } from "./InputModal";
import { RowItem } from "./RowItem";
import { CustomModal } from "@/app/_components/modal";

interface Props {
  rowKey: number;
  id: number;
  action: string;
  HourAndMinutes: string;
  MinutesOnly: string;
  mutate: any;
}
export const RowDataWithModal: React.FC<Props> = ({
  rowKey,
  id,
  action,
  HourAndMinutes,
  MinutesOnly,
  mutate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div key={rowKey}>
      <div onClick={() => setIsOpen(true)}>
        <RowItem
          key={rowKey}
          id={id}
          time={HourAndMinutes}
          action={action}
          interval={MinutesOnly}
        />
      </div>
      <CustomModal
        isOpen={isOpen}
        onClose={onClose}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <InputModal id={id} onClose={onClose} mutate={mutate} />
      </CustomModal>
    </div>
  );
};
