import LessonCard from "@/modules/lesson/lesson-card";
import type { Lesson } from "@/types/lesson";
import { compareDesc, parseISO } from "date-fns";
import { useMemo } from "react";

interface MyLessonListProps {
   lessons: Array<Lesson>;
}

const MyLessonList = ({ lessons }: MyLessonListProps) => {
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
      <div className="flex w-full flex-col justify-center gap-4 lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
         {sortedLessons.map(lesson => (
            <LessonCard lesson={lesson} key={lesson.lessonId} />
         ))}
      </div>
   );
};

export default MyLessonList;
