"use client";

import Skeleton from "@/components/ui/skeleton";

export default function Loading() {
   return (
      <div className="ml-0 gap-4 lg:grid lg:grid-cols-[1fr_3fr]">
         <div className="flex h-min flex-col items-center rounded-xl bg-text py-2 text-background">
            <Skeleton height="24px" width="60%" />
            <Skeleton
               height="64px"
               width="64px"
               circle={true}
               className="my-2"
            />
            <Skeleton height="16px" width="60%" />
            <Skeleton height="16px" className="mt-2" width="40%" />
         </div>
         <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 9 }, (_, i) => i).map((_, index) => (
               <div
                  className="flex flex-col items-center gap-2 rounded-xl bg-text text-background"
                  key={index}
               >
                  <Skeleton
                     height="200px"
                     width="100%"
                     className="rounded-none rounded-t-xl"
                  ></Skeleton>
                  <div className="ml-2 flex w-full flex-col items-center gap-2">
                     <Skeleton height="24px" width="70%" />
                     <Skeleton className="my-2" height="20px" width="50%" />
                  </div>
                  <div className="ml-2 flex w-full flex-col gap-2">
                     <Skeleton height="24px" width="10%" />
                     <Skeleton height="16px" width="70%" />
                     <Skeleton height="16px" width="50%" />
                     <Skeleton height="16px" width="40%" />
                     <Skeleton height="16px" width="50%" />
                  </div>
                  <div className="ml-2 flex w-full flex-col items-center gap-2">
                     <Skeleton
                        height="28px"
                        width="40%"
                        className="mb-1 !rounded-md"
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}
