"use client";
import { ToggleWithInputModal } from "./ToggleWithInputModal";
interface Props {
  label: string;
  isCheckedStart: boolean;
  onChangeStart: () => void;
  onUpdateStart: (key: string, isActive: boolean, date: Date) => void;
  startDate: Date | null;
  startValue: string;
  isCheckedComp: boolean;
  onChangeComp: () => void;
  onUpdateComp: (key: string, isActive: boolean, date: Date) => void;
  compDate: Date | null;
  compValue: string;
}

export const ToggleRow: React.FC<Props> = ({
  label,
  isCheckedStart,
  onChangeStart,
  onUpdateStart,
  startDate,
  startValue,
  isCheckedComp,
  onChangeComp,
  onUpdateComp,
  compDate,
  compValue,
}) => {
  return (
    <div className="flex justify-between items-center h-[60px]">
      <div className="w-1/3 text-center">{label}</div>
      <ToggleWithInputModal
        isChecked={isCheckedStart}
        onChange={onChangeStart}
        onUpdate={onUpdateStart}
        date={startDate}
        value={startValue}
      ></ToggleWithInputModal>
      <ToggleWithInputModal
        isChecked={isCheckedComp}
        onChange={onChangeComp}
        onUpdate={onUpdateComp}
        date={compDate}
        value={compValue}
      ></ToggleWithInputModal>
    </div>
  );
};
