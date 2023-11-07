"use client";

import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import DropdownMenu from "@/components/ui/dropdown-menu";
import { Lesson } from "@/types/lesson";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface LessonCardProps {
   lesson: Lesson;
}

const LessonCard: FC<LessonCardProps> = ({ lesson }) => {
   const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
   const router = useRouter();
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const dateCreated = lesson.dateCreated + "Z";
   const localDate = utcToZonedTime(new Date(dateCreated), timeZone);

   const menuOptions = [
      {
         label: "Edit",
         onClickFunction: () => {
            router.push(`/dashboard/lesson/${lesson.lessonId}/edit`);
         },
      },
      {
         label: "Delete",
         onClickFunction: () => {
            setIsOpenDeleteDialog(true);
         },
      },
   ];

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
      <div className="flex h-full w-full flex-col rounded-xl bg-text text-background">
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
         {lesson.imageName ? (
            <Image
               className="h-[200px] w-full rounded-t-xl bg-gray-700"
               src={process.env.NEXT_PUBLIC_IMG_URL + lesson.imageName}
               alt={`Image of ${lesson.title} lesson`}
               width={500}
               height={200}
            />
         ) : (
            <div className="h-[200px] w-full rounded-t-xl bg-gray-700" />
         )}

         <div className="my-1 flex w-full flex-grow-[2] flex-col">
            <div className="relative flex items-center justify-center">
               <h2 className="truncate px-2 text-3xl font-bold">
                  {lesson.title}
               </h2>
               <DropdownMenu
                  options={menuOptions}
                  smallIcon
                  iconColor="black"
                  className="!absolute right-0"
               />
            </div>

            <div className="m-2 flex items-center justify-center gap-1 py-1">
               <Image
                  src="/icons/tags.png"
                  alt="Icon of tags"
                  width={24}
                  height={24}
               />
               {lesson.tags?.length !== 0 && lesson.tags && (
                  <div className="flex flex-wrap justify-center gap-1">
                     {lesson.tags.map((tag) => (
                        <div
                           className="h-min rounded-xl border border-gray-700 px-3 text-sm text-gray-700"
                           key={tag}
                        >
                           {tag}
                        </div>
                     ))}
                  </div>
               )}
               {lesson.tags?.length === 0 && (
                  <p className="text-center">No tags added</p>
               )}
            </div>

            <div className="m-2 grid gap-2 2xl:grid-cols-2">
               <div className="flex w-full items-center gap-1 truncate">
                  <Image
                     src="/icons/description.png"
                     alt="Icon of tags"
                     width={24}
                     height={24}
                  />
                  <p>{lesson.description || "No description provided"}</p>
               </div>

               <div className="flex items-center gap-1 2xl:place-self-end">
                  <Image
                     src="/icons/date.png"
                     alt="Icon of tags"
                     width={24}
                     height={24}
                  />
                  <p>Added {formatDistanceToNow(localDate)} ago</p>
               </div>

               <div className="flex items-center gap-1">
                  <Image
                     src="/icons/lock.svg"
                     alt="Icon of tags"
                     width={24}
                     height={24}
                  />
                  <p>{lesson.isPublic ? "Public" : "Private"} lesson</p>
               </div>

               <div className="flex items-center gap-1 2xl:place-self-end">
                  <Image
                     src="/icons/quantity.png"
                     alt="Icon of tags"
                     width={32}
                     height={32}
                  />
                  <p>{lesson.flashcardCount} flashcards</p>
               </div>
            </div>

            <Link
               className="mx-auto flex justify-center py-3"
               href={`/dashboard/lesson/${lesson.lessonId}`}
            >
               <Button variant="accent" type="button" className=" shadow-md">
                  Study now
               </Button>
            </Link>
         </div>
      </div>
   );
};

export default LessonCard;
