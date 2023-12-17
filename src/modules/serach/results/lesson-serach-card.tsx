"use client";

import Avatar from "@/components/ui/avatar";
import LikeLessonButton from "@/components/ui/like-lesson-button";
import Tag from "@/components/ui/tag";
import type { Lesson } from "@/types/lesson";
import { LESSON, PROFILE } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface LessonSerachCardProps {
   lesson: Lesson;
}

const LessonSerachCard = ({ lesson }: LessonSerachCardProps) => {
   const router = useRouter();

   return (
      <div className="flex cursor-pointer flex-col justify-between rounded-xl bg-text px-[6px] py-3 text-background transition duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg sm:grid sm:grid-cols-[4fr_1fr]">
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
            <Link
               href={PROFILE(lesson.owner.username)}
               className="flex items-center justify-end gap-1"
            >
               <Avatar profile={lesson.owner} size="small" />
               <p className="underline">{lesson.owner.username}</p>
            </Link>
            <LikeLessonButton lesson={lesson} />
         </div>
      </div>
   );
};

export default LessonSerachCard;
