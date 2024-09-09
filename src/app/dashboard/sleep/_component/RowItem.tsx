/**ログの行データ */
import React, { useMemo } from "react";
import { ActionName } from "@/app/_types/apiRequests/dashboard/sleep";
interface Props {
  id: number;
  time: string;
  action: ActionName;
  interval: string;
}
export const RowItem: React.FC<Props> = ({ time, action, interval }) => {
  const fontColor = useMemo(() => {
    switch (action) {
      case "寝かしつけ":
        return "text-blue-500";
      case "寝た":
        return "text-teal-500";
      case "起きた":
        return "text-indigo-800";
      default:
        return "";
    }
  }, [action]);

  return (
    <div className={`${fontColor} border-b py-2`}>
      <span className="mr-3">{time}</span>
      <span>{action}</span>
      <span className="absolute right-2">{interval}</span>
    </div>
  );
};
