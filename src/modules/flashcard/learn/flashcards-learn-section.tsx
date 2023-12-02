"use client";

import FlashcardLearnCard from "./flashcard-learn-card";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/button";
import type { Lesson } from "@/types/lesson";
import type { Flashcard } from "@/types/flashcard";
import { EDIT_LESSON, MY_LESSONS } from "@/utils/urls";
import ProgressBar from "@/components/ui/progress-bar";
import Dialog from "@/components/ui/dialog";
import useCurrentUserInfo from "@/hooks/api-hooks/use-current-user-info";
import Skeleton from "@/components/ui/skeleton";

interface FlashcardsLearnSectionProps {
   lesson: Lesson;
}

const FlashcardsLearnSection = ({ lesson }: FlashcardsLearnSectionProps) => {
   const [showDialog, setShowDialog] = useState(false);
   const [flashcardsToLearn, setFlashcardsToLearn] = useState(
      lesson.flashcards
   );
   const { data: userInfo, isLoading } = useCurrentUserInfo();

   const showCreateFlashcardsButton = userInfo?.userId === lesson.owner.userId;

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

   const remainingFlashcards = flashcardsToLearn.length;

   useEffect(() => {
      setShowDialog(remainingFlashcards === 0);
   }, [remainingFlashcards]);

   return (
      <>
         <Dialog setIsOpen={setShowDialog} isOpen={showDialog}>
            {lesson.flashcards.length === 0 ? (
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
            ) : (
               <div className="flex h-fit w-full flex-col items-center gap-2 rounded text-background">
                  <h2 className="text-3xl font-semibold">Congratulations !</h2>
                  <p className="mt-2 text-base">
                     You have repeated all the flashcards prepared for you.
                  </p>
                  <Link href={MY_LESSONS}>
                     <Button>Go ty my lessons</Button>
                  </Link>
               </div>
            )}
         </Dialog>

         <div className="mb-2 flex flex-col items-center justify-between gap-2 md:flex-row">
            <p className="text-2xl font-bold">
               Flashcards to review: {remainingFlashcards}
            </p>
            {isLoading ? (
               <Skeleton height="40px" width="230px" />
            ) : (
               showCreateFlashcardsButton && (
                  <Link
                     href={EDIT_LESSON(
                        lesson.title,
                        lesson.owner.userId.toString()
                     )}
                  >
                     <Button variant="accent">Create new flashcards</Button>
                  </Link>
               )
            )}
         </div>
         <div className="grid w-full place-items-center">
            <ProgressBar
               min={lesson.flashcards.length - remainingFlashcards}
               max={lesson.flashcards.length}
               className="mx-1 my-2 w-11/12 md:w-full"
            />
         </div>
         {flashcardsToLearn[0] && (
            <FlashcardLearnCard
               flashcard={flashcardsToLearn[0]}
               deleteLearned={deleteLearned}
               moveUnlearned={moveUnlearned}
            />
         )}
      </>
   );
};

export default FlashcardsLearnSection;
