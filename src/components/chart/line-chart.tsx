"use client";

import type { ChartRecord } from "@/types/chart-data";
import type {
   TooltipProps} from "recharts";
import {
   CartesianGrid,
   Line,
   LineChart as RechartLineChart,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from "recharts";
import type { NameType } from "recharts/types/component/DefaultTooltipContent";
import type { ValueType } from "tailwindcss/types/config";

interface AdditionalProps {
   recordType: string;
}
interface LineChartProps {
   data: Array<ChartRecord>;
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

const LineChart = ({ data, id, recordType }: LineChartProps) => {
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
