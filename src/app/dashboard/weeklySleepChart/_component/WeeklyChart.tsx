import React from "react";
import { BarChart, Bar, YAxis, XAxis, Tooltip } from "recharts";
import { ChartXAxisTicks } from "./ChartXAxisTick";
import { ChartData } from "@/app/_types/apiRequests/dashboard/sleep";
interface Props {
  chartData: ChartData[] | undefined;
  keyName: string[] | undefined;
}

export const WeeklyChart: React.FC<Props> = ({ chartData, keyName }) => {
  const noData = <div className="text-center">データがありません</div>;
  if (!chartData) return noData;
  if (!keyName) return noData;
  const tooltipFormatter = (value: number, name: any) => {
    const hour = Math.floor(value / 60);
    const min = value % 60;
    return [`${hour}時間${min}分`, name];
  };

  const ticks = Array.from({ length: 9 }, (_, i) => i * 3 * 60);

  const tickFormatter = (value: number) => {
    const hour = value / 60;
    return `${hour}時`;
  };

  return (
    <div className="flex justify-center mt-2 whitespace-pre-wrap">
      <BarChart
        width={375}
        height={350}
        data={chartData}
        layout="horizontal"
        barSize={20}
        margin={{ top: 10, right: 0, left: 0, bottom: 10 }}
      >
        <XAxis
          type="category"
          dataKey="date"
          tick={props => <ChartXAxisTicks {...props} />}
          className="text-[10px]"
          /**↓これがないとx軸ラベル3個しか表示されない */
          interval={0}
        />
        <YAxis
          type="number"
          ticks={ticks}
          tickFormatter={tickFormatter}
          domain={[0, 24 * 60]}
          interval={0}
          reversed={true}
        />
        <Tooltip formatter={tooltipFormatter} />
        {keyName.map((item, index) => {
          if (item.includes("活動時間")) {
            return (
              <Bar dataKey={item} stackId="a" fill="#c2c2f8" key={index} />
            );
          } else {
            return (
              <Bar dataKey={item} stackId="a" fill="#3B82F6" key={index} />
            );
          }
        })}
      </BarChart>
    </div>
  );
};
