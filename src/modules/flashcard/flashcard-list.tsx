import { Flashcard } from "@/types/flashcard";
import { FC, Dispatch, SetStateAction } from "react";
import FlashcardListRow from "./flashcard-list-row";
import {
   RefetchOptions,
   RefetchQueryFilters,
   QueryObserverResult,
} from "@tanstack/react-query";
import { Lesson } from "@/types/lesson";

interface FlashcardListProps {
   flashcards: Flashcard[];
   refetchLesson: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<Lesson, unknown>>;
   setFlashcardToEdit: Dispatch<SetStateAction<Flashcard | null>>;
   setSelectedMode: Dispatch<SetStateAction<"Add" | "Edit">>;
   flashcardToEdit: Flashcard | null;
}

const FlashcardList: FC<FlashcardListProps> = ({
   flashcards,
   refetchLesson,
   setFlashcardToEdit,
   setSelectedMode,
   flashcardToEdit,
}) => {
   return (
      <div className="h-[70vh] overflow-y-auto rounded-xl bg-text p-4 text-background">
         <h2 className="text-center text-3xl font-bold">Flashcards list</h2>
         <div className="flex flex-col gap-2">
            {flashcards.map((flashcard) => (
               <FlashcardListRow
                  key={flashcard.flashcardId}
                  flashcard={flashcard}
                  refetchLesson={refetchLesson}
                  setFlashcardToEdit={setFlashcardToEdit}
                  setSelectedMode={setSelectedMode}
                  flashcardToEdit={flashcardToEdit}
               />
            ))}
         </div>
      </div>
   );
};

export default FlashcardList;
