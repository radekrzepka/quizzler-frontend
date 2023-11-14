"use client";

import FlashcardLearnCard from "./flashcard-learn-card";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
import type { Lesson } from "@/types/lesson";
import type { Flashcard } from "@/types/flashcard";
import { EDIT_LESSON } from "@/utils/urls";
import ProgressBar from "@/components/ui/progress-bar";
import Dialog from "@/components/ui/dialog";

interface FlashcardsLearnSectionProps {
   lesson: Lesson;
}

const FlashcardsLearnSection = ({ lesson }: FlashcardsLearnSectionProps) => {
   const [flashcardsToLearn, setFlashcardsToLearn] = useState(
      lesson.flashcards
   );

   const deleteLearned = (flashcardId: number) => {
      setFlashcardsToLearn(prevFlashcards => {
         return prevFlashcards.filter(
            flashcard => flashcard.flashcardId != flashcardId
         );
      });
   };

   const moveUnlearned = (flashcardId: number) => {
      setFlashcardsToLearn(prevFlashcards => {
         const unlearnedFlashcard = prevFlashcards.find(
            flashcard => flashcard.flashcardId == flashcardId
         ) as Flashcard;
         return [
            ...prevFlashcards.filter(
               flashcard => flashcard.flashcardId != flashcardId
            ),
            unlearnedFlashcard,
         ];
      });
   };

   const remainingFlashCards = flashcardsToLearn.length;

   if (remainingFlashCards === 0) {
      if (lesson.flashcards.length === 0)
         return (
            <Dialog>
               <div className="flex h-fit w-full flex-col items-center gap-2 rounded pt-0 text-background">
                  <h2 className="text-3xl font-semibold">Get Started!</h2>
                  <p className="mt-2 text-center text-base">
                     You haven&apos;t added any flashcard yet. Please go to edit
                     page to add your first flashcard.
                  </p>
                  <Link
                     href={EDIT_LESSON(
                        lesson.title,
                        lesson.owner.userId.toString()
                     )}
                  >
                     <Button>Go to edit page</Button>
                  </Link>
               </div>
            </Dialog>
         );

      return (
         <Dialog>
            <div className="flex h-fit w-full flex-col items-center gap-2 rounded text-background">
               <h2 className="text-3xl font-semibold">Congratulations !</h2>
               <p className="mt-2 text-base">
                  You have repeated all the flashcards prepared for you.
               </p>
               <Link
                  href={EDIT_LESSON(
                     lesson.title,
                     lesson.owner.userId.toString()
                  )}
               >
                  <Button>Add some new one</Button>
               </Link>
            </div>
         </Dialog>
      );
   }
   return (
      <>
         <div className="mb-2 flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-2xl font-bold">
               Flashcards to review: {remainingFlashCards}
            </p>
            <Link
               href={EDIT_LESSON(lesson.title, lesson.owner.userId.toString())}
            >
               <Button variant="accent">Create new flashcards</Button>
            </Link>
         </div>
         <div className="grid w-full place-items-center">
            <ProgressBar
               min={lesson.flashcards.length - remainingFlashCards}
               max={lesson.flashcards.length}
               className="mx-1 mb-2 w-11/12 md:w-full"
            />
         </div>
         <FlashcardLearnCard
            flashcard={flashcardsToLearn[0]}
            deleteLearned={deleteLearned}
            moveUnlearned={moveUnlearned}
         />
      </>
   );
};

export default FlashcardsLearnSection;
