// import { Action } from "../_types/action";
import { RowDataWithModal } from "./RowDataWithModal";
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
  if (isLoading) return <div>読込み中...</div>;
  if (error) return <div>データ取得失敗</div>;
  if (!data || data.data.length === 0) return <div>データがありません</div>;
  return (
    <div>
      {data.data.map((record, index) => {
        return (
          <RowDataWithModal
            key={index}
            rowKey={index}
            id={record.id}
            action={record.action}
            mutate={mutate}
            HourAndMinutes={record.HourAndMinutes}
            MinutesOnly={record.MinutesOnly}
          ></RowDataWithModal>
        );
      })}
    </div>
  );
};
