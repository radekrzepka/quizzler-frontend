import { Lesson } from "@/types/lesson";
import { FC } from "react";
import NewFlashcardForm from "../flashcard/new-flashcard-form";
import {
   RefetchOptions,
   RefetchQueryFilters,
   QueryObserverResult,
} from "@tanstack/react-query";
import FlashcardList from "../flashcard/flashcard-list";

interface EditLessonProps {
   lesson: Lesson;
   refetchLesson: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<Lesson, unknown>>;
}

const EditLesson: FC<EditLessonProps> = ({ lesson, refetchLesson }) => {
   return (
      <div className="grid grid-cols-[3fr_1fr] gap-4">
         <NewFlashcardForm
            lessonId={lesson.lessonId}
            onFlashcardAdded={refetchLesson}
         />

         <FlashcardList
            flashcards={lesson.flashcards}
            refetchLesson={refetchLesson}
         />
      </div>
   );
};

export default EditLesson;
