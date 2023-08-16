"use client";

import { FC } from "react";
import Skeleton from "../ui/skeleton";

const LessonCardSkeleton: FC = ({}) => {
   return (
      <div className="flex flex-col items-center gap-2 rounded-xl bg-text p-6 text-background">
         <Skeleton height="200px" className="mb-2"></Skeleton>
         <Skeleton height="20px" width="90%" />
         <Skeleton height="14px" width="70%" />
         <Skeleton height="14px" width="70%" />
      </div>
   );
};

export default LessonCardSkeleton;
