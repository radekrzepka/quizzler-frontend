import { subDays } from "date-fns";
import { Dispatch, FC, SetStateAction } from "react";

interface ChartDateFilersProps {
   changeStartDate: Dispatch<SetStateAction<Date>>;
   registerDate: Date;
}

const ChartDateFilers: FC<ChartDateFilersProps> = ({
   changeStartDate,
   registerDate,
}) => {
   const today = new Date();

   return (
      <div className="my-2 flex flex-wrap items-center justify-center gap-4">
         <button
            className="rounded-md bg-accent p-1 px-6 text-background"
            onClick={() => changeStartDate(subDays(today, 7))}
         >
            Last week
         </button>
         <button
            className="rounded-md bg-accent p-1 px-6 text-background"
            onClick={() => changeStartDate(subDays(today, 31))}
         >
            Last month
         </button>
         <button
            className="rounded-md bg-accent p-1 px-6 text-background"
            onClick={() => changeStartDate(subDays(today, 365))}
         >
            Last year
         </button>
         <button
            className="rounded-md bg-accent p-1 px-6 text-background"
            onClick={() => changeStartDate(registerDate)}
         >
            All time
         </button>
      </div>
   );
};

export default ChartDateFilers;
