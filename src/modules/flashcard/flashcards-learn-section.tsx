"use client";

import type { Flashcard } from "@/types/flashcard";
import FlashcardLearnCard from "./flashcard-learn-card";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button";

interface FlashcardsLearnSectionProps {
   flashcards: Array<Flashcard>;
   lessonId: string;
}

const FlashcardsLearnSection = ({
   flashcards,
   lessonId,
}: FlashcardsLearnSectionProps) => {
   const [flashcardsToLearn, setFlashcardsToLearn] = useState(flashcards);

   const deleteLearned = (flashcardId: number) => {
      setFlashcardsToLearn((prevFlashcards) => {
         return prevFlashcards.filter(
            (flashcard) => flashcard.flashcardId != flashcardId,
         );
      });
   };

   const moveUnlearned = (flashcardId: number) => {
      setFlashcardsToLearn((prevFlashcards) => {
         const unlearnedFlashcard = prevFlashcards.find(
            (flashcard) => flashcard.flashcardId == flashcardId,
         ) as Flashcard;
         return [
            ...prevFlashcards.filter(
               (flashcard) => flashcard.flashcardId != flashcardId,
            ),
            unlearnedFlashcard,
         ];
      });
   };

   const remainingFlashCards = flashcardsToLearn.length;

   if (remainingFlashCards === 0) {
      if (flashcards.length === 0)
         return (
            <div className="grid w-full place-items-center">
               <div className="flex h-fit w-1/2 flex-col items-center gap-2 rounded bg-text p-6 text-background shadow-lg">
                  <h2 className="text-3xl font-semibold">Get Started!</h2>
                  <p className="mt-2 text-base">
                     You haven&apos;t added any flashcard yet. Please go to edit
                     page first to your first flashcard.
                  </p>
                  <Link href={`/dashboard/lesson/${lessonId}/edit`}>
                     <Button type="button" variant="primary">
                        Go to edit page
                     </Button>
                  </Link>
               </div>
            </div>
         );

      return (
         <div className="grid w-full place-items-center">
            <div className="flex h-fit w-1/2 flex-col items-center gap-2 rounded bg-text p-6 text-background shadow-lg">
               <h2 className="text-3xl font-semibold">Congratulations !</h2>
               <p className="mt-2 text-base">
                  You have repeated all the flashcards prepared for you.
               </p>
               <Link href={`/dashboard/lesson/${lessonId}/edit`}>
                  <Button type="button" variant="primary">
                     Add some new one
                  </Button>
               </Link>
            </div>
         </div>
      );
   }
   return (
      <div>
         <div className="mb-2 flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-2xl font-bold">
               Flashcards to review: {remainingFlashCards}
            </p>
            <Link href={`/dashboard/lesson/${lessonId}/edit`}>
               <Button type="button" variant="primary">
                  Create new flashcards
               </Button>
            </Link>
         </div>
         <FlashcardLearnCard
            flashcard={flashcardsToLearn[0]}
            deleteLearned={deleteLearned}
            moveUnlearned={moveUnlearned}
         />
      </div>
   );
};

export default FlashcardsLearnSection;
