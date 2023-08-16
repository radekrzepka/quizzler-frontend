"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import PenImage from "./../../../assets/pen.svg";
import Image from "next/image";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   ChangePasswordForm,
   changePasswordFormSchema,
} from "./change-password-form-schema";
import { getCookie, deleteCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";
import ErrorMessage from "@/components/ui/error-message";

const ChangePasswordForm: FC = () => {
   const [disabled, setDisabled] = useState(true);
   const [buttonLoading, setButtonLoading] = useState(false);
   const [showSuccessModal, setShowSuccessModal] = useState(false);

   const router = useRouter();
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<ChangePasswordForm>({
      resolver: zodResolver(changePasswordFormSchema),
   });

   const { oldPassword, newPassword, repeatedNewPassword } = getValues();

   const { mutate: updatePasswordMutation, data: response } = useMutation({
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
               password: newPassword,
               currentPassword: oldPassword,
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
      updatePasswordMutation();
      console.log("test");

      setButtonLoading(true);
   };

   const logOut = () => {
      deleteCookie("JWT");
      router.push("/auth/sign-in");
   };

   return (
      <form
         className="flex w-full flex-col items-center"
         onSubmit={handleSubmit(onSubmit)}
      >
         {showSuccessModal && (
            <Modal closeModalFunction={logOut}>
               <p className="mb-3">
                  Your data has been changed. Please log in again.
               </p>
               <Button type="button" variant="primary" onClick={logOut}>
                  Log in
               </Button>
            </Modal>
         )}
         <h2 className="mt-2 text-3xl font-bold">Change your password</h2>
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
            Edit your password
         </button>
         <div className="flex w-3/4 flex-col gap-4">
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="oldPassword">
                  Old password:
               </label>
               <TextInput
                  id="oldPassword"
                  type="password"
                  register={register}
                  name="oldPassword"
                  disabled={disabled}
                  className={!errors.oldPassword ? "mb-[23px]" : ""}
               />
               {errors.oldPassword && (
                  <ErrorMessage>{errors.oldPassword?.message}</ErrorMessage>
               )}
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="newPassword">
                  New password:
               </label>
               <TextInput
                  id="newPassword"
                  type="password"
                  register={register}
                  name="newPassword"
                  disabled={disabled}
                  className={!errors.newPassword ? "mb-[23px]" : ""}
               />
               {errors.newPassword && (
                  <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
               )}
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="repeatedNewPassword">
                  Repeat new password:
               </label>
               <TextInput
                  id="repeatedNewPassword"
                  type="password"
                  register={register}
                  name="repeatedNewPassword"
                  disabled={disabled}
                  className={!errors.repeatedNewPassword ? "mb-[23px]" : ""}
               />
               {errors.repeatedNewPassword && (
                  <ErrorMessage>
                     {errors.repeatedNewPassword?.message}
                  </ErrorMessage>
               )}
               {response?.message.startsWith("Wrong") && (
                  <ErrorMessage>
                     Please provide correct old password
                  </ErrorMessage>
               )}
            </div>
            <Button
               type="submit"
               variant="primary"
               label="Change your password"
               className="w-full self-center md:w-3/4"
               disabled={disabled}
               isLoading={buttonLoading}
            />
         </div>
      </form>
   );
};

export default ChangePasswordForm;
