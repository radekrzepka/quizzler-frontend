"use client";
import React, { useEffect, useRef, useState } from "react";
import LessonCardDashboard from "@/modules/dashboard/lesson-card-dashboard";
import type { Lesson } from "@/types/lesson";

interface LessonListProps {
   lessons: Array<Lesson>;
}

const LessonList = ({ lessons }: LessonListProps) => {
   const [hasOverflow, setHasOverflow] = useState(false);
   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const checkOverflow = () => {
         const container = containerRef.current;
         if (container) {
            const hasVerticalOverflow =
               container.scrollHeight > container.clientHeight;
            setHasOverflow(hasVerticalOverflow);
         }
      };

      window.addEventListener("resize", checkOverflow);
      checkOverflow();

      return () => window.removeEventListener("resize", checkOverflow);
   }, []);
   return (
      <div
         className={`flex h-full justify-center rounded-xl bg-text py-2 pb-4 ${
            hasOverflow ? "pr-2" : ""
         }`}
      >
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
