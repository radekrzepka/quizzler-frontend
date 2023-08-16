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
         className="flex flex-col items-center rounded-xl bg-text p-6 text-background"
      >
         <div className="h-[200px] w-full bg-gray-700"></div>
         {/*TODO: add image of lesson*/}
         <h2 className="mt-2 text-center text-xl font-bold">{lesson.title}</h2>
         <p className="text-center text-sm text-gray-700">
            {lesson.description}
         </p>
         <p className="text-center text-sm text-gray-700">
            Added {formatDistanceToNow(parseISO(lesson.dateCreated))} ago
         </p>
         <div></div>
      </Link>
   );
};

export default LessonCard;
