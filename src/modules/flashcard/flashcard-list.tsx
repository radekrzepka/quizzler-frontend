import DropdownMenu from "@/components/ui/dropdown-menu";
import { Flashcard } from "@/types/flashcard";
import { Lesson } from "@/types/lesson";
import {
   QueryObserverResult,
   RefetchOptions,
   RefetchQueryFilters,
} from "@tanstack/react-query";
import { Dispatch, FC, SetStateAction } from "react";
import FlashcardListRow from "./flashcard-list-row";

interface FlashcardListProps {
   flashcards: Flashcard[];
   refetchLesson: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<Lesson, unknown>>;
   setFlashcardToEdit: Dispatch<SetStateAction<Flashcard | null>>;
   setSelectedMode: Dispatch<SetStateAction<"Add" | "Edit">>;
   flashcardToEdit: Flashcard | null;
   selectedMode: "Add" | "Edit";
}

const FlashcardList: FC<FlashcardListProps> = ({
   flashcards,
   refetchLesson,
   setFlashcardToEdit,
   setSelectedMode,
   flashcardToEdit,
   selectedMode,
}) => {
   const menuOptions = [
      {
         label: "Import from JSON/CSV/txt",
         onClickFunction: () => {},
      },
      {
         label: "Export to JSON/CSV/txt",
         onClickFunction: () => {},
      },
   ];

   return (
      <div className="overflow-y-auto rounded-xl bg-text p-4 text-background">
         <h2 className="text-center text-3xl font-bold">Flashcards list</h2>
         <div className="my-2 flex items-center justify-between">
            <p className="text-lg font-bold">
               Number of flashcards: {flashcards.length}
            </p>
            <DropdownMenu options={menuOptions} />
         </div>

         <div className="flex flex-col gap-2">
            {flashcards.map((flashcard) => (
               <FlashcardListRow
                  key={flashcard.flashcardId}
                  flashcard={flashcard}
                  refetchLesson={refetchLesson}
                  setFlashcardToEdit={setFlashcardToEdit}
                  setSelectedMode={setSelectedMode}
                  selectedMode={selectedMode}
                  flashcardToEdit={flashcardToEdit}
               />
            ))}
         </div>
      </div>
   );
};

export default FlashcardList;
