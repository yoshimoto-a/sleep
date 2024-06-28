import React from "react";
import { BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from "recharts";
import { ChartData } from "@/app/_types/apiRequests/dashboard/sleep";

interface Props {
  chartData: ChartData[] | undefined;
}
export const Chart: React.FC<Props> = ({ chartData }) => {
  if (!chartData) return <div>データなし</div>;
  return (
    <BarChart
      width={150}
      height={450}
      data={chartData}
      layout="vertical"
      barSize={20}
    >
      <XAxis type="number" hide={true} />
      <YAxis type="category" dataKey="time" />
      <Tooltip />
      <Bar dataKey="awake" stackId="a" fill="#c2c2f8">
        {chartData.map((entry, index) => (
          <Cell key={`cell-awake-${index}`} />
        ))}
      </Bar>
      <Bar dataKey="sleep" stackId="a" fill="#82CA9D">
        {chartData.map((entry, index) => (
          <Cell key={`cell-sleep-${index}`} />
        ))}
      </Bar>
    </BarChart>
  );
};
