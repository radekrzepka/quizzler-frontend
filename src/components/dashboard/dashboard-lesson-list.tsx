"use client";
import React, { useRef } from "react";
import LessonCardDashboard from "@/modules/dashboard/lesson-card-dashboard";
import type { Lesson } from "@/types/lesson";

interface LessonListProps {
   lessons: Array<Lesson>;
}

const LessonList = ({ lessons }: LessonListProps) => {
   const containerRef = useRef<HTMLDivElement>(null);

   return (
      <div className="flex h-full justify-center rounded-xl bg-text py-2 pb-4 pr-2">
         <div
            className="scrollbar-lessons flex w-full flex-wrap place-content-start justify-center overflow-y-auto"
            ref={containerRef}
         >
            {lessons.map((lesson: Lesson) => (
               <LessonCardDashboard key={lesson.lessonId} lesson={lesson} />
            ))}
         </div>
      </div>
   );
};

export default LessonList;
