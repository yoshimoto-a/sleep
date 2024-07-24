import { useState } from "react";
import { Action } from "../_types/action";
import { Button } from "./Button";
import { InputAcionModal } from "./InputActionModal";
import { InputAllModal } from "./InputAllModal";
import { CustomModal } from "@/app/_components/modal";

interface Props {
  mutate: any;
}
export const ButtonArea: React.FC<Props> = ({ mutate }) => {
  //都度入力用のステート
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action, setAction] = useState<Action>("sleep");
  const [datetime, setDatetime] = useState(new Date());

  const handleClick = async (action: Action) => {
    setDatetime(new Date());
    setAction(action);
    setIsModalOpen(true);
  };
  //まとめて入力する画面
  const [isAllModalOpen, setIsAllModalOpen] = useState(false);

  const handleClickAll = () => {
    setIsAllModalOpen(true);
  };
  return (
    <>
      <div className="max-w-md fixed bottom-16 w-full px-3 py-2 flex justify-between items-center z-50">
        <Button
          icon="/_buttonIcon/all.png"
          text="一括登録"
          action="wakeup"
          onclick={handleClickAll}
        ></Button>
        <Button
          icon="/_buttonIcon/start.png"
          text="寝かしつけ"
          action="bedTime"
          onclick={() => handleClick("bedTime")}
        ></Button>
        <Button
          icon="/_buttonIcon/sleep.png"
          text="寝た"
          action="sleep"
          onclick={() => handleClick("sleep")}
        ></Button>
        <Button
          icon="/_buttonIcon/wakeUp.png"
          text="起きた"
          action="wakeup"
          onclick={() => handleClick("wakeup")}
        ></Button>
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <InputAcionModal
          mutate={mutate}
          action={action}
          datetime={datetime}
          setIsModalOpen={setIsModalOpen}
        ></InputAcionModal>
      </CustomModal>
      <CustomModal
        isOpen={isAllModalOpen}
        onClose={() => setIsAllModalOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <InputAllModal
          setAllIsModalOpen={setIsAllModalOpen}
          mutate={mutate}
        ></InputAllModal>
      </CustomModal>
    </>
  );
};
