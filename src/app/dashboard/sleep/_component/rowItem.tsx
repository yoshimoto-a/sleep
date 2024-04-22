/**ログの行データ */
import React from "react";

interface Props {
  id: number;
  time: string;
  action: string;
  interval: string;
}
export const RowItem: React.FC<Props> = ({ id, time, action, interval }) => {
  return (
    <div className="border-b pl-2">
      <span className="mr-3">{time}</span>
      <span>{action}</span>
      <span className="absolute right-2">{interval}</span>
    </div>
  );
};
