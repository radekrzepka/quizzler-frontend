"use client";

import Button from "@/components/ui/button";
import ImageContainer from "@/components/ui/image-container";
import ImageInput from "@/components/ui/image-input";
import LabelInput from "@/components/ui/label-input";
import type { Flashcard } from "@/types/flashcard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import classNames from "classnames";
import { getCookie } from "cookies-next";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { NewFlashcardForm } from "./flashcard-form-schema";
import { newFlashcardFormSchema } from "./flashcard-form-schema";

interface FlashcardFormProps {
   lessonId: number;
   onFlashcardAdded: () => void;
   selectedMode: "Add" | "Edit";
   setSelectedMode: Dispatch<SetStateAction<"Add" | "Edit">>;
   flashcardToEdit: Flashcard | null;
   setFlashcardToEdit: Dispatch<SetStateAction<Flashcard | null>>;
}

const FlashcardForm = ({
   lessonId,
   onFlashcardAdded,
   selectedMode,
   setSelectedMode,
   flashcardToEdit,
   setFlashcardToEdit,
}: FlashcardFormProps) => {
   const {
      register,
      handleSubmit,
      setValue,
      reset,
      formState: { errors },
   } = useForm<NewFlashcardForm>({
      resolver: zodResolver(newFlashcardFormSchema),
      defaultValues: {
         questionImage: null,
         answerImage: null,
      },
   });

   const [buttonLoading, setButtonLoading] = useState(false);
   const [selectedQuestionImage, setSelectedQuestionImage] = useState<
      string | null | undefined
   >(null);
   const [selectedAnswerImage, setSelectedAnswerImage] = useState<
      string | null | undefined
   >(null);
   const questionImageInputRef = useRef<HTMLInputElement | null>(null);
   const answerImageInputRef = useRef<HTMLInputElement | null>(null);
   const [deleteQuestionImage, setDeleteQuestionImage] = useState(false);
   const [deleteAnswerImage, setDeleteAnswerImage] = useState(false);
   useEffect(() => {
      if (flashcardToEdit) {
         const {
            questionText,
            answerText,
            questionImageName,
            answerImageName,
         } = flashcardToEdit;
         const fieldsToUpdate = {
            question: questionText,
            answer: answerText,
            questionImage: questionImageName,
            answerImage: answerImageName,
         };

         for (const [key, value] of Object.entries(fieldsToUpdate)) {
            setValue(
               key as "question" | "answer" | "questionImage" | "answerImage",
               value
            );
         }

         setSelectedQuestionImage(questionImageName);
         setSelectedAnswerImage(answerImageName);
      } else {
         reset();
         setSelectedQuestionImage(null);
         setSelectedAnswerImage(null);
      }
   }, [flashcardToEdit, setValue, reset]);

   const { mutate } = useMutation({
      mutationFn: async (formData: FormData) => {
         const JWT = getCookie("JWT") as string;

         const apiEndpoint =
            selectedMode === "Add"
               ? "/api/flashcard/add"
               : "/api/flashcard/update";
         const method = selectedMode === "Add" ? "POST" : "PATCH";

         const res = await fetch(apiEndpoint, {
            headers: {
               Authorization: JWT,
               Accept: "text/json",
            },
            method,
            body: formData,
         });

         return res.json();
      },
      onSettled: ({ status }) => {
         if (status === 201) {
            selectedMode === "Add"
               ? toast.success("Flashcard added successfully")
               : toast.success("Flashcard updated successfully");
            onFlashcardAdded();
            reset();
         } else {
            selectedMode === "Add"
               ? toast.success("Error adding flashcard")
               : toast.success("Error updating flashcard");
         }
         setButtonLoading(false);
      },
   });

   const onSubmit: SubmitHandler<NewFlashcardForm> = ({
      answer,
      answerImage,
      question,
      questionImage,
   }) => {
      setButtonLoading(true);

      const formData = new FormData();

      if (selectedMode === "Add") {
         formData.append("lessonId", lessonId.toString());
      } else {
         formData.append(
            "flashcardId",
            flashcardToEdit?.flashcardId.toString() as string
         );
      }

      formData.append("questionText", question || "");
      formData.append("answerText", answer || "");

      if (questionImage && typeof questionImage !== "string") {
         formData.append("questionImage", questionImage);
      } else if (deleteQuestionImage) {
         formData.append("questionImage", "");
      }

      if (answerImage && typeof answerImage !== "string") {
         formData.append("answerImage", answerImage);
      } else if (deleteAnswerImage) {
         formData.append("answerImage", "");
      }

      if (selectedMode === "Edit" && !flashcardToEdit) {
         toast.error("Please select flashcard to edit");
         return null;
      }

      setSelectedQuestionImage(null);
      setSelectedAnswerImage(null);
      setFlashcardToEdit(null);
      mutate(formData);
   };
   const handleDelete = (imageType: string) => {
      if (imageType === "question") setDeleteQuestionImage(true);
      if (imageType === "answer") setDeleteAnswerImage(true);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="rounded-xl bg-text text-background"
         id="flashcard-form"
      >
         <input type="submit" style={{ display: "none" }} />
         <div className="flex h-full flex-col gap-3 p-4">
            <h2 className="text-center text-3xl font-bold">
               {selectedMode} flashcard
            </h2>
            <div className="flex border-collapse justify-between text-center">
               <button
                  className={classNames(
                     "w-1/2 rounded-lg rounded-r-none border border-background transition duration-300 ease-in-out",
                     selectedMode === "Add" && "bg-primary"
                  )}
                  onClick={event => {
                     event.preventDefault();
                     setFlashcardToEdit(null);
                     reset();
                     setSelectedMode("Add");
                  }}
               >
                  Add
               </button>
               <button
                  className={classNames(
                     "w-1/2 rounded-lg rounded-l-none border border-background transition duration-300 ease-in-out",
                     selectedMode === "Edit" && "bg-primary"
                  )}
                  onClick={event => {
                     event.preventDefault();
                     setSelectedMode("Edit");
                  }}
               >
                  Edit
               </button>
            </div>
            <div className="relative flex h-full flex-col ">
               {selectedMode === "Edit" && !flashcardToEdit && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                     <h2 className="z-20 text-3xl font-bold">
                        Please select flashcard to edit on list
                     </h2>
                  </div>
               )}
               <div
                  className={classNames(
                     "flex h-full flex-col justify-between gap-2 transition duration-300 ease-in-out",
                     selectedMode === "Edit" &&
                        !flashcardToEdit &&
                        "pointer-events-none blur-sm"
                  )}
               >
                  <div>
                     <div className="flex flex-col">
                        <LabelInput
                           label="Question:"
                           inputType="text"
                           register={register}
                           name="question"
                           errors={errors}
                        />
                     </div>
                     <div className="flex flex-col">
                        <LabelInput
                           label="Answer:"
                           inputType="text"
                           register={register}
                           name="answer"
                           errors={errors}
                        />
                     </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                     <div>
                        <p>Add question image: </p>
                        <div
                           className="relative h-[300px] cursor-pointer rounded-xl bg-gray-700"
                           onClick={() =>
                              questionImageInputRef?.current?.click()
                           }
                        >
                           <ImageContainer
                              name="questionImage"
                              selectedImage={selectedQuestionImage}
                              setSelectedImage={setSelectedQuestionImage}
                              setValue={setValue}
                              fullRounded
                              onDelete={() => handleDelete("question")}
                           />
                           <ImageInput
                              setValue={setValue}
                              name="questionImage"
                              register={register}
                              setSelectedImage={setSelectedQuestionImage}
                              imageInputRef={questionImageInputRef}
                           />
                        </div>
                     </div>
                     <div>
                        <p>Add answer image: </p>
                        <div
                           className="relative h-[300px] cursor-pointer rounded-xl bg-gray-700"
                           onClick={() => answerImageInputRef?.current?.click()}
                        >
                           <ImageContainer
                              name="answerImage"
                              selectedImage={selectedAnswerImage}
                              setSelectedImage={setSelectedAnswerImage}
                              setValue={setValue}
                              fullRounded
                              onDelete={() => handleDelete("answer")}
                           />
                           <ImageInput
                              setValue={setValue}
                              name="answerImage"
                              register={register}
                              setSelectedImage={setSelectedAnswerImage}
                              imageInputRef={answerImageInputRef}
                           />
                        </div>
                     </div>
                  </div>
                  <Button
                     variant="primary"
                     type="submit"
                     className="w-full"
                     isLoading={buttonLoading}
                  >
                     {selectedMode === "Add" ? "Add new" : "Change"} flashcard
                  </Button>
               </div>
            </div>
         </div>
      </form>
   );
};

export default FlashcardForm;
