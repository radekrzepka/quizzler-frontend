"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import PenImage from "./../../../assets/icons/pen-icon.svg";
import Image from "next/image";
import Button from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   ChangePasswordForm,
   changePasswordFormSchema,
} from "./change-password-form-schema";
import { getCookie, deleteCookie } from "cookies-next";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import LabelInput from "@/components/ui/label-input";

const ChangePasswordForm: FC = () => {
   const [disabled, setDisabled] = useState(true);
   const [buttonLoading, setButtonLoading] = useState(false);

   const router = useRouter();
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<ChangePasswordForm>({
      resolver: zodResolver(changePasswordFormSchema),
   });

   const { oldPassword, newPassword } = getValues();

   const { mutate: updatePasswordMutation } = useMutation({
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

         return res.json();
      },

      onSettled: (res) => {
         if (res?.status === 200) {
            setDisabled(true);
            router.refresh();
            toast.success("Password has been changed");
         } else {
            toast.error(res.message);
         }

         setButtonLoading(false);
      },
   });

   const onSubmit = () => {
      updatePasswordMutation();
      setButtonLoading(true);
   };

   return (
      <form
         className="flex w-full flex-col items-center"
         onSubmit={handleSubmit(onSubmit)}
      >
         <h2 className="mt-2 text-3xl font-bold">Change your password</h2>
         <button
            onClick={() => setDisabled((prevState) => !prevState)}
            type="button"
            className="mr-6 self-end"
         >
            <Image
               className="mr-1 inline"
               src={PenImage}
               alt="Icon of pen"
               width={20}
               height={20}
            />
            Edit your password
         </button>
         <div className="flex w-3/4 flex-col gap-4">
            <div className="flex flex-col">
               <LabelInput
                  label="Old password:"
                  inputType="password"
                  disabled={disabled}
                  register={register}
                  name="oldPassword"
                  errors={errors}
               />
            </div>
            <div className="flex flex-col">
               <LabelInput
                  label="New password:"
                  inputType="password"
                  disabled={disabled}
                  register={register}
                  name="newPassword"
                  errors={errors}
               />
            </div>
            <div className="flex flex-col">
               <LabelInput
                  label="Repeat new password:"
                  inputType="password"
                  disabled={disabled}
                  register={register}
                  name="repeatedNewPassword"
                  errors={errors}
               />
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
