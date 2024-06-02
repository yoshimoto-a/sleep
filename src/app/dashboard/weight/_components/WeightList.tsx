"use client";
import dayjs from "dayjs";
import { ControlButtomWithModal } from "../_components/ControlButtomWithModal";
import { Item } from "../_components/Item";
import { dailyIncrease } from "../_utils/dailyIncrease";
import { IndexResponse } from "@/app/_types/apiRequests/dashboard/weight";

interface Props {
  data: IndexResponse;
  mutate: any;
}
export const WeightList: React.FC<Props> = ({ data, mutate }) => {
  const noData = data?.status !== 200 || !("data" in data) || !data.data;

  return (
    <div className="pt-8 w-full flex flex-col items-center">
      <div className="border-b border-slate-600 w-4/5 py-2 flex justify-center gap-4 pr-6">
        <Item item="日付" />
        <Item item="体重" />
        <Item item="g/日" />
      </div>
      {!noData ? (
        data.data.map((item, index) => (
          <div
            key={item.id}
            className="border-b border-slate-600 w-4/5 py-2 flex justify-center gap-4"
          >
            <Item item={dayjs(item.measurementDate).format("YYYY/MM/DD")} />
            <Item item={`${item.weight.toLocaleString().toString()}g`} />

            <Item
              item={
                index !== 0
                  ? `${dailyIncrease(item, data.data[index - 1])}g/日`
                  : "-"
              }
            />
            <ControlButtomWithModal
              isSubmitting={false}
              rowItem={item}
              mutate={mutate}
            />
          </div>
        ))
      ) : (
        <div className="text-canter mt-10">データがありません</div>
      )}
    </div>
  );
};
