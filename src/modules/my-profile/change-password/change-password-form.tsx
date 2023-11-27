"use client";

import Button from "@/components/ui/button";
import LabelInput from "@/components/ui/label-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
   ChangePasswordForm,
   changePasswordFormSchema,
} from "./change-password-form-schema";

interface ApiResponse {
   message: string;
   status: number;
}

const ChangePasswordForm = () => {
   const [disabled, setDisabled] = useState(true);
   const [buttonLoading, setButtonLoading] = useState(false);

   const router = useRouter();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ChangePasswordForm>({
      resolver: zodResolver(changePasswordFormSchema),
   });

   const { mutate: updatePasswordMutation } = useMutation({
      mutationFn: async ({ newPassword, oldPassword }: ChangePasswordForm) => {
         const JWT = getCookie("JWT") as string;

         const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
            {
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
            }
         );
         const responseData = (await res.json()) as string;
         const apiResponse: ApiResponse = {
            status: res.status,
            message: responseData,
         };
         return apiResponse;
      },

      onSettled: (res: ApiResponse | undefined) => {
         if (res?.status === 200) {
            setDisabled(true);
            router.refresh();
            toast.success("Password has been changed");
         } else {
            toast.error(res?.message as string);
         }

         setButtonLoading(false);
      },
   });

   const onSubmit: SubmitHandler<ChangePasswordForm> = data => {
      updatePasswordMutation(data);
      setButtonLoading(true);
   };

   return (
      <form
         className="flex w-full flex-col items-center"
         onSubmit={handleSubmit(onSubmit)}
      >
         <h2 className="mt-2 text-3xl font-bold">Change your password</h2>
         <button
            onClick={() => setDisabled(prevState => !prevState)}
            type="button"
            className="mr-6 self-end"
         >
            <Image
               className="mr-1 inline"
               src="/icons/pen-icon.svg"
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
               className="w-full self-center md:w-3/4"
               disabled={disabled}
               isLoading={buttonLoading}
            >
               Change your password
            </Button>
         </div>
      </form>
   );
};

export default ChangePasswordForm;
