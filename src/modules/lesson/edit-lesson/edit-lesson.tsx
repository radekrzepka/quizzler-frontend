"use client";

import type { Flashcard } from "@/types/flashcard";
import type { Lesson } from "@/types/lesson";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FlashcardForm from "../../flashcard/form/flashcard-form";
import FlashcardList from "../../flashcard/lesson-list/flashcard-list";
import EditLessonForm from "./edit-lesson-form";
import EditLessonSkeleton from "./edit-lesson-skeleton";
import { getLesson } from "@/utils/api-utils/get-lesson";
import { getCookie } from "cookies-next";

interface EditLessonProps {
   lesson: Lesson;
   userId: string;
}

const EditLesson = ({ lesson: lessonData, userId }: EditLessonProps) => {
   const [flashcardToEdit, setFlashcardToEdit] = useState<Flashcard | null>(
      null
   );
   const [selectedMode, setSelectedMode] = useState<"Add" | "Edit">("Add");
   const JWT = getCookie("JWT");
   const {
      data: lesson,
      refetch: refetchLesson,
      isLoading,
      isError,
   } = useQuery({
      queryKey: ["lesson", userId, lessonData.title],
      queryFn: () => getLesson(userId, lessonData.title, JWT as string),
   });

   if (isLoading || isError || !lesson) return <EditLessonSkeleton />;

   return (
      <div className="grid gap-4 xl:grid-cols-2">
         <EditLessonForm lesson={lesson} refetchLesson={refetchLesson} />
         <FlashcardForm
            lessonId={lesson.lessonId}
            refetchLesson={refetchLesson}
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
