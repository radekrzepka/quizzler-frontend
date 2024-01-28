"use client";

import LessonCardDashboard from "@/modules/dashboard/lesson-card-dashboard";
import type { Lesson } from "@/types/lesson";
import getFromAPIClient from "@/utils/get-from-api-client";
import { useQuery } from "@tanstack/react-query";

interface LessonListProps {
   initialLessons: Array<Lesson>;
   queryKey: string;
}

const LessonList = ({ initialLessons, queryKey }: LessonListProps) => {
   const { data: lessons } = useQuery<Array<Lesson>>({
      queryKey: ["dashboard", queryKey],
      queryFn: async () => {
         const endpoint =
            queryKey === "dashboard-liked-lessons"
               ? `/user/likedLessons`
               : `/lesson/topLessons`;
         return await getFromAPIClient(endpoint);
      },
      initialData: initialLessons,
   });

   return (
      <div className="flex h-full justify-center rounded-xl bg-text py-2 pb-4 pr-2">
         <div className="scrollbar-lessons flex w-full flex-wrap place-content-start justify-center overflow-y-auto">
            {lessons.map((lesson: Lesson) => (
               <LessonCardDashboard
                  key={`${lesson.lessonId}-${lesson.isLiked}`}
                  lesson={lesson}
               />
            ))}
         </div>
      </div>
   );
};

export default LessonList;
