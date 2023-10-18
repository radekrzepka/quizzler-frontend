"use client";

import { Lesson } from "@/types/lesson";
import { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Link from "next/link";
import Image from "next/image";
import PenIcon from "./../../assets/icons/pen-icon.svg";
import DeleteIcon from "./../../assets/icons/black-delete-icon.svg";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";

interface LessonCardProps {
   lesson: Lesson;
}

const LessonCard: FC<LessonCardProps> = ({ lesson }) => {
   const router = useRouter();
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const dateCreated = lesson.dateCreated + "Z";
   const localDate = utcToZonedTime(new Date(dateCreated), timeZone);

   const { mutate: deleteLessonMutation } = useMutation({
      mutationFn: () => {
         const JWT = getCookie("JWT") as string;

         return fetch(`/api/lesson/delete?lessonId=${lesson.lessonId}`, {
            headers: {
               Authorization: JWT,
               Accept: "text/json",
            },
            method: "DELETE",
         });
      },
      onSettled: (res) => {
         if (res?.status === 200) {
            toast.success("Lesson deleted successfully");
            router.refresh();
         }
      },
   });

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
               <div className="absolute right-4 top-0 flex gap-2">
                  <Link
                     href={`/dashboard/lesson/${lesson.lessonId}?edit=true`}
                     onClick={(event: React.MouseEvent) =>
                        event.stopPropagation()
                     }
                  >
                     <Image
                        width={20}
                        height={20}
                        src={PenIcon}
                        alt={`Edit lesson ${lesson.title}`}
                        className="block"
                     />
                  </Link>
                  <button
                     onClick={(event: React.MouseEvent) => {
                        deleteLessonMutation();
                        event.stopPropagation();
                     }}
                  >
                     <Image
                        width={17}
                        height={17}
                        src={DeleteIcon}
                        alt={`Delete lesson ${lesson.title}`}
                        className="block"
                     />
                  </button>
               </div>
            </div>
            {lesson.tags && (
               <div className="mx-3 my-1 flex w-full flex-wrap gap-1">
                  {lesson.tags.map((tag) => (
                     <div
                        className="rounded-md bg-accent px-3 text-sm shadow-md"
                        key={tag}
                     >
                        {tag}
                     </div>
                  ))}
               </div>
            )}
            <p className="text-center text-sm text-gray-700">
               {lesson.description}
            </p>
            <p className="text-center text-sm font-bold text-gray-700">
               Added {formatDistanceToNow(localDate)} ago
            </p>
            <p className="text-center text-sm text-gray-700">
               {lesson.isPublic ? "Public" : "Private"} lesson
            </p>
         </div>
      </div>
   );
};

export default LessonCard;
