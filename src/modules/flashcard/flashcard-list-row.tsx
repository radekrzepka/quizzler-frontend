import { Flashcard } from "@/types/flashcard";
import { FC, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import PenIcon from "./../../assets/icons/white-pen-icon.svg";
import DeleteIcon from "./../../assets/icons/delete-icon.svg";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import {
   RefetchOptions,
   RefetchQueryFilters,
   QueryObserverResult,
} from "@tanstack/react-query";
import { Lesson } from "@/types/lesson";
import toast from "react-hot-toast";
import classNames from "classnames";

interface FlashcardListRowProps {
   flashcard: Flashcard;
   refetchLesson: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<Lesson, unknown>>;
   setFlashcardToEdit: Dispatch<SetStateAction<Flashcard | null>>;
   setSelectedMode: Dispatch<SetStateAction<"Add" | "Edit">>;
   flashcardToEdit: Flashcard | null;
   selectedMode: "Add" | "Edit";
}

const FlashcardListRow: FC<FlashcardListRowProps> = ({
   flashcard,
   refetchLesson,
   setFlashcardToEdit,
   setSelectedMode,
   selectedMode,
   flashcardToEdit,
}) => {
   const { mutate: deleteFlashcardMutation } = useMutation({
      mutationFn: () => {
         if (flashcardToEdit?.flashcardId === flashcard.flashcardId)
            setFlashcardToEdit(null);
         const JWT = getCookie("JWT") as string;

         return fetch(
            `/api/flashcard/delete?flashcardId=${flashcard.flashcardId}`,
            {
               headers: {
                  Authorization: JWT,
                  Accept: "text/json",
               },
               method: "DELETE",
            },
         );
      },
      onSettled: (res) => {
         if (res?.status === 200) {
            toast.success("Flashcard deleted successfully");
            refetchLesson();
         }
      },
   });

   return (
      <div
         className={classNames(
            "flex w-full justify-between rounded-md bg-gray-500 p-2 text-left text-text",
            flashcardToEdit?.flashcardId === flashcard.flashcardId &&
               selectedMode === "Edit" &&
               "bg-gray-400",
         )}
      >
         <p>
            {flashcard.questionText} {flashcard.answerText}
         </p>
         <div className="flex gap-1">
            <button
               onClick={() => {
                  setFlashcardToEdit(flashcard);
                  setSelectedMode("Edit");
               }}
            >
               <Image
                  width={20}
                  height={20}
                  src={PenIcon}
                  alt={`Edit flashcard ${flashcard.questionText}`}
               />
            </button>
            <button onClick={() => deleteFlashcardMutation()}>
               <Image
                  width={25}
                  height={25}
                  src={DeleteIcon}
                  alt={`Delete flashcard ${flashcard.questionText}`}
               />
            </button>
         </div>
      </div>
   );
};

export default FlashcardListRow;
