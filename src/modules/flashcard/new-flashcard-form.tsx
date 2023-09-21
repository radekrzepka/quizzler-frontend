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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageInput from "@/components/ui/image-input";
import ImageContainer from "@/components/ui/image-container";

const NewFlashcardForm: FC = () => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm<NewFlashcardForm>({
      resolver: zodResolver(newFlashcardFormSchema),
   });

   const [buttonLoading, setButtonLoading] = useState(false);
   const router = useRouter();

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

         const res = await fetch("/api/lesson/add", {
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
            const lessonId = data.split(" ")[2];
            router.push(`/dashboard/lesson/${lessonId}?edit=true`);
            toast.success("Lesson added successfully");
         } else if (status === 400) {
            toast.error("Lesson with this name already exists");
         }
         setButtonLoading(false);
      },
   });

   const onSubmit = (data: NewFlashcardForm) => {
      //   setButtonLoading(true);
      //   const formData = new FormData();
      //   formData.append("Title", watch("title"));
      //   formData.append("description", watch("description") || "");
      //   formData.append(
      //      "isPublic",
      //      watch("lessonType") === "public" ? "true" : "false",
      //   );
      //   if (data.image) {
      //      formData.append("image", watch("image"));
      //   }
      //   mutate(formData);
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
            <p>Add question image: </p>
            <div
               className="relative h-[300px] w-1/2 cursor-pointer rounded-xl bg-gray-700"
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
            <div className="flex flex-col">
               <LabelInput
                  label="Answer:"
                  inputType="text"
                  register={register}
                  name="answer"
                  errors={errors}
               />
            </div>
            <p>Add answer image: </p>
            <div
               className="relative h-[300px] w-1/2 cursor-pointer rounded-xl bg-gray-700"
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

            <Button variant="primary" type="submit" isLoading={buttonLoading}>
               Add new lesson
            </Button>
         </div>
      </form>
   );
};

export default NewFlashcardForm;
