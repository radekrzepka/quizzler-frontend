import { Lesson } from "@/types/lesson";
import { FC } from "react";
import NewFlashcardForm from "../flashcard/new-flashcard-form";

interface EditLessonProps {
   lesson: Lesson;
}

const EditLesson: FC<EditLessonProps> = ({}) => {
   return (
      <div className="grid grid-cols-2 gap-4">
         <NewFlashcardForm />
         <div className="h-[600px] rounded-xl bg-text p-4 text-background">
            Flashcard lists
         </div>
      </div>
   );
};

export default EditLesson;
