import { Lesson } from "@/types/lesson";
import { FC, useState } from "react";
import FlashcardForm from "../flashcard/flashcard-form";
import {
   RefetchOptions,
   RefetchQueryFilters,
   QueryObserverResult,
} from "@tanstack/react-query";
import FlashcardList from "../flashcard/flashcard-list";
import { Flashcard } from "@/types/flashcard";
import EditLessonForm from "./edit-lesson-form";

interface EditLessonProps {
   lesson: Lesson;
   refetchLesson: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<Lesson, unknown>>;
}

const EditLesson: FC<EditLessonProps> = ({ lesson, refetchLesson }) => {
   const [flashcardToEdit, setFlashcardToEdit] = useState<Flashcard | null>(
      null,
   );
   const [selectedMode, setSelectedMode] = useState<"Add" | "Edit">("Add");

   return (
      <div className="grid gap-4 xl:grid-cols-[2fr_2fr_1fr]">
         <EditLessonForm lesson={lesson} />
         <FlashcardForm
            lessonId={lesson.lessonId}
            onFlashcardAdded={refetchLesson}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
            flashcardToEdit={flashcardToEdit}
            setFlashcardToEdit={setFlashcardToEdit}
         />

         <FlashcardList
            selectedMode={selectedMode}
            setFlashcardToEdit={setFlashcardToEdit}
            setSelectedMode={setSelectedMode}
            flashcards={lesson.flashcards}
            refetchLesson={refetchLesson}
            flashcardToEdit={flashcardToEdit}
         />
      </div>
   );
};

export default EditLesson;
