"use client";

import type { Flashcard } from "@/types/flashcard";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useSpring, animated } from "react-spring";

interface FlashcardLearnCardProps {
   flashcard: Flashcard;
   deleteLearned: (flashcardId: number) => void;
   moveUnlearned: (flashcardId: number) => void;
}

const FlashcardLearnCard = ({
   flashcard,
   deleteLearned,
   moveUnlearned,
}: FlashcardLearnCardProps) => {
   const [flipped, setFlipped] = useState(false);

   const { mutate: flashcardLogMutation } = useMutation({
      mutationFn: async (logData: {
         flashcardId: string;
         wasCorrect: boolean;
      }) => {
         const { flashcardId, wasCorrect } = logData;
         const JWT = getCookie("JWT") as string;

         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/flashcard/log`,
            {
               headers: {
                  Authorization: JWT,
                  Accept: "application/json",
                  "Content-Type": "application/json",
               },
               method: "POST",
               body: JSON.stringify({
                  flashcardId,
                  wasCorrect,
               }),
            }
         );
         return (await res.json()) as string;
      },
   });

   const { transform, opacity } = useSpring({
      opacity: flipped ? 1 : 0,
      transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 },
   });

   const [changeFlashcardAnimation, setChangeFlashcardAnimation] = useSpring(
      () => ({
         scale: 1,
         opacity: 1,
         onRest: () => setFlipped(false),
      })
   );

   const changeFlashcard = (flashcardId: number, wasCorrect: boolean) => {
      setChangeFlashcardAnimation({
         scale: 0.5,
         opacity: 0,
         onRest: () => {
            if (wasCorrect) {
               deleteLearned(flashcardId);
            } else {
               moveUnlearned(flashcardId);
            }
            setFlipped(false);
            setChangeFlashcardAnimation({ scale: 1, opacity: 1 });
         },
      });
   };

   return (
      <animated.div
         className="grid w-full place-items-center"
         style={{ ...changeFlashcardAnimation }}
      >
         <div
            className="relative m-auto h-[60vh] w-full cursor-pointer break-all text-background sm:w-3/4 lg:w-1/2 2xl:w-1/4"
            onClick={() => setFlipped(!flipped)}
         >
            <animated.div
               className="absolute flex h-full w-full select-none justify-center rounded-lg bg-primary px-1 shadow-md"
               style={{
                  opacity: opacity.to(o => 1 - o),
                  transform,
                  zIndex: flipped ? 0 : 1,
                  pointerEvents: flipped ? "none" : "all",
               }}
            >
               <div className="flex w-full flex-col justify-between gap-2 text-center text-background">
                  <p className="text-4xl font-bold">Question: </p>
                  <p className="text-xl">{flashcard.questionText}</p>
                  <div>
                     {flashcard.questionImageName && (
                        <Image
                           className="mx-auto my-4 max-h-[40vh] w-full object-contain"
                           src={`${process.env.NEXT_PUBLIC_IMG_URL}/${flashcard.questionImageName}`}
                           alt="Image for question of flashcard"
                           width={500}
                           height={200}
                           // placeholder="blur"
                        />
                     )}
                  </div>
               </div>
            </animated.div>
            <animated.div
               className="absolute flex h-full w-full select-none flex-col items-center justify-between rounded-lg bg-secondary px-1 shadow-md"
               style={{
                  opacity,
                  transform: transform.to(t => `${t} rotateY(180deg)`),
                  zIndex: flipped ? 1 : 0,
                  pointerEvents: flipped ? "all" : "none",
               }}
            >
               <div className="flex h-full w-full flex-col justify-between gap-2 text-center text-text">
                  <p className="text-4xl font-bold">Answer: </p>
                  <p className="text-xl">{flashcard.answerText}</p>

                  {flashcard.answerImageName && (
                     <Image
                        className="mx-auto my-0 max-h-[40vh] max-w-full rounded-t-xl object-contain"
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}/${flashcard.answerImageName}`}
                        alt="Image for answer of flashcard"
                        width={500}
                        height={200}
                     />
                  )}

                  <div className="w-full">
                     <button
                        className="w-1/2 rounded-bl-lg bg-white p-3 text-background"
                        onClick={() => {
                           flashcardLogMutation({
                              flashcardId: flashcard.flashcardId.toString(),
                              wasCorrect: false,
                           });
                           changeFlashcard(flashcard.flashcardId, false);
                        }}
                     >
                        Try again later
                     </button>
                     <button
                        className="w-1/2 rounded-br-lg bg-accent p-3 text-background"
                        onClick={() => {
                           flashcardLogMutation({
                              flashcardId: flashcard.flashcardId.toString(),
                              wasCorrect: true,
                           });
                           changeFlashcard(flashcard.flashcardId, true);
                        }}
                     >
                        Good
                     </button>
                  </div>
               </div>
            </animated.div>
         </div>
      </animated.div>
   );
};

export default FlashcardLearnCard;
