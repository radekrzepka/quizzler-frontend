"use client";

import { FC } from "react";
import InputSkeleton from "../ui/input-skeleton";
import Skeleton from "../ui/skeleton";

const NewLessonFormSkeleton: FC = () => {
   return (
      <div className="h-fit rounded-xl bg-text text-background">
         <Skeleton height="400px" width="100%" className="!rounded-t-xl" />
         <div className="flex flex-col gap-3 p-4">
            <Skeleton height="36px" width="50%" className="self-center" />
            <div className="flex flex-col">
               <InputSkeleton className="!mt-5 mb-5" />
            </div>
            <div className="flex flex-col">
               <Skeleton className="mb-1 mr-3" width="20%" />
               <Skeleton height="250px" />
            </div>
            <div className="mb-[23px] flex flex-col">
               <InputSkeleton className="!mt-[23px]" />
            </div>

            <Skeleton height="36px" width="100%" />
         </div>
      </div>
   );
};

export default NewLessonFormSkeleton;
