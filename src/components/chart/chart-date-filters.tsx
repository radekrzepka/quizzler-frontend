import { subDays } from "date-fns";
import { Dispatch, FC, SetStateAction, useState } from "react";
import classNames from "classnames";
interface ChartDateFiltersProps {
   changeStartDate: Dispatch<SetStateAction<Date>>;
   registerDate: Date;
}

const ChartDateFilters: FC<ChartDateFiltersProps> = ({
   changeStartDate,
   registerDate,
}) => {
   const today = new Date();
   const [selectedButton, setSelectedButton] = useState(4);
   const formattingOption = "bg-background text-white";
   return (
      <div className="my-2 flex flex-wrap items-center justify-center gap-4">
         <button
            className={classNames(
               "rounded-md bg-accent p-1 px-6 text-background",
               selectedButton == 1 ? formattingOption : "",
            )}
            onClick={() => {
               changeStartDate(subDays(today, 7));
               setSelectedButton(1);
            }}
         >
            Last week
         </button>
         <button
            className={classNames(
               "rounded-md bg-accent p-1 px-6 text-background",
               selectedButton == 2 ? formattingOption : "",
            )}
            onClick={() => {
               changeStartDate(subDays(today, 31));
               setSelectedButton(2);
            }}
         >
            Last month
         </button>
         <button
            className={classNames(
               "rounded-md bg-accent p-1 px-6 text-background",
               selectedButton == 3 ? formattingOption : "",
            )}
            onClick={() => {
               changeStartDate(subDays(today, 365));
               setSelectedButton(3);
            }}
         >
            Last year
         </button>
         <button
            className={classNames(
               "rounded-md bg-accent p-1 px-6 text-background",
               selectedButton == 4 ? formattingOption : "",
            )}
            onClick={() => {
               changeStartDate(registerDate);
               setSelectedButton(4);
            }}
         >
            All time
         </button>
      </div>
   );
};

export default ChartDateFilters;
