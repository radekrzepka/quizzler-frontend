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

const NewLessonForm: FC = () => {
   const {
      register,
      handleSubmit,
      watch,
      setValue,
      formState: { errors },
   } = useForm<NewLessonForm>({ resolver: zodResolver(newLessonFormSchema) });
   const [selectedImage, setSelectedImage] = useState<string | null>(null);
   const imageInputRef = useRef<HTMLInputElement | null>(null);
   const { ref, ...rest } = register("image");

   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
         const imageURL = URL.createObjectURL(e.target.files[0]);
         setValue("image", e.target.files[0]);
         setSelectedImage(imageURL);
      }
   };

   const { mutate } = useMutation(async (formData: FormData) => {
      const response = await fetch("/api/lesson/add", {
         method: "POST",
         body: formData,
      });

      if (!response.ok) {
         throw new Error("Failed to add lesson");
      }

      return response.json();
   });

   const onSubmit = (data: NewLessonForm) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description || "");
      formData.append("lessonType", data.lessonType);
      if (data.image) {
         formData.append("image", data.image[0]);
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
            {selectedImage && (
               <div className="absolute inset-0">
                  <Image
                     src={selectedImage}
                     alt="Selected lesson image"
                     fill={true}
                     className="h-full w-full rounded-t-xl object-cover"
                  />
               </div>
            )}

            {!selectedImage && (
               <div className="absolute right-2 top-2">
                  <Image
                     width={20}
                     height={20}
                     src={WhitePenIcon}
                     alt={`Change image icon`}
                  />
               </div>
            )}
            <input
               type="file"
               className="hidden"
               ref={(e) => {
                  ref(e);
                  imageInputRef.current = e;
               }}
               accept="image/png, image/jpeg, image/webp, image/jpg"
               {...rest}
               onChange={handleImageChange}
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

            <Button variant="primary" type="submit">
               Add new lesson
            </Button>
         </div>
      </form>
   );
};

export default NewLessonForm;
