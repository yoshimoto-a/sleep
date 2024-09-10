import { useButtonArea } from "../_hooks/useButtonArea";
import { filterButtonNames } from "../_utils/filterButtonNames";
import { Button } from "./Button";
import { InputAcionModal } from "./InputActionModal";
import { InputAllModal } from "./InputAllModal";
import { CustomModal } from "@/app/_components/modal";
import { ActionName } from "@/app/_types/apiRequests/dashboard/sleep";
interface Props {
  mutate: any;
  latestAction: ActionName | undefined;
  hasLatestBedtimeData: boolean | undefined;
}
export const ButtonArea: React.FC<Props> = ({
  mutate,
  latestAction,
  hasLatestBedtimeData,
}) => {
  const {
    isModalOpen,
    action,
    datetime,
    isAllModalOpen,
    baseButtons,
    setIsAllModalOpen,
    setIsModalOpen,
  } = useButtonArea();

  return (
    <>
      <div className="max-w-md fixed bottom-16 w-full px-3 py-2 flex justify-end gap-3 items-center z-50">
        {baseButtons
          .filter(item =>
            filterButtonNames(latestAction, hasLatestBedtimeData).includes(
              item.text
            )
          )
          .map((item, index) => {
            return (
              <Button
                key={index}
                icon={item.icon}
                text={item.text}
                action={item.action}
                onclick={item.onclick}
              />
            );
          })}
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
        />
      </CustomModal>
      <CustomModal
        isOpen={isAllModalOpen}
        onClose={() => setIsAllModalOpen(false)}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-20"
      >
        <InputAllModal setAllIsModalOpen={setIsAllModalOpen} mutate={mutate} />
      </CustomModal>
    </>
  );
};
