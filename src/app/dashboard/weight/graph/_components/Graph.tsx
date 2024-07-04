import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";
import { WeightGraph } from "@/app/_types/apiRequests/dashboard/weight/Index";
interface Props {
  data: WeightGraph[] | undefined;
}
export const Graph: React.FC<Props> = ({ data }) => {
  const yTicks = Array.from({ length: 13 }, (_, i) => i * 1000);
  const xTicks = Array.from({ length: 21 }, (_, i) => i);
  return (
    <div className="w-full mt-10 flex justify-center">
      <LineChart
        width={480}
        height={600}
        data={data}
        margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis dataKey="monthAge" type="number" ticks={xTicks} interval={0} />
        <YAxis ticks={yTicks} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="weight" stroke="#3B82F6" name="体重" />
      </LineChart>
    </div>
  );
};
