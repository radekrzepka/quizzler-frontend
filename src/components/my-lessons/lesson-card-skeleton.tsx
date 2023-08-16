"use client";

import { FC } from "react";
import Skeleton from "../ui/skeleton";

const LessonCardSkeleton: FC = ({}) => {
   return (
      <div className="flex flex-col items-center gap-2 rounded-xl bg-text text-background">
         <Skeleton
            height="200px"
            width="100%"
            className="rounded-none rounded-t-xl"
         ></Skeleton>
         <div className="my-3 flex w-full flex-col items-center gap-1">
            <Skeleton height="20px" width="50%" />
            <Skeleton height="14px" width="70%" />
            <Skeleton height="14px" width="70%" />
         </div>
      </div>
   );
};

export default LessonCardSkeleton;
