import {
  LineChart,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  Line,
  CartesianGrid,
} from "recharts";
import { WeightGraph } from "@/app/_types/apiRequests/dashboard/weight/Index";
interface Props {
  data: WeightGraph[];
}
export const Graph: React.FC<Props> = ({ data }) => {
  const yTicks = Array.from({ length: 13 }, (_, i) => i * 1000);
  const xTicks = Array.from({ length: 21 }, (_, i) => i);
  return (
    <div className="w-full">
      <LineChart
        width={380}
        height={500}
        data={data}
        margin={{ top: 30, right: 30, left: 15, bottom: 15 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="monthAge" type="number" ticks={xTicks} interval={0}>
          <Label value="月齢(ヶ月)" position="bottom" offset={0} />
        </XAxis>
        <YAxis ticks={yTicks}>
          <Label value="体重(g)" position="left" offset={0} angle={-90} />
        </YAxis>
        <Tooltip />
        <Line type="monotone" dataKey="weight" stroke="#3B82F6" name="体重" />
      </LineChart>
    </div>
  );
};
