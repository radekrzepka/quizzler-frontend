"use client";

import { Flashcard } from "@/types/flashcard";
import { Lesson } from "@/types/lesson";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useState } from "react";
import FlashcardForm from "../flashcard/flashcard-form";
import FlashcardList from "../flashcard/flashcard-list";
import EditLessonForm from "./edit-lesson-form";
import EditLessonSkeleton from "./edit-lesson-skeleton";

const getLesson = async (id: string) => {
   const JWT = getCookie("JWT") as string;

   const res = await fetch(`/api/lesson/${id}`, {
      headers: { Authorization: JWT },
   });

   if (!res.ok) {
      throw new Error("Failed to fetch data");
   }

   const { data } = await res.json();

   return data;
};

interface EditLessonProps {
   lessonId: string;
}

const EditLesson = ({ lessonId }: EditLessonProps) => {
   const [flashcardToEdit, setFlashcardToEdit] = useState<Flashcard | null>(
      null,
   );
   const [selectedMode, setSelectedMode] = useState<"Add" | "Edit">("Add");
   const {
      data: lesson,
      refetch: refetchLesson,
      isLoading,
      isError,
   } = useQuery<Lesson>({
      queryKey: ["lesson", lessonId],
      queryFn: () => getLesson(lessonId),
   });

   if (isLoading || isError || !lesson) return <EditLessonSkeleton />;

   return (
      <div className="grid gap-4 xl:grid-cols-2">
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
