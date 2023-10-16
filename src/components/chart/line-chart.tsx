"use client";

import { ChartData } from "@/types/chart-data";
import { FC } from "react";
import {
   LineChart as RechartLineChart,
   Line,
   CartesianGrid,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
} from "recharts";

interface LineChartProps {
   data: ChartData;
   id: string;
}

const LineChart: FC<LineChartProps> = ({ data, id }) => {
   return (
      <ResponsiveContainer width="90%" height={300}>
         <RechartLineChart data={data} id={id}>
            <Line type="monotone" dataKey="value" stroke="#141326" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
         </RechartLineChart>
      </ResponsiveContainer>
   );
};

export default LineChart;
