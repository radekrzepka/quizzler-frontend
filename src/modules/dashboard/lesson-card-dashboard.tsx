"use client";
import type { Lesson } from "@/types/lesson";
import { LESSON } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface LessonCardDashboardProps {
   lesson: Lesson;
}
const LessonCardDashboard = ({ lesson }: LessonCardDashboardProps) => {
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
      <div
         className="relative my-2 flex w-11/12 cursor-pointer rounded-xl bg-text text-background shadow-lessonCardShadow transition duration-300 ease-in-out hover:shadow-lessonCardShadowHover md:max-h-32 lg:max-h-36 xl:max-h-28 2xl:max-h-40"
         onClick={() =>
            router.push(LESSON(lesson.title, lesson.owner.userId.toString()))
         }
      >
         <div className="flex h-24 max-w-[60%] md:h-32 lg:h-36 xl:max-h-24 2xl:max-h-40">
            <Image
               src={
                  lesson.imageName
                     ? `${process.env.NEXT_PUBLIC_IMG_URL}/${lesson.imageName}`
                     : "/icons/lesson.png"
               }
               alt={`Icon for lesson ${lesson.title}`}
               objectFit="cover"
               layout="responsive"
               width={100}
               height={100}
               className="rounded-l-xl"
            />
         </div>
         <div className="flex flex-grow flex-col justify-between p-2">
            <div className="self-end">
               <h2 className="text-right text-xl leading-none text-background">
                  {lesson.title}
               </h2>
            </div>
            <div className="mt-auto flex self-end">
               <div className="flex items-center gap-1">
                  <b className="text-sm leading-none text-background">
                     {likesNumber}
                  </b>
                  <button
                     onClick={async event => {
                        event.stopPropagation();
                        setIsLiked(prevLiked => !prevLiked);
                        await mutation.mutateAsync();
                     }}
                     className={`h-6 w-6 bg-center bg-no-repeat transition-all duration-300 ease-in-out ${
                        isLiked ? "bg-liked-heart" : "bg-unliked-heart"
                     }`}
                  ></button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LessonCardDashboard;
