import DropdownMenu from "@/components/ui/dropdown-menu";
import type { Flashcard } from "@/types/flashcard";
import type { Dispatch, SetStateAction } from "react";
import FlashcardListRow from "./flashcard-list-row";

interface FlashcardListProps {
   flashcards: Array<Flashcard>;
   setFlashcardToEdit: Dispatch<SetStateAction<Flashcard | null>>;
   setSelectedMode: Dispatch<SetStateAction<"Add" | "Edit">>;
   flashcardToEdit: Flashcard | null;
   selectedMode: "Add" | "Edit";
}

const FlashcardList = ({
   flashcards,
   setFlashcardToEdit,
   setSelectedMode,
   flashcardToEdit,
   selectedMode,
}: FlashcardListProps) => {
   const menuOptions = [
      {
         label: "Import from JSON/CSV/txt",
         onClickFunction: () => {
            console.log("Import from JSON/CSV/txt");
         },
      },
      {
         label: "Export to JSON/CSV/txt",
         onClickFunction: () => {
            console.log("Export to JSON/CSV/txt");
         },
      },
   ];

   return (
      <div className="min-h-[300px] rounded-xl bg-text p-4 text-background xl:col-span-2 xl:h-full xl:overflow-y-auto">
         <h2 className="text-center text-3xl font-bold">Flashcards list</h2>
         <div className="my-2 flex items-center justify-between">
            <p className="text-lg font-bold">Flashcards: {flashcards.length}</p>
            <DropdownMenu options={menuOptions} />
         </div>

         <div className="flex flex-wrap justify-center gap-2 p-4">
            {flashcards.map(flashcard => (
               <FlashcardListRow
                  key={flashcard.flashcardId}
                  flashcard={flashcard}
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
