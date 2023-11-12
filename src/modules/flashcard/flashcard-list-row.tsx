import DropdownMenu from "@/components/ui/dropdown-menu";
import type { Flashcard } from "@/types/flashcard";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { getCookie } from "cookies-next";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

interface FlashcardListRowProps {
   flashcard: Flashcard;
   refetchLesson: () => void;
   setFlashcardToEdit: Dispatch<SetStateAction<Flashcard | null>>;
   setSelectedMode: Dispatch<SetStateAction<"Add" | "Edit">>;
   flashcardToEdit: Flashcard | null;
   selectedMode: "Add" | "Edit";
}

const scrollToElement = (elementId: string) => {
   const element = document.getElementById(elementId);
   if (element) {
      element.scrollIntoView({
         behavior: "smooth",
         block: "start",
         inline: "nearest",
      });
   }
};

const getRandomNumber = (min: number, max: number) =>
   Math.floor(Math.random() * (max - min) + min);

const FlashcardListRow = ({
   flashcard,
   refetchLesson,
   setFlashcardToEdit,
   setSelectedMode,
   selectedMode,
   flashcardToEdit,
}: FlashcardListRowProps) => {
   const [rotationDegree] = useState(getRandomNumber(-10, 10).toString());

   const { mutate: deleteFlashcardMutation } = useMutation({
      mutationFn: () => {
         if (flashcardToEdit?.flashcardId === flashcard.flashcardId)
            setFlashcardToEdit(null);
         const JWT = getCookie("JWT") as string;

         return fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/flashcard/delete?flashcardId=${flashcard.flashcardId}`,
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
            toast.success("Flashcard deleted successfully");
            refetchLesson();
         }
      },
   });

   const menuOptions = [
      {
         label: "Edit",
         onClickFunction: () => {
            setFlashcardToEdit(flashcard);
            setSelectedMode("Edit");
            scrollToElement("flashcard-form");
         },
      },
      {
         label: "Delete",
         onClickFunction: () => deleteFlashcardMutation(),
      },
   ];

   return (
      <div
         style={{
            transform: `rotate(${rotationDegree}deg)`,
         }}
         className={classNames(
            `relative flex h-40 w-40 flex-col justify-center rounded-md bg-accent px-2 pt-1 text-center text-background shadow-lg`,
            flashcardToEdit?.flashcardId === flashcard.flashcardId &&
               selectedMode === "Edit" &&
               "!bg-gray-400"
         )}
      >
         <div className="absolute left-1/2 top-1 -translate-x-1/2 transform rounded-full bg-blue-500 shadow-lg">
            <div className="flex h-5 w-5 items-center justify-center rounded-full"></div>
         </div>
         <DropdownMenu
            options={menuOptions}
            smallIcon
            iconColor="background"
            className="!absolute right-1 top-1"
         />
         <div className="flex flex-col truncate">
            <p className="truncate text-lg font-bold">
               Question: {flashcard.questionText ?? "[image]"}
            </p>
            <p className="truncate text-base font-normal">
               Answer: {flashcard.answerText ?? "[image]"}
            </p>
         </div>
      </div>
   );
};

export default FlashcardListRow;
