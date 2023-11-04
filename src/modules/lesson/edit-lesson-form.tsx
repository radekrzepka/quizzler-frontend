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
import BackIcon from "./../../assets/icons/back-icon.svg";
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
      if (lesson.imagePath) setSelectedImage(lesson.imagePath);
   }, []);

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
         if (status === 200) toast.success("Lesson updated successfully");
         else if (status === 400)
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
      }

      if (tags) {
         if (tags.length === 0) formData.append("tagNames", "");
         else {
            tags.forEach((tag) => formData.append("tagNames", tag.value));
         }
      }

      mutate(formData);
   };

   return (
      <div className="flex flex-col rounded-xl bg-text p-4 pb-0 text-background">
         <div className="flex w-full flex-col">
            <button
               className="z-20 flex flex-row items-center gap-1"
               onClick={() => {
                  router.push("/dashboard/my-lessons");
               }}
            >
               <Image
                  width={20}
                  height={20}
                  src={BackIcon}
                  alt={`Go back to list icon`}
               />
               <span>Go back to my lessons</span>
            </button>
            <h2 className="inset-x-0 text-center text-3xl font-bold">
               Lesson details
            </h2>
         </div>
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
                     className="mb-[23px] h-[100px]"
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
