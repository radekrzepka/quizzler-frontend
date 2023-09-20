"use client";

import { Lesson } from "@/types/lesson";
import { FC } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import PenIcon from "./../../assets/icons/pen-icon.svg";
import { useRouter } from "next/navigation";

interface LessonCardProps {
   lesson: Lesson;
}

const LessonCard: FC<LessonCardProps> = ({ lesson }) => {
   const router = useRouter();

   return (
      <div
         onClick={() => router.push(`/dashboard/lesson/${lesson.lessonId}`)}
         className="flex w-full cursor-pointer flex-col items-center rounded-xl bg-text text-background"
      >
         {lesson.imagePath ? (
            <Image
               className="h-[200px] w-full rounded-t-xl bg-gray-700"
               src={`http://104.250.180.67${lesson.imagePath}`}
               alt={`Image of ${lesson.title} lesson`}
               width={500}
               height={200}
            />
         ) : (
            <div className="h-[200px] w-full rounded-t-xl bg-gray-700" />
         )}
         <div className="my-3 w-full gap-1">
            <div className="relative flex items-center justify-center">
               <h2 className="text-center text-xl font-bold">{lesson.title}</h2>
               <Link
                  href={`/dashboard/lesson/${lesson.lessonId}?edit=true`}
                  onClick={(event: React.MouseEvent) => event.stopPropagation()}
                  className="absolute right-4 top-0"
               >
                  <Image
                     width={20}
                     height={20}
                     src={PenIcon}
                     alt={`Edit lesson ${lesson.title}`}
                     className="block"
                  />
               </Link>
            </div>
            <p className="text-center text-sm text-gray-700">
               {lesson.description}
            </p>
            <p className="text-center text-sm text-gray-700">
               Added {formatDistanceToNow(parseISO(lesson.dateCreated))} ago
            </p>
         </div>
      </div>
   );
};

export default LessonCard;
