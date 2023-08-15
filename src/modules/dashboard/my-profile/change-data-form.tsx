"use client";

import { FC, useState } from "react";
import { UserInfo } from "@/types/user-info";
import { useForm } from "react-hook-form";
import PenImage from "./../../../assets/pen.svg";
import Image from "next/image";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";

interface ChangeDataFormProps {
   profile: UserInfo;
}

const ChangeDataForm: FC<ChangeDataFormProps> = ({ profile }) => {
   const [disabled, setDisabled] = useState(true);
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
      watch,
   } = useForm({
      defaultValues: {
         email: profile.email,
         firstName: profile.firstName,
         lastName: profile.lastName,
         username: profile.username,
      },
   });
   return (
      <form className="flex w-full flex-col items-center">
         <h2 className="mt-2 text-3xl font-bold">Profile data</h2>
         <button
            onClick={() => setDisabled((prevState) => !prevState)}
            type="button"
            className="mr-6 self-end"
         >
            <Image
               className="inline"
               src={PenImage}
               alt="Icon of pen"
               width={20}
               height={20}
            />
            Edit your data
         </button>
         <div className="flex w-3/4 flex-col gap-4">
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="email">
                  Your email:
               </label>
               <TextInput
                  id="email"
                  type="email"
                  register={register}
                  name="email"
                  disabled={disabled}
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="username">
                  Your username:
               </label>
               <TextInput
                  id="username"
                  type="text"
                  register={register}
                  name="username"
                  disabled={disabled}
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="firstName">
                  Your first name:
               </label>
               <TextInput
                  id="firstName"
                  type="text"
                  register={register}
                  name="firstName"
                  disabled={disabled}
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="lastName">
                  Your last name:
               </label>
               <TextInput
                  id="lastName"
                  type="text"
                  register={register}
                  name="lastName"
                  disabled={disabled}
               />
            </div>
            <Button
               type="button"
               variant="primary"
               label="Change your data"
               className="w-fit self-center"
            />
         </div>
      </form>
   );
};

export default ChangeDataForm;
