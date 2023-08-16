import { Lesson } from "@/types/lesson";
import { FC, useMemo } from "react";
import LessonCard from "@/components/my-lessons/lesson-card";
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
      <div className="grid grid-cols-3 gap-4">
         {sortedLessons.map((lesson) => (
            <LessonCard lesson={lesson} key={lesson.lessonId} />
         ))}
      </div>
   );
};

export default LessonsList;
