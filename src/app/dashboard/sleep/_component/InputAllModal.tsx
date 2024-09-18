import { useDatetimeValidation } from "../_hooks/useDatetimeValidation";
import { Action } from "../_types/action";
import { InputDatetime } from "./InputDatetime";
import { Button } from "@/app/_components/Button";
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
  const { allDatetime, errors, handleChange } = useDatetimeValidation();
  const fetcher = useApi();
  const handleSave = async () => {
    if (errors.sleepError !== "" || errors.wakeupError !== "") {
      return;
    }
    const body = {
      bedtime: allDatetime.bedTime,
      sleep: allDatetime.sleep,
      wakeup: allDatetime.wakeup,
    };
    try {
      const resp = await fetcher.post<PostRequest, PostResonse>(
        "/api/dashboard/allSleepData",
        body
      );
      if (resp.status !== 200) {
        throw new Error(resp.message);
      }
      mutate();
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    } finally {
      setAllIsModalOpen(false);
    }
  };

  return (
    <>
      <InputDatetime
        id="bedTime"
        label="寝かしつけ"
        date={allDatetime.bedTime}
        err=""
        onChange={e => {
          handleChange(new Date(e.target.value), e.target.id as Action);
        }}
      />
      <InputDatetime
        id="sleep"
        label="寝た"
        date={allDatetime.sleep}
        err={errors.sleepError}
        onChange={e => {
          handleChange(new Date(e.target.value), e.target.id as Action);
        }}
      />
      <InputDatetime
        id="wakeup"
        label="起きた"
        date={allDatetime.wakeup}
        err={errors.wakeupError}
        onChange={e => {
          handleChange(new Date(e.target.value), e.target.id as Action);
        }}
      />
      <div className="w-full flex flex-col pt-3 gap-5 justify-center">
        <div className="h-10">
          <Button
            onClick={() => setAllIsModalOpen(false)}
            type="button"
            variant="contained-gry"
          >
            閉じる
          </Button>
        </div>
        <div className="h-10">
          <Button onClick={handleSave} type="button" variant="contained-blu500">
            保存
          </Button>
        </div>
      </div>
    </>
  );
};
