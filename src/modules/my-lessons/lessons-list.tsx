import LessonCard from "@/modules/my-lessons/lesson-card";
import { Lesson } from "@/types/lesson";
import { compareDesc, parseISO } from "date-fns";
import { FC, useMemo } from "react";

interface LessonsListProps {
   lessons: Lesson[];
}

const LessonsList: FC<LessonsListProps> = ({ lessons }) => {
   const sortedLessons = useMemo(() => {
      return lessons.sort((a, b) => {
         const dateA = parseISO(a.dateCreated);
         const dateB = parseISO(b.dateCreated);

         return compareDesc(dateA, dateB);
      });
   }, [lessons]);

   if (sortedLessons.length === 0)
      return (
         <div className="h-fit rounded bg-text p-8 text-background shadow-lg">
            <h2 className="text-3xl font-semibold">Get Started!</h2>
            <p className="mt-2 text-base">
               Create your first lesson to begin your learning journey.
            </p>
         </div>
      );

   return (
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-3">
         {sortedLessons.map((lesson) => (
            <LessonCard lesson={lesson} key={lesson.lessonId} />
         ))}
      </div>
   );
};

export default LessonsList;
