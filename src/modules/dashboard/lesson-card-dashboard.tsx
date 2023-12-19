"use client";
import LikeLessonButton from "@/components/ui/like-lesson-button";
import UserLink from "@/components/ui/user-link";
import type { Lesson } from "@/types/lesson";
import { LESSON } from "@/utils/urls";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LessonCardDashboardProps {
   lesson: Lesson;
}
const LessonCardDashboard = ({ lesson }: LessonCardDashboardProps) => {
   const router = useRouter();

   return (
      <div
         className="relative my-2 flex w-11/12 cursor-pointer rounded-xl bg-text text-background shadow-lessonCardShadow transition duration-300 ease-in-out hover:shadow-lessonCardShadowHover md:max-h-32 lg:max-h-36 xl:max-h-28 2xl:max-h-40"
         onClick={() =>
            router.push(LESSON(lesson.title, lesson.owner.userId.toString()))
         }
      >
         <div className="flex max-w-[60%]">
            <Image
               src={
                  lesson.imageName
                     ? `${process.env.NEXT_PUBLIC_IMG_URL}/${lesson.imageName}`
                     : "/icons/lesson.png"
               }
               alt={`Icon for lesson ${lesson.title}`}
               width={300}
               height={300}
               className="rounded-l-xl object-cover "
            />
         </div>

         <div className="flex flex-grow flex-col items-end justify-between p-2">
            <div className="flex flex-col items-end gap-2">
               <h2 className="text-right text-xl leading-none text-background">
                  {lesson.title}
               </h2>
               <UserLink user={lesson.owner} reverseOrder disableUnderline />
            </div>
            <LikeLessonButton lesson={lesson} />
         </div>
      </div>
   );
};

export default LessonCardDashboard;
