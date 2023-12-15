import MultiSelect from "@/components/lesson/tags-multi-select";
import Button from "@/components/ui/button";
import ErrorMessage from "@/components/ui/error-message";
import ImageContainer from "@/components/ui/image-container";
import ImageInput from "@/components/ui/image-input";
import LabelInput from "@/components/ui/label-input";
import Select from "@/components/ui/select";
import Textarea from "@/components/ui/textarea";
import type { Lesson } from "@/types/lesson";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
   EditLessonForm,
   editLessonFormSchema,
} from "./edit-lesson-form-schema";
import { useRouter } from "next/navigation";

interface EditLessonFormProps {
   lesson: Lesson;
}
const formatTags = (tags: Array<string>) =>
   tags.map(tag => ({ label: tag, value: tag }));

const EditLessonForm = ({ lesson }: EditLessonFormProps) => {
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
   >(lesson.imageName);
   const imageInputRef = useRef<HTMLInputElement | null>(null);
   const router = useRouter();

   const { mutate } = useMutation({
      mutationFn: async (formData: FormData) => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/lesson/update`,
            {
               headers: {
                  Authorization: JWT,
                  Accept: "text/json",
               },
               method: "PATCH",
               body: formData,
            }
         );
         return res.status;
      },
      onSettled: status => {
         if (status === 200) {
            toast.success("Lesson updated successfully");
            router.refresh();
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
         lessonType.value === "public" ? "true" : "false"
      );

      if (image) {
         formData.append("image", image as File);
      } else if (deleteLessonImage) {
         formData.append("image", "");
      }

      if (tags) {
         if (tags.length === 0) formData.append("tagNames", "");
         else {
            tags.forEach(tag => formData.append("tagNames", tag.value));
         }
      }

      mutate(formData);
   };
   const handleDelete = () => {
      setDeleteLessonImage(true);
   };

   return (
      <div className="flex flex-col rounded-xl bg-text p-4 pb-0 text-background">
         <h2 className="text-center text-3xl font-bold">Lesson details</h2>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl bg-text text-background"
         >
            <div
               className="relative h-[250px] w-full cursor-pointer rounded-xl bg-gray-700 md:mx-auto md:w-3/4 lg:w-3/5"
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

               <Button type="submit" isLoading={buttonLoading}>
                  Update lesson details
               </Button>
            </div>
         </form>
      </div>
   );
};

export default EditLessonForm;
