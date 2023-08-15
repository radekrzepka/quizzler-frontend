"use client";

import { ChartData } from "@/types/chart-data";
import { FC } from "react";
import {
   LineChart,
   Line,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
} from "recharts";

interface CustomLineChartProps {
   data: ChartData;
   id: string;
}

const CustomLineChart: FC<CustomLineChartProps> = ({ data, id }) => {
   return (
      <ResponsiveContainer width="90%" height={400}>
         <LineChart
            data={data}
            margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
            id={id}
         >
            <Line type="monotone" dataKey="value" stroke="#141326" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
         </LineChart>
      </ResponsiveContainer>
   );
};

export default CustomLineChart;
