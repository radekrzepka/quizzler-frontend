"use client";

import LikeLessonButton from "@/components/ui/like-lesson-button";
import Tag from "@/components/ui/tag";
import UserLink from "@/components/ui/user-link";
import type { Lesson } from "@/types/lesson";
import { LESSON } from "@/utils/urls";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LessonSerachCardProps {
   lesson: Lesson;
}

const LessonSerachCard = ({ lesson }: LessonSerachCardProps) => {
   const router = useRouter();

   return (
      <div className="flex cursor-pointer flex-col justify-between rounded-xl bg-text px-[6px] py-2 text-background transition duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg sm:grid sm:grid-cols-[4fr_1fr]">
         <div
            onClick={() =>
               router.push(LESSON(lesson.title, lesson.owner.userId.toString()))
            }
            className="flex items-center gap-2"
         >
            <Image
               src={
                  lesson.imageName
                     ? `${process.env.NEXT_PUBLIC_IMG_URL}/${lesson.imageName}`
                     : "/icons/lesson.png"
               }
               alt={`Icon for lesson ${lesson.title}`}
               width={64}
               height={128}
               className="h-12 w-12"
            />
            <div className="w-full">
               <div className="flex items-center gap-1">
                  <h2 className="text-left text-2xl leading-none text-background">
                     {lesson.title}
                  </h2>
               </div>
               <p className="break-all text-left  leading-none text-background">
                  {lesson.description || "No description provided"}
               </p>
               <div className="mt-1 flex flex-wrap gap-2">
                  <Tag className="font-bold" type="dark">
                     {lesson.flashcardCount} flashcard
                     {lesson.flashcardCount !== 1 && "s"}
                  </Tag>
                  {lesson.tags &&
                     lesson.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
               </div>
            </div>
         </div>

         <div className="mt-2 flex flex-row items-center justify-between sm:mt-0 sm:flex-col-reverse sm:items-end">
            <UserLink user={lesson.owner} />
            <LikeLessonButton lesson={lesson} />
         </div>
      </div>
   );
};

export default LessonSerachCard;
