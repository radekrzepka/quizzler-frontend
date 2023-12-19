"use client";

import Skeleton from "@/components/ui/skeleton";
import { useSearchParams } from "next/navigation";

export default function Loading() {
   const serachPrams = useSearchParams();
   const query = serachPrams.get("query");

   return (
      <>
         <h2 className="mb-6 text-4xl">Results for &quot;{query}&quot; </h2>
         <h2 className="text-3xl">Lessons:</h2>
         <div className="mb-6 grid gap-2 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 9 }, (_, i) => i).map((_, index) => (
               <div
                  key={`lesson-search-card-${index}`}
                  className="flex flex-col justify-between rounded-xl bg-text px-[6px] py-2 text-background sm:grid sm:grid-cols-[4fr_1fr]"
               >
                  <div className="flex items-center gap-2">
                     <Skeleton height="64px" width="64px" />
                     <div className="w-full">
                        <Skeleton height="24px" className="mb-1" width="50%" />
                        <Skeleton width="40%" />
                        <div className="mt-1 flex flex-wrap gap-2">
                           {Array.from({ length: 4 }, (_, i) => i).map(
                              (_, index) => (
                                 <Skeleton
                                    key={`lesson-tag-${index}`}
                                    width="20%"
                                 />
                              )
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="mt-2 flex flex-row items-center justify-between sm:mt-0 sm:flex-col-reverse sm:items-end">
                     <Skeleton height="24px" width="100%" />
                     <Skeleton height="24px" width="35%" />
                  </div>
               </div>
            ))}
         </div>
         <h2 className="text-3xl">Users:</h2>
         <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 5 }, (_, i) => i).map((_, index) => (
               <div
                  key={`user-search-card-${index}`}
                  className="flex flex-col justify-between rounded-xl bg-text p-2 text-background"
               >
                  <div className="mb-2 grid w-full grid-cols-[44px_1fr] items-center gap-2">
                     <Skeleton width="44px" height="44px" circle />
                     <div>
                        <Skeleton height="24px" className="mb-1" width="50%" />
                        <Skeleton width="35%" className="mb-1" />
                        <Skeleton width="25%" className="mb-1" />
                        <Skeleton width="30%" />
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
}
