"use client";

import { FC, useState } from "react";
import { UserInfo } from "@/types/user-info";
import { useForm } from "react-hook-form";
import PenImage from "./../../../assets/pen.svg";
import Image from "next/image";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeDataFormSchema } from "./change-data-form-schema";
import ErrorMessage from "@/components/ui/error-message";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";

interface ChangeDataFormProps {
   profile: UserInfo;
}

const ChangeDataForm: FC<ChangeDataFormProps> = ({ profile }) => {
   const [disabled, setDisabled] = useState(true);
   const [buttonLoading, setButtonLoading] = useState(false);
   const [showSuccessModal, setShowSuccessModal] = useState(false);
   const router = useRouter();
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
         currentPassword: "",
      },
      resolver: zodResolver(changeDataFormSchema),
   });

   const { email, firstName, lastName, username, currentPassword } =
      getValues();

   const { mutate: updateDataMutation, data: response } = useMutation({
      mutationFn: async () => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch(`/api/user/update`, {
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: JWT,
            },
            method: "PATCH",
            body: JSON.stringify({
               email,
               username,
               currentPassword,
               firstName,
               lastName,
            }),
         });

         const data = await res.json();

         return data;
      },

      onSettled: (res) => {
         if (res?.status === 200) {
            router.refresh();
            setShowSuccessModal(true);
         }
         setButtonLoading(false);
      },
   });

   const onSubmit = () => {
      updateDataMutation();
      setButtonLoading(true);
   };

   return (
      <form
         className="flex w-full flex-col items-center"
         onSubmit={handleSubmit(onSubmit)}
      >
         {showSuccessModal && (
            <Modal closeModalFunction={() => setShowSuccessModal(false)}>
               <p>Your data has been changed</p>
            </Modal>
         )}
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
                  className={
                     !errors.email && !response?.message?.startsWith("Email")
                        ? "mb-[23px]"
                        : ""
                  }
               />
               {response?.message?.startsWith("Email") && (
                  <ErrorMessage>Email already taken</ErrorMessage>
               )}
               {errors.email && (
                  <ErrorMessage>{errors.email.message}</ErrorMessage>
               )}
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
                  className={
                     !errors.username &&
                     !response?.message?.startsWith("Username")
                        ? "mb-[23px]"
                        : ""
                  }
               />
               {response?.message?.startsWith("Username") && (
                  <ErrorMessage>Username already taken</ErrorMessage>
               )}
               {errors.username && (
                  <ErrorMessage>{errors.username.message}</ErrorMessage>
               )}
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
                  className={!errors.firstName ? "mb-[23px]" : ""}
               />
               {errors.firstName && (
                  <ErrorMessage>{errors.firstName.message}</ErrorMessage>
               )}
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
                  className={!errors.lastName ? "mb-[23px]" : ""}
               />
               {errors.lastName && (
                  <ErrorMessage>{errors.lastName.message}</ErrorMessage>
               )}
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="currentPassword">
                  Current password:
               </label>
               <TextInput
                  id="currentPassword"
                  type="password"
                  register={register}
                  name="currentPassword"
                  disabled={disabled}
                  className={!errors.currentPassword ? "mb-[23px]" : ""}
               />
               {errors.currentPassword && (
                  <ErrorMessage>{errors.currentPassword.message}</ErrorMessage>
               )}
               {response?.message?.startsWith("Wrong") && (
                  <ErrorMessage>Wrong password</ErrorMessage>
               )}
            </div>
            <Button
               type="submit"
               variant="primary"
               label="Change your data"
               className="w-full self-center md:w-3/4"
               disabled={disabled}
               isLoading={buttonLoading}
            />
         </div>
      </form>
   );
};

export default ChangeDataForm;
