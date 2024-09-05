/**ログの行データ */
import React, { useMemo } from "react";

interface Props {
  id: number;
  time: string;
  action: string;
  interval: string;
}
export const RowItem: React.FC<Props> = ({ time, action, interval }) => {
  const { fontColor } = useMemo(() => {
    let fontColor = "";
    switch (action) {
      case "寝かしつけ":
        fontColor = "text-blue-500";
        break;
      case "寝た":
        fontColor = "text-teal-500";
        break;
      case "起きた":
        fontColor = "text-indigo-800";
        break;
    }
    return { fontColor };
  }, [action]);

  return (
    <div className={`${fontColor} border-b py-2`}>
      <span className="mr-3">{time}</span>
      <span>{action}</span>
      <span className="absolute right-2">{interval}</span>
    </div>
  );
};
