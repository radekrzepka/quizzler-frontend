import { Flashcard } from "@/types/flashcard";
import { FC, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import PenIcon from "./../../assets/icons/white-pen-icon.svg";
import DeleteIcon from "./../../assets/icons/white-delete-icon.svg";
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
import DropdownMenu from "@/components/ui/dropdown-menu";

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

   const menuOptions = [
      {
         label: "Edit",
         onClickFunction: () => {
            setFlashcardToEdit(flashcard);
            setSelectedMode("Edit");
         },
      },
      {
         label: "Delete",
         onClickFunction: () => deleteFlashcardMutation(),
      },
   ];

   return (
      <div
         className={classNames(
            "flex w-full flex-col rounded-md bg-gray-700 px-2 text-left text-text shadow-lg",
            flashcardToEdit?.flashcardId === flashcard.flashcardId &&
               selectedMode === "Edit" &&
               "!bg-gray-500",
         )}
      >
         <DropdownMenu options={menuOptions} className="my-1 place-self-end" />
         <p className="truncate text-lg font-bold">
            Question: {flashcard.questionText}
         </p>
         <p className="truncate text-base font-normal">
            Answer: {flashcard.answerText}
         </p>
      </div>
   );
};

export default FlashcardListRow;
