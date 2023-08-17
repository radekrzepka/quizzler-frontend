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

const NewLessonForm: FC = () => {
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<NewLessonForm>({ resolver: zodResolver(newLessonFormSchema) });

   const onSubmit = (data: any) => console.log(data);
   const { title, description, lessonType } = getValues();

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="h-fit rounded-xl bg-text  text-background"
      >
         <div className="relative h-[200px] w-full cursor-pointer rounded-t-xl bg-gray-700">
            <Image
               width={20}
               height={20}
               src={WhitePenIcon}
               alt={`Change image icon`}
               className="absolute right-2 top-2"
            />
         </div>
         <div className="flex flex-col gap-3 p-4">
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
