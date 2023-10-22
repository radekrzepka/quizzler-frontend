"use client";

import { ChartRecord } from "@/types/chart-data";
import { FC } from "react";
import {
   CartesianGrid,
   Line,
   LineChart as RechartLineChart,
   ResponsiveContainer,
   Tooltip,
   TooltipProps,
   XAxis,
   YAxis,
} from "recharts";
import { NameType } from "recharts/types/component/DefaultTooltipContent";
import { ValueType } from "tailwindcss/types/config";

interface AdditionalProps {
   recordType: string;
}
interface LineChartProps {
   data: ChartRecord[];
   recordType: string;
   id: string;
}
const CustomTooltip = ({
   active,
   payload,
   recordType,
   label,
}: TooltipProps<ValueType, NameType> & AdditionalProps) => {
   if (active) {
      return (
         <div className="rounded-md bg-accent p-1 px-3 text-background">
            <p className="description">
               <b>{`${payload?.[0].value}`}</b> {recordType}
            </p>
            <p className="description">{label}</p>
         </div>
      );
   }

   return null;
};

const LineChart: FC<LineChartProps> = ({ data, id, recordType }) => {
   return (
      <ResponsiveContainer width="90%" height={300}>
         <RechartLineChart data={data} id={id}>
            <Line type="monotone" dataKey="value" stroke="#141326" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip recordType={recordType} />} />
         </RechartLineChart>
      </ResponsiveContainer>
   );
};

export default LineChart;
