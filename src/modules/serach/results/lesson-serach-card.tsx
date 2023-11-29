import Avatar from "@/components/ui/avatar";
import type { Lesson } from "@/types/lesson";
import { LESSON } from "@/utils/urls";
import Image from "next/image";
import Link from "next/link";

interface LessonSerachCardProps {
   lesson: Lesson;
}

const TEST_USER = {
   avatar: 16,
   dateRegistered: "2023-10-29T17:34:50.374814",
   email: "radoslawrzepka02@gmail.com",
   firstName: "Radosław",
   lastName: "Rzepka",
   lastSeen: "2023-11-28T23:28:45.918291",
   userId: 3,
   username: "Ben",
};

const TEST_TAGS = ["ben", "nigga", "essa", "o mamale"];

const LessonSerachCard = ({ lesson }: LessonSerachCardProps) => {
   console.log(lesson);
   return (
      <Link
         href={LESSON(lesson.title, TEST_USER.userId.toString())}
         className="flex justify-between rounded-sm bg-text p-1 text-background"
      >
         <div className="flex items-center gap-2">
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
            <div>
               <div className="flex items-center gap-1">
                  <h2 className="text-xl font-bold">{lesson.title}</h2>
                  <p className="text-sm text-gray-600">{lesson.description}</p>
               </div>
               <div className="flex items-center gap-1">
                  <Avatar profile={TEST_USER} size="small" />
                  <p>
                     {TEST_USER.username}{" "}
                     {TEST_USER.firstName &&
                        `(${TEST_USER.firstName} ${TEST_USER.lastName})`}
                  </p>
               </div>
            </div>
         </div>

         <div className="flex flex-col justify-around">
            <p className="text-right text-xl font-bold">
               Number of flashcards: 5
            </p>
            <div className="flex gap-2">
               {TEST_TAGS.map(tag => (
                  <div
                     className="h-min rounded-xl border border-gray-700 px-3 text-sm text-gray-700"
                     key={tag}
                  >
                     {tag}
                  </div>
               ))}
            </div>
         </div>
      </Link>
   );
};

export default LessonSerachCard;
