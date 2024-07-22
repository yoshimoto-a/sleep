import { ColumnName } from "./ColumnName";
export const HeaderArea = () => {
  return (
    <div className="flex justify-between items-center h-[55px]">
      <ColumnName title="項目" />
      <ColumnName title="練習開始" />
      <ColumnName title="習得" />
    </div>
  );
};
