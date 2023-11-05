"use client";

import { FC } from "react";
import Skeleton from "../ui/skeleton";

const LessonCardSkeleton: FC = () => {
   return (
      <div className="flex flex-col items-center gap-2 rounded-xl bg-text text-background">
         <Skeleton
            height="200px"
            width="100%"
            className="rounded-none rounded-t-xl"
         ></Skeleton>
         <div className="flex w-full flex-col items-center gap-2">
            <Skeleton height="20px" width="70%" />
            <Skeleton height="20px" width="50%" />
            <Skeleton height="16px" width="90%" />
            <Skeleton height="16px" width="90%" />
            <Skeleton height="24px" width="40%" className="mb-1" />
         </div>
      </div>
   );
};

export default LessonCardSkeleton;
