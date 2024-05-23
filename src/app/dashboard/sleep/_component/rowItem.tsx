/**ログの行データ */
import React from "react";

interface Props {
  id: number;
  time: string;
  action: string;
  interval: string;
}
export const RowItem: React.FC<Props> = ({ time, action, interval }) => {
  return (
    <div className="border-b py-2 px-2">
      <span className="mr-3">{time}</span>
      <span>{action}</span>
      <span className="absolute right-2">{interval}</span>
    </div>
  );
};
