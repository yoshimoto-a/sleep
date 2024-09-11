import React from "react";
import { XAxisProps } from "recharts";

interface Props extends XAxisProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
  paddingTop?: number;
}

export const ChartXAxisTicks: React.FC<Props> = ({ x, y, payload }) => {
  const lines = payload.value.split("\n");
  return (
    <g transform={`translate(${x},${y + 10})`}>
      {lines.map((line, index) => (
        <text key={index} x={0} y={index * 20} textAnchor="middle" fill="#666">
          {line}
        </text>
      ))}
    </g>
  );
};
