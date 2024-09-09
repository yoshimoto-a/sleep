import { useState } from "react";
import { Buttons } from "../_types/Buttons";
import { Action } from "../_types/action";

export const useButtonArea = () => {
  //都度入力用のステート
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<Action>("sleep");
  const [datetime, setDatetime] = useState(new Date());
  //一括登録用
  const [isAllModalOpen, setIsAllModalOpen] = useState(false);

  const handleClick = async (action: Action) => {
    setDatetime(new Date());
    setAction(action);
    setIsModalOpen(true);
  };

  const handleClickAll = () => {
    setIsAllModalOpen(true);
  };

  const baseButtons: Buttons[] = [
    {
      icon: "/_buttonIcon/all.png",
      text: "一括登録",
      action: "wakeup",
      onclick: handleClickAll,
    },
    {
      icon: "/_buttonIcon/start.png",
      text: "寝かしつけ",
      action: "bedTime",
      onclick: () => handleClick("bedTime"),
    },
    {
      icon: "/_buttonIcon/sleep.png",
      text: "寝た",
      action: "sleep",
      onclick: () => handleClick("sleep"),
    },
    {
      icon: "/_buttonIcon/wakeUp.png",
      text: "起きた",
      action: "wakeup",
      onclick: () => handleClick("wakeup"),
    },
  ];

  return {
    isModalOpen,
    action,
    datetime,
    isAllModalOpen,
    baseButtons,
    setIsAllModalOpen,
    setIsModalOpen,
  };
};
