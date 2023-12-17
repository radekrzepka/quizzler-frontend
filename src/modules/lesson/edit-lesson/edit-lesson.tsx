"use client";

import type { Flashcard } from "@/types/flashcard";
import type { Lesson } from "@/types/lesson";
import { useState } from "react";
import FlashcardForm from "../../flashcard/form/flashcard-form";
import FlashcardList from "../../flashcard/lesson-list/flashcard-list";
import EditLessonForm from "./edit-lesson-form";

interface EditLessonProps {
   lesson: Lesson;
}

const EditLesson = ({ lesson }: EditLessonProps) => {
   const [flashcardToEdit, setFlashcardToEdit] = useState<Flashcard | null>(
      null
   );
   const [selectedMode, setSelectedMode] = useState<"Add" | "Edit">("Add");

   return (
      <div className="grid gap-4 xl:grid-cols-2">
         <EditLessonForm lesson={lesson} />
         <FlashcardForm
            lessonId={lesson.lessonId}
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
            flashcardToEdit={flashcardToEdit}
         />
      </div>
   );
};

export default EditLesson;
