import { useContext } from "react";
import { ModalButton } from "../../growth/_components/ModalButton";
import { UserContext } from "../../layout";
import { useDatetimeValidation } from "../_hooks/useDatetimeValidation";
import { Action } from "../_types/action";
import { InputDatetime } from "./InputDatetime";
import { useApi } from "@/app/_hooks/useApi";
import { PostRequest } from "@/app/_types/apiRequests/dashboard/allSleepData/postRequest";
import { PostResonse } from "@/app/_types/apiRequests/dashboard/allSleepData/postResponse";
interface Props {
  mutate: any;
  setAllIsModalOpen: (isOpen: boolean) => void;
}
export const InputAllModal: React.FC<Props> = ({
  mutate,
  setAllIsModalOpen,
}) => {
  const [dbUserId] = useContext(UserContext);
  const { allDatetime, errors, handleChange } = useDatetimeValidation();
  const fetcher = useApi();
  const handleSave = async () => {
    if (!dbUserId) return;
    if (errors.sleepError !== "" || errors.wakeupError !== "") {
      return;
    }
    const body = {
      bedtime: allDatetime.bedTime,
      sleep: allDatetime.sleep,
      wakeup: allDatetime.wakeup,
      createUser: dbUserId,
      changeUser: dbUserId,
    };
    try {
      await fetcher.post<PostRequest, PostResonse>(
        "/api/dashboard/allSleepData",
        body
      );
      mutate();
      setAllIsModalOpen(false);
    } catch (e) {
      alert("登録に失敗しました");
    }
  };

  return (
    <>
      <h2 className="pb-3 text-center text-2xl">一括登録</h2>

      <InputDatetime
        id="bedTime"
        label="寝かしつけ開始"
        date={allDatetime.bedTime}
        err=""
        onChange={e => {
          handleChange(new Date(e.target.value), e.target.id as Action);
        }}
      ></InputDatetime>
      <InputDatetime
        id="sleep"
        label="寝た"
        date={allDatetime.sleep}
        err={errors.sleepError}
        onChange={e => {
          handleChange(new Date(e.target.value), e.target.id as Action);
        }}
      ></InputDatetime>
      <InputDatetime
        id="wakeup"
        label="起きた"
        date={allDatetime.wakeup}
        err={errors.wakeupError}
        onChange={e => {
          handleChange(new Date(e.target.value), e.target.id as Action);
        }}
      ></InputDatetime>
      <div className="w-full flex pt-3 gap-5 justify-center">
        <ModalButton
          onClick={() => setAllIsModalOpen(false)}
          text="閉じる"
          colorClass="bg-gray-300"
        ></ModalButton>
        <ModalButton
          onClick={handleSave}
          text="保存"
          colorClass="bg-blue-500"
        ></ModalButton>
      </div>
    </>
  );
};
