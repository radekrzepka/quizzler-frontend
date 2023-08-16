"use client";

import LessonCardSkeleton from "@/components/my-lessons/lesson-card-skeleton";

export default function Loading() {
   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[1fr_3fr]">
         <div>Form skeleton To Do</div>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }, (_, i) => i).map((_, index) => (
               <LessonCardSkeleton key={index} />
            ))}
         </div>
      </div>
   );
}
