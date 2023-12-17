import { getDay } from "date-fns";

interface DashboardWeekChartProps {
   activity: Array<Date>;
}
const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const DashboardWeekChart = ({ activity }: DashboardWeekChartProps) => {
   const activeDays = activity.map(date => (getDay(new Date(date)) + 6) % 7);

   return (
      <div className="mt-2 grid grid-cols-7 ">
         {days.map((day, index) => (
            <div
               key={day}
               className={`${
                  activeDays.includes(index) ? "bg-accent" : "bg-text"
               } ${day == "Mo" ? "rounded-l-md" : ""} ${
                  day == "Su" ? "rounded-r-md" : ""
               } text-center text-background`}
            >
               {day}
            </div>
         ))}
      </div>
   );
};

export default DashboardWeekChart;
