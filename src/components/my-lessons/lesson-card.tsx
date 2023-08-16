import { Lesson } from "@/types/lesson";
import { FC } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";

interface LessonCardProps {
   lesson: Lesson;
}

const LessonCard: FC<LessonCardProps> = ({ lesson }) => {
   return (
      <Link
         href={`/dashboard/my-lessons/${lesson.lessonId}`}
         className="flex w-full flex-col items-center rounded-xl bg-text text-background"
      >
         <div className="h-[200px] w-full rounded-t-xl bg-gray-700"></div>
         {/*TODO: add image of lesson*/}
         <div className="my-3 gap-1">
            <h2 className="text-center text-xl font-bold">{lesson.title}</h2>
            <p className="text-center text-sm text-gray-700">
               {lesson.description}
            </p>
            <p className="text-center text-sm text-gray-700">
               Added {formatDistanceToNow(parseISO(lesson.dateCreated))} ago
            </p>
         </div>
      </Link>
   );
};

export default LessonCard;
