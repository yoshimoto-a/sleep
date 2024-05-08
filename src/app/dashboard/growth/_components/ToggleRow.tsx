import { ToggleWithInputModal } from "./ToggleWithInputModal";
interface Props {
  label: string;
  rowItem: {
    isChecked: boolean;
    onChange: () => void;
    onUpdate: (key: string, isActive: boolean, date: Date) => void;
    date: Date | null | undefined;
    value: string;
  }[];
}

export const ToggleRow: React.FC<Props> = ({ label, rowItem }) => {
  return (
    <div className="flex justify-between items-center gap-4">
      <div className="w-1/4 text-center">{label}</div>
      {rowItem.map(item => (
        <ToggleWithInputModal
          key={item.value}
          isChecked={item.isChecked}
          onChange={item.onChange}
          onUpdate={item.onUpdate}
          date={item.date}
          value={item.value}
        ></ToggleWithInputModal>
      ))}
    </div>
  );
};
