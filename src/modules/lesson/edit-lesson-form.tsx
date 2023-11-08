import MultiSelect from "@/components/lesson/tags-multi-select";
import Button from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import ImageContainer from "@/components/ui/image-container";
import ImageInput from "@/components/ui/image-input";
import LabelInput from "@/components/ui/label-input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import { Lesson } from "@/types/lesson";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
   EditLessonForm,
   editLessonFormSchema,
} from "./edit-lesson-form-schema";

interface EditLessonFormProps {
   lesson: Lesson;
}

const formatTags = (tags: string[]) =>
   tags.map((tag) => ({ label: tag, value: tag }));

const EditLessonForm: FC<EditLessonFormProps> = ({ lesson }) => {
   const router = useRouter();
   const [deleteLessonImage, setDeleteLessonImage] = useState(false);
   const {
      register,
      handleSubmit,
      watch,
      control,
      setValue,
      formState: { errors },
   } = useForm<EditLessonForm>({
      resolver: zodResolver(editLessonFormSchema),
      defaultValues: {
         title: lesson.title,
         description: lesson.description,
         lessonType: lesson.isPublic
            ? { label: "Public", value: "public" }
            : { label: "Private", value: "private" },

         image: null,
         tags: lesson.tags ? formatTags(lesson.tags) : [],
      },
   });

   const [buttonLoading, setButtonLoading] = useState(false);
   const [selectedImage, setSelectedImage] = useState<
      string | null | undefined
   >(null);
   const imageInputRef = useRef<HTMLInputElement | null>(null);

   useEffect(() => {
      if (lesson.imageName) setSelectedImage(lesson.imageName);
   }, [lesson.imageName]);

   const { mutate } = useMutation({
      mutationFn: async (formData: FormData) => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch("/api/lesson/update", {
            headers: {
               Authorization: JWT,
               Accept: "text/json",
            },
            method: "PATCH",
            body: formData,
         });

         return res.json();
      },
      onSettled: ({ status }) => {
         if (status === 200) {
            toast.success("Lesson updated successfully");
         } else if (status === 400)
            toast.error("Lesson with this name already exist");
         else toast.error("Error with updating your lesson");

         setButtonLoading(false);
      },
   });

   const onSubmit: SubmitHandler<EditLessonForm> = ({
      title,
      description,
      lessonType,
      image,
      tags,
   }) => {
      setButtonLoading(true);

      const formData = new FormData();

      formData.append("lessonId", lesson.lessonId.toString());
      if (title !== lesson.title) formData.append("title", title);
      if (description !== lesson.description && description)
         formData.append("description", description);

      formData.append(
         "isPublic",
         lessonType.value === "public" ? "true" : "false",
      );

      if (image) {
         formData.append("image", image);
      } else if (deleteLessonImage) {
         formData.append("image", "");
      }

      if (tags) {
         if (tags.length === 0) formData.append("tagNames", "");
         else {
            tags.forEach((tag) => formData.append("tagNames", tag.value));
         }
      }

      mutate(formData);
   };
   const handleDelete = () => {
      setDeleteLessonImage(true);
   };

   return (
      <div className="flex flex-col rounded-xl bg-text p-4 pb-0 text-background">
         <div className="flex w-full flex-col items-center justify-between sm:flex-row">
            <button
               className="z-20 flex flex-row items-center gap-1"
               onClick={() => {
                  router.push("/dashboard/my-lessons");
               }}
            >
               <Image
                  width={20}
                  height={20}
                  src="/icons/back-icon.svg"
                  alt={`Go back to list icon`}
               />
               <span>Go back to my lessons</span>
            </button>
            <button
               className="z-20 flex flex-row items-center gap-1"
               onClick={() => {
                  router.push(`/dashboard/lesson/${lesson.lessonId}`);
               }}
            >
               <span>Go to learning page</span>
               <Image
                  width={20}
                  height={20}
                  src="/icons/back-icon.svg"
                  alt={`Go back to list icon`}
                  className="rotate-180"
               />
            </button>
         </div>
         <h2 className="text-center text-3xl font-bold">Lesson details</h2>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="items-center justify-center rounded-xl bg-text text-background"
         >
            <div
               className="relative h-[200px] w-full cursor-pointer rounded-xl bg-gray-700"
               onClick={() => imageInputRef?.current?.click()}
            >
               <ImageContainer
                  fullRounded
                  name="image"
                  setSelectedImage={setSelectedImage}
                  setValue={setValue}
                  selectedImage={selectedImage}
                  onDelete={handleDelete}
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
                     defaultValue={watch("lessonType")}
                  />
               </div>
               <div className="flex flex-col">
                  <label className="mr-3" htmlFor="lessonType">
                     Add tags to your lesson:
                  </label>
                  <MultiSelect
                     name="tags"
                     control={control}
                     defaultTags={watch("tags")}
                  />
               </div>

               <Button
                  variant="primary"
                  type="submit"
                  isLoading={buttonLoading}
               >
                  Update lesson details
               </Button>
            </div>
         </form>
      </div>
   );
};

export default EditLessonForm;
