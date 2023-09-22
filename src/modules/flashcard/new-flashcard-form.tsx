"use client";

import Button from "@/components/ui/button";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {
   NewFlashcardForm,
   newFlashcardFormSchema,
} from "./new-flashcard-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LabelInput from "@/components/ui/label-input";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import ImageInput from "@/components/ui/image-input";
import ImageContainer from "@/components/ui/image-container";
import {
   RefetchOptions,
   RefetchQueryFilters,
   QueryObserverResult,
} from "@tanstack/react-query";

interface NewFlashcardFormProps {
   lessonId: number;
   onFlashcardAdded: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<any, unknown>>;
}

const NewFlashcardForm: FC<NewFlashcardFormProps> = ({
   lessonId,
   onFlashcardAdded,
}) => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
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
      string | null
   >(null);
   const [selectedAnswerImage, setSelectedAnswerImage] = useState<
      string | null
   >(null);
   const questionImageInputRef = useRef<HTMLInputElement | null>(null);
   const answerImageInputRef = useRef<HTMLInputElement | null>(null);

   const { mutate } = useMutation({
      mutationFn: async (formData: FormData) => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch("/api/flashcard/add", {
            headers: {
               Authorization: JWT,
               Accept: "text/json",
            },
            method: "POST",
            body: formData,
         });

         return res.json();
      },
      onSettled: ({ data, status }) => {
         if (status === 201) {
            toast.success("Flashcard added successfully");
            onFlashcardAdded();
         } else {
            toast.error("Error when adding flashcard");
         }
         setButtonLoading(false);
      },
   });

   console.log(lessonId);

   const onSubmit = () => {
      setButtonLoading(true);
      const formData = new FormData();
      formData.append("lessonId", lessonId.toString());
      formData.append("questionText", watch("question") || "");
      formData.append("answerText", watch("answer") || "");

      const watchedQuestionImage = watch("questionImage");
      if (watchedQuestionImage !== undefined) {
         formData.append("questionImage", watchedQuestionImage);
      }

      const watchedAnswerImage = watch("questionImage");
      if (watchedQuestionImage !== undefined) {
         formData.append("answerImage", watchedAnswerImage);
      }

      mutate(formData);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="h-fit rounded-xl bg-text text-background"
      >
         <div className="flex flex-col gap-3 p-4">
            <h2 className="text-center text-3xl font-bold">
               Add new flashcard
            </h2>
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
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p>Add question image: </p>
                  <div
                     className="relative h-[300px] cursor-pointer rounded-xl bg-gray-700"
                     onClick={() => questionImageInputRef?.current?.click()}
                  >
                     <ImageContainer
                        name="questionImage"
                        selectedImage={selectedQuestionImage}
                        setSelectedImage={setSelectedQuestionImage}
                        setValue={setValue}
                        fullRounded
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

            <Button variant="primary" type="submit" isLoading={buttonLoading}>
               Add new flashcard
            </Button>
         </div>
      </form>
   );
};

export default NewFlashcardForm;
