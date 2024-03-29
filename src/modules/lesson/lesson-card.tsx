"use client";

import Button from "@/components/ui/button";
import Dialog from "@/components/ui/dialog";
import DropdownMenu from "@/components/ui/dropdown-menu";
import LikeLessonButton from "@/components/ui/like-lesson-button";
import Tag from "@/components/ui/tag";
import useCurrentUserInfo from "@/hooks/api-hooks/use-current-user-info";
import type { Lesson } from "@/types/lesson";
import { EDIT_LESSON, LESSON } from "@/utils/urls";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface LessonCardProps {
   lesson: Lesson;
}

const LessonCard = ({ lesson }: LessonCardProps) => {
   const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
   const router = useRouter();
   const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
   const dateCreated = lesson.dateCreated + "Z";
   const localDate = utcToZonedTime(new Date(dateCreated), timeZone);
   const { data: userInfo } = useCurrentUserInfo();

   const isOwner =
      userInfo && lesson.owner && userInfo.userId === lesson.owner.userId;

   const menuOptions = [
      {
         label: "Edit",
         onClickFunction: () => {
            router.push(
               EDIT_LESSON(
                  lesson.title,
                  (userInfo?.userId as number).toString()
               )
            );
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

         return fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/lesson/delete?lessonId=${lesson.lessonId}`,
            {
               headers: {
                  Authorization: JWT,
                  Accept: "text/json",
               },
               method: "DELETE",
            }
         );
      },
      onSettled: res => {
         if (res?.status === 200) {
            toast.success("Lesson deleted successfully");
            setIsOpenDeleteDialog(true);
            router.refresh();
         }
      },
   });

   return (
      <div className="flex h-min max-h-[500px] w-full flex-col justify-between rounded-xl bg-text text-background lg:w-auto">
         <div>
            <Dialog
               isOpen={isOpenDeleteDialog}
               setIsOpen={setIsOpenDeleteDialog}
               title="Are you sure you want to delete your lesson ?"
            >
               <Button
                  variant="white"
                  className="mb-2 w-full"
                  onClick={() => {
                     setIsOpenDeleteDialog(false);
                  }}
               >
                  Go back to my lessons page
               </Button>
               <Button
                  className="w-full"
                  onClick={() => {
                     deleteLessonMutation();
                  }}
               >
                  Delete my lesson
               </Button>
            </Dialog>

            <div className="flex h-[200px] w-full rounded-t-xl bg-gray-700">
               {lesson.imageName && (
                  <Image
                     className="h-[200px] rounded-t-xl object-contain"
                     src={`${process.env.NEXT_PUBLIC_IMG_URL}/${lesson.imageName}`}
                     alt={`Image of ${lesson.title} lesson`}
                     width={500}
                     height={200}
                  />
               )}
            </div>
            <div className="relative flex w-full items-center justify-center">
               <h2 className="truncate pt-1 text-3xl font-bold">
                  {lesson.title}
               </h2>
               {isOwner && (
                  <DropdownMenu
                     options={menuOptions}
                     smallIcon
                     iconColor="black"
                     className="!absolute right-0"
                  />
               )}
            </div>
         </div>
         <div className="my-1 flex w-full flex-col">
            <div className="mx-2 flex items-center justify-center gap-1 py-1">
               <Image
                  src="/icons/tags.png"
                  alt="Icon of tags"
                  width={18}
                  height={18}
               />
               {lesson.tags?.length !== 0 && lesson.tags && (
                  <div className="flex flex-wrap justify-center gap-1">
                     {lesson.tags.map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                     ))}
                  </div>
               )}
               {lesson.tags?.length === 0 && (
                  <p className="text-center">No tags added</p>
               )}
            </div>

            <div className="mx-2 grid gap-[2px]">
               <LikeLessonButton lesson={lesson} className="ml-1" />
               <div className="flex w-full items-center gap-1 truncate">
                  <Image
                     src="/icons/description.png"
                     alt="Icon of tags"
                     width={18}
                     height={18}
                  />
                  <p className="truncate text-sm">
                     {lesson.description || "No description provided"}
                  </p>
               </div>

               <div className="flex items-center gap-1">
                  <Image
                     src="/icons/date.png"
                     alt="Icon of tags"
                     width={18}
                     height={18}
                  />
                  <p className="text-sm">
                     Added {formatDistanceToNow(localDate)} ago
                  </p>
               </div>

               <div className="flex items-center gap-1">
                  <Image
                     src="/icons/lock.svg"
                     alt="Icon of tags"
                     width={18}
                     height={18}
                  />
                  <p className="text-sm">
                     {lesson.isPublic ? "Public" : "Private"} lesson
                  </p>
               </div>

               <div className="flex items-center gap-1">
                  <Image
                     src="/icons/quantity.png"
                     alt="Icon of tags"
                     width={24}
                     height={24}
                  />
                  <p className="text-sm">{lesson.flashcardCount} flashcards</p>
               </div>
            </div>
            <Link
               className="mx-auto flex justify-center py-3"
               href={LESSON(lesson.title, lesson.owner.userId.toString())}
            >
               <Button variant="accent" type="button">
                  Study now
               </Button>
            </Link>
         </div>
      </div>
   );
};

export default LessonCard;
