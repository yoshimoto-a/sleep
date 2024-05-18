import { useState } from "react";
// import { Action } from "../_types/action";
import { InputModal } from "./InputModal";
import { RowItem } from "./rowItem";
import { CustomModal } from "@/app/_components/modal";
import { useApi } from "@/app/_hooks/useApi";
import { SleepingSituationResponse } from "@/app/_types/apiRequests/dashboard/sleep";

interface Props {
  data: SleepingSituationResponse | undefined;
  isLoading: boolean;
  error: any;
  mutate: any;
}
export const ShowData: React.FC<Props> = ({
  data,
  isLoading,
  error,
  mutate,
}) => {
  const [isOpen, setOpen] = useState(false);
  const fetcher = useApi();
  const getEndpoint = (action: string) => {
    switch (action) {
      case "寝かしつけ開始":
        return "/api/dashboard/bedTime";
      case "寝た":
        return "/api/dashboard/sleep";
      case "起きた":
        return "/api/dashboard/wakeup";
      default:
        throw new Error("illegal action");
    }
  };
  const put = async (id: number, action: string, datetime: Date) => {
    try {
      const endpoint = getEndpoint(action);
      const body = {
        id,
        data: {
          [action]: datetime,
        },
      };
      await fetcher.put(endpoint, body);
      mutate();
    } catch (e) {
      alert("更新に失敗しました");
    }
  };
  const del = async (id: number, action: string) => {
    try {
      const endpoint = getEndpoint(action);
      await fetcher.del(`${endpoint}?id=${id}`);
      mutate();
    } catch (e) {
      alert("削除に失敗しました");
    }
  };
  const onClose = () => {
    setOpen(false);
  };
  if (isLoading) return <div>読込み中...</div>;
  if (error) return <div>データ取得失敗</div>;
  if (!data) return <div>データがありません</div>;
  return (
    <div>
      {data.data.map((record, index) => {
        return (
          <div key={index} onClick={() => setOpen(true)}>
            <RowItem
              key={index}
              id={record.id}
              time={record.HourAndMinutes}
              action={record.action}
              interval={record.MinutesOnly}
            ></RowItem>
            <CustomModal isOpen={isOpen} onClose={onClose} className="">
              <InputModal
                id={record.id}
                action={record.action}
                closeModal={onClose}
                dateTime={record.datetime}
                put={put}
                del={del}
              ></InputModal>
            </CustomModal>
          </div>
        );
      })}
    </div>
  );
};
