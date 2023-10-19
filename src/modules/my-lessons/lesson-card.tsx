"use client";

import { Lesson } from "@/types/lesson";
import { FC, useState } from "react";
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
import Dialog from "@/components/ui/dialog";
import Button from "@/components/ui/button";

interface LessonCardProps {
   lesson: Lesson;
}

const LessonCard: FC<LessonCardProps> = ({ lesson }) => {
   const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
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
            setIsOpenDeleteDialog(true);
            router.refresh();
         }
      },
   });

   return (
      <div className="flex h-full w-full flex-col items-center justify-between rounded-xl bg-text text-background">
         <Dialog
            isOpen={isOpenDeleteDialog}
            setIsOpen={setIsOpenDeleteDialog}
            title="Are you sure you want to delete your lesson ?"
         >
            <Button
               type="button"
               variant="white"
               className="mb-2 w-full"
               onClick={() => {
                  setIsOpenDeleteDialog(false);
               }}
            >
               Go back to my lessons page
            </Button>
            <Button
               type="button"
               variant="primary"
               className="w-full"
               onClick={() => {
                  deleteLessonMutation();
               }}
            >
               Delete my lesson
            </Button>
         </Dialog>
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
         <div className="my-3 flex w-full flex-grow-[2] flex-col justify-between">
            <div className="relative flex flex-col items-end justify-center md:items-center">
               <div className="mr-2 flex gap-2 md:absolute md:right-4 md:top-1 md:mr-0">
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
                        setIsOpenDeleteDialog(true);
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
               <h2 className="place-self-center text-center text-xl font-bold">
                  {lesson.title}
               </h2>
            </div>
            {lesson.tags?.length !== 0 && lesson.tags && (
               <div className="mx-3 my-1 mb-2 flex w-full flex-wrap gap-1">
                  {lesson.tags.map((tag) => (
                     <div
                        className="rounded-3xl border border-gray-700 px-4 text-sm text-gray-700"
                        key={tag}
                     >
                        {tag}
                     </div>
                  ))}
               </div>
            )}
            <div>
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

            <Link
               className="fl mx-auto flex w-full"
               href={`/dashboard/lesson/${lesson.lessonId}`}
            >
               <Button
                  variant="accent"
                  type="button"
                  className="mx-auto mt-1 w-3/4 !py-[2px] shadow-md md:w-3/5"
               >
                  Study now
               </Button>
            </Link>
         </div>
      </div>
   );
};

export default LessonCard;
