"use client";

import InputSkeleton from "@/components/ui/input-skeleton";
import Skeleton from "@/components/ui/skeleton";

export default function Loading() {
   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[3fr_2fr]">
         <div className="flex flex-col items-center rounded-xl bg-text py-2 text-background">
            <Skeleton height="36px" width="20%" />
            <Skeleton
               height="64px"
               width="64px"
               circle={true}
               className="my-2"
            />
            <Skeleton height="16px" width="20%" />
            <Skeleton height="16px" className="mt-2" width="60%" />
            <Skeleton height="36px" className="mt-5" width="40%" />
            <Skeleton height="18px" className="mt-2" width="40%" />
            <Skeleton height="300px" className="mt-2" width="80%" />
            <Skeleton height="18px" className="mt-2" width="40%" />
            <Skeleton height="300px" className="mt-2" width="80%" />
         </div>
         <div className="flex flex-col items-center gap-4 rounded-xl bg-text text-background">
            <div className="flex w-full flex-col items-center">
               <Skeleton height="36px" className="mb-10 mt-2" width="50%" />
               <InputSkeleton />
               <InputSkeleton />
               <InputSkeleton />
               <InputSkeleton />
               <InputSkeleton />
            </div>
            <div className="flex w-full flex-col items-center">
               <Skeleton height="36px" className="mb-10 mt-2" width="50%" />
               <InputSkeleton />
               <InputSkeleton />
            </div>
         </div>
      </div>
   );
}
