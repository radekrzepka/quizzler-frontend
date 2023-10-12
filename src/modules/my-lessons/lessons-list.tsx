import { Lesson } from "@/types/lesson";
import { FC, useMemo } from "react";
import LessonCard from "@/modules/my-lessons/lesson-card";
import { compareDesc, parseISO } from "date-fns";

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

   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         {sortedLessons.map((lesson) => (
            <LessonCard lesson={lesson} key={lesson.lessonId} />
         ))}
      </div>
   );
};

export default LessonsList;
