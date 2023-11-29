"use client";

import LessonCardSkeleton from "@/components/lesson/lesson-card-skeleton";
import NewLessonFormSkeleton from "@/components/lesson/new-lesson-form-skeleton";

export default function Loading() {
   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[1fr_4fr]">
         <NewLessonFormSkeleton />
         <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 9 }, (_, i) => i).map((_, index) => (
               <LessonCardSkeleton key={index} />
            ))}
         </div>
      </div>
   );
}
