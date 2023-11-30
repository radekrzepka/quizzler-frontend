import Avatar from "@/components/ui/avatar";
import Tag from "@/components/ui/tag";
import type { Lesson } from "@/types/lesson";
import { LESSON } from "@/utils/urls";
import Image from "next/image";
import Link from "next/link";

interface LessonSerachCardProps {
   lesson: Lesson;
}

const LessonSerachCard = ({ lesson }: LessonSerachCardProps) => {
   return (
      <Link
         href={LESSON(lesson.title, lesson.owner.userId.toString())}
         className="flex flex-col justify-between rounded-xl bg-text p-[6px] text-background transition duration-300 ease-in-out hover:bg-opacity-90 hover:shadow-lg sm:grid sm:grid-cols-[4fr_1fr]"
      >
         <div>
            <div className="mb-2 flex items-center gap-2">
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
                  <h2 className="text-left text-xl font-bold leading-none text-background">
                     {lesson.title}
                  </h2>
                  <p className="text-left text-sm leading-none text-background">
                     {lesson.description || "No description provided"}
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

            <div className="flex flex-col justify-around">
               <div className="flex flex-wrap gap-2"></div>
            </div>
         </div>

         <div className="flex flex-row items-center justify-between sm:flex-col sm:items-end">
            <div className="flex items-center justify-end gap-1">
               <Avatar profile={lesson.owner} size="small" />
               <p>{lesson.owner.username}</p>
            </div>
         </div>
      </Link>
   );
};

export default LessonSerachCard;
