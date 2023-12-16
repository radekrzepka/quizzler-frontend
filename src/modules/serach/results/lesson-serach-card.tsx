"use client";

import Avatar from "@/components/ui/avatar";
import Tag from "@/components/ui/tag";
import type { Lesson } from "@/types/lesson";
import { LESSON } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface LessonSerachCardProps {
   lesson: Lesson;
}

const LessonSerachCard = ({ lesson }: LessonSerachCardProps) => {
   const [isLiked, setIsLiked] = useState(lesson.isLiked);
   const router = useRouter();

   const mutation = useMutation({
      mutationFn: async () => {
         const JWT = getCookie("JWT") as string;

         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/lesson/like?LessonId=${lesson.lessonId}&Like=${isLiked}`,
            {
               headers: {
                  Authorization: JWT,
                  Accept: "text/json",
               },
               method: "POST",
            }
         );

         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         return response;
      },
      onError: () => {
         toast.error(`Error during ${isLiked ? "liking" : "disliking"} lesson`);
         setIsLiked(prevLiked => !prevLiked);
      },
   });

   const likesNumber =
      lesson.likesCount +
      (isLiked && !lesson.isLiked ? 1 : 0) -
      (!isLiked && lesson.isLiked ? 1 : 0);

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
            />
            <div className="w-full">
               <div className="flex items-center gap-1">
                  <h2 className="text-left text-2xl leading-none text-background">
                     {lesson.title}
                  </h2>
               </div>

               <p className="break-all text-left text-sm leading-none text-background">
                  {lesson.description || "No description provided"}
               </p>
               <p className="text-sm leading-none text-background">
                  Likes: {likesNumber}
               </p>
               <div className="mt-1 flex flex-wrap gap-2">
                  <Tag className="font-bold">
                     {lesson.flashcardCount} flashcard
                     {lesson.flashcardCount !== 1 && "s"}
                  </Tag>
                  {lesson.tags &&
                     lesson.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
               </div>
            </div>
         </div>

         <div className="mt-2 flex flex-row items-center justify-between sm:mt-0 sm:flex-col-reverse sm:items-end">
            <div className="flex items-center justify-end gap-1">
               <Avatar profile={lesson.owner} size="small" />
               <p>{lesson.owner.username}</p>
            </div>
            <button
               onClick={async event => {
                  event.stopPropagation();
                  setIsLiked(prevLiked => !prevLiked);
                  await mutation.mutateAsync();
               }}
               className={`relative h-6 w-6 bg-center bg-no-repeat transition-all duration-300 ease-in-out ${
                  isLiked ? "bg-liked-heart" : "bg-unliked-heart"
               }`}
            ></button>
         </div>
      </div>
   );
};

export default LessonSerachCard;
