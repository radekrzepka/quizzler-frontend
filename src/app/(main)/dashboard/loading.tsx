"use client";

import Skeleton from "@/components/ui/skeleton";
import LessonCardDashboardSkeleton from "@/modules/dashboard/lesson-card-dashboard-skeleton";

export default function Loading() {
   return (
      <div className="grid grid-cols-1 gap-10 text-background xl:mt-4 xl:grid-cols-[1fr_3fr_1fr] xl:grid-rows-[1r_1fr_1fr]">
         <div className="grid  rounded-xl bg-text xl:row-span-2">
            <h2 className=" pt-5 text-center text-4xl font-extrabold">
               Continue Learning
            </h2>
            <div className="mb-5 grid place-items-center">
               <LessonCardDashboardSkeleton />
            </div>
         </div>
         <div className="grid rounded-xl bg-text pb-2 xl:col-start-1 xl:row-start-3 ">
            <h2 className=" xl: pt-5 text-center text-4xl font-extrabold">
               Trending
            </h2>
            <div className="flex max-h-[30vh] justify-center rounded-xl bg-text py-2 pb-4 pr-2 xl:max-h-[50vh]">
               <div className="scrollbar-lessons flex  flex-wrap place-content-start justify-center overflow-y-auto">
                  <LessonCardDashboardSkeleton />
                  <LessonCardDashboardSkeleton />
                  <LessonCardDashboardSkeleton />
                  <LessonCardDashboardSkeleton />
                  <LessonCardDashboardSkeleton />
               </div>
            </div>
         </div>
         <main className="hidden rounded-xl bg-text xl:row-span-3 xl:block">
            <Skeleton width="100%" height="100%" />
         </main>
         <div className="col-start-1 row-start-1 rounded-xl xl:col-start-3 xl:row-span-1">
            <h2 className=" text-center text-4xl font-extrabold text-text">
               Weekly activity
            </h2>
            <Skeleton className="my-2" width="100%" height="50%" />
         </div>
         <div className=" grid rounded-xl bg-text px-2 text-center xl:col-start-3 xl:row-span-2 xl:row-start-2">
            <h2 className=" pt-5 text-center text-4xl font-extrabold text-background">
               Favorites
            </h2>
            <div className="flex  flex-wrap place-content-start justify-center rounded-xl bg-text py-2 pb-4 pr-2 xl:min-h-[70vh]">
               <LessonCardDashboardSkeleton />
               <LessonCardDashboardSkeleton />
               <LessonCardDashboardSkeleton />
            </div>
         </div>
      </div>
   );
}
