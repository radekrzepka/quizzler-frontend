"use client";

import TagsMultiSelect from "@/components/lesson/tags-multi-select";
import Button from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import ImageContainer from "@/components/ui/image-container";
import ImageInput from "@/components/ui/image-input";
import LabelInput from "@/components/ui/label-input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { NewLessonForm, newLessonFormSchema } from "./new-lesson-form-schema";
import { EDIT_LESSON } from "@/utils/urls";
import useUserInfo from "@/hooks/api-hooks/use-user-info";

interface ApiResponse {
   data: string;
   status: number;
}

const NewLessonForm = () => {
   const {
      register,
      handleSubmit,
      setValue,
      control,
      formState: { errors },
      watch,
   } = useForm<NewLessonForm>({
      resolver: zodResolver(newLessonFormSchema),
      defaultValues: {
         lessonType: { label: "Public", value: "public" },
         image: null,
      },
   });

   const [buttonLoading, setButtonLoading] = useState(false);
   const router = useRouter();
   const [selectedImage, setSelectedImage] = useState<
      string | null | undefined
   >(null);
   const imageInputRef = useRef<HTMLInputElement | null>(null);
   const { data: userInfo } = useUserInfo();

   const { mutate } = useMutation({
      mutationFn: async (formData: FormData) => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/lesson/add`,
            {
               headers: {
                  Authorization: JWT,
                  Accept: "text/json",
               },
               method: "POST",
               body: formData,
            }
         );
         const responseData = (await res.json()) as string;
         const apiResponse: ApiResponse = {
            status: res.status,
            data: responseData,
         };
         return apiResponse;
      },
      onSettled: (res: ApiResponse | undefined) => {
         if (res?.status === 201) {
            const lessonName = watch("title");
            router.push(
               EDIT_LESSON(
                  lessonName,
                  userInfo?.userId ? userInfo.userId.toString() : ""
               )
            );
            router.refresh();
            toast.success("Lesson added successfully");
         } else if (res?.status === 400) {
            toast.error("Lesson with this name already exists");
         }
         setButtonLoading(false);
      },
   });

   const onSubmit: SubmitHandler<NewLessonForm> = ({
      title,
      lessonType,
      description,
      image,
      tags,
   }) => {
      setButtonLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description || "");
      formData.append(
         "isPublic",
         lessonType.value === "public" ? "true" : "false"
      );

      if (image !== undefined) formData.append("image", image as File);

      if (tags) {
         tags.forEach(tag => formData.append("tagNames", tag.value));
      }

      mutate(formData);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="mb-4 h-fit rounded-xl bg-text text-background xl:mb-0"
      >
         <div
            className="relative h-[200px] w-full cursor-pointer rounded-t-xl bg-gray-700"
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
                  className="h-[100px]"
                  errors={errors}
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="lessonType">
                  Lesson type:
               </label>
               <Select
                  name="lessonType"
                  control={control}
                  className="mb-[23px]"
                  options={[
                     { label: "Public", value: "public" },
                     { label: "Private", value: "private" },
                  ]}
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="lessonType">
                  Add tags to your lesson:
               </label>
               <TagsMultiSelect name="tags" control={control} />
            </div>

            <Button type="submit" isLoading={buttonLoading}>
               Add new lesson
            </Button>
         </div>
      </form>
   );
};

export default NewLessonForm;
