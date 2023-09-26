"use client";

import Button from "@/components/ui/button";
import Textarea from "@/components/ui/textarea";
import Image from "next/image";
import { FC } from "react";
import { useForm } from "react-hook-form";
import WhitePenIcon from "./../../assets/icons/white-pen-icon.svg";
import Select from "@/components/ui/select";
import { NewLessonForm, newLessonFormSchema } from "./new-lesson-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import LabelInput from "@/components/ui/label-input";
import { useState, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ui/error-message";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ImageInput from "@/components/ui/image-input";
import ImageContainer from "@/components/ui/image-container";

const NewLessonForm: FC = () => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm<NewLessonForm>({
      resolver: zodResolver(newLessonFormSchema),
      defaultValues: {
         image: null,
      },
   });

   const [buttonLoading, setButtonLoading] = useState(false);
   const router = useRouter();
   const [selectedImage, setSelectedImage] = useState<
      string | null | undefined
   >(null);
   const imageInputRef = useRef<HTMLInputElement | null>(null);

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

   const onSubmit = () => {
      setButtonLoading(true);

      const formData = new FormData();
      formData.append("title", watch("title"));
      formData.append("description", watch("description") || "");
      formData.append(
         "isPublic",
         watch("lessonType") === "public" ? "true" : "false",
      );

      const watchedImage = watch("image");
      if (watchedImage !== undefined) {
         formData.append("image", watchedImage);
      }

      mutate(formData);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="h-fit rounded-xl bg-text  text-background"
      >
         <div
            className="relative h-[400px] w-full cursor-pointer rounded-t-xl bg-gray-700"
            onClick={() => imageInputRef?.current?.click()}
         >
            <ImageContainer
               name="image"
               setSelectedImage={setSelectedImage}
               setValue={setValue}
               selectedImage={selectedImage}
            />
            <ImageInput
               setValue={setValue}
               name="image"
               register={register}
               setSelectedImage={setSelectedImage}
               imageInputRef={imageInputRef}
            />
         </div>
         <div className="flex flex-col gap-3 p-4">
            {errors.image && (
               <ErrorMessage>{errors.image?.message as string}</ErrorMessage>
            )}
            <h2 className="text-center text-3xl font-bold">Add new lesson</h2>
            <div className="flex flex-col">
               <LabelInput
                  label="Lesson title: *"
                  inputType="text"
                  register={register}
                  name="title"
                  errors={errors}
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="description">
                  Lesson description:
               </label>
               <Textarea
                  id="description"
                  register={register}
                  name="description"
                  className="mb-[23px] h-[250px]"
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="lessonType">
                  Lesson type:
               </label>
               <Select
                  id="type"
                  name="lessonType"
                  register={register}
                  className="mb-[23px]"
                  options={[
                     { label: "Public", value: "public" },
                     { label: "Private", value: "private" },
                  ]}
               />
            </div>

            <Button variant="primary" type="submit" isLoading={buttonLoading}>
               Add new lesson
            </Button>
         </div>
      </form>
   );
};

export default NewLessonForm;
