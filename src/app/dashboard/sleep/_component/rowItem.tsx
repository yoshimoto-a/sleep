/**ログの行データ */
import dayjs from "dayjs";
import React from "react";

interface Props {
  time: Date;
  action: string;
  interval: string;
}
export const RowItem: React.FC<Props> = ({ time, action, interval }) => {
  return (
    <div className="border-b pl-2">
      <span className="mr-3">{dayjs(time).format("HH時mm分")}</span>
      <span>{action}</span>
      <span className="absolute right-2">{interval}</span>
    </div>
  );
};
