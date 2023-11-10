"use client";

import Button from "@/components/ui/button";
import LabelInput from "@/components/ui/label-input";
import type { UserInfo } from "@/types/user-info";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
   ChangeDataForm,
   changeDataFormSchema,
} from "./change-data-form-schema";

interface ChangeDataFormProps {
   profile: UserInfo;
}

interface ApiResponse {
   data:
      | {
           message: string;
        }
      | string;
   status: number;
}

const ChangeDataForm = ({ profile }: ChangeDataFormProps) => {
   const [disabled, setDisabled] = useState(true);
   const [buttonLoading, setButtonLoading] = useState(false);
   const router = useRouter();
   const queryClient = useQueryClient();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<ChangeDataForm>({
      defaultValues: {
         email: profile.email,
         firstName: profile.firstName,
         lastName: profile.lastName,
         username: profile.username,
         currentPassword: "",
      },
      resolver: zodResolver(changeDataFormSchema),
   });

   const { mutate: updateDataMutation } = useMutation({
      mutationFn: async (data: ChangeDataForm) => {
         const { email, firstName, lastName, username, currentPassword } = data;

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

         return res.json();
      },

      onSettled: async (res: ApiResponse | undefined) => {
         if (!res) return;

         if (res?.status === 200) {
            router.refresh();
            toast.success("Data has been changed");
            await queryClient.invalidateQueries({ queryKey: ["profileData"] });
            setDisabled(true);
         } else {
            toast.error(res.data as string);
         }

         setButtonLoading(false);

         if (typeof res.data !== "string") {
            if (res?.data.message.startsWith("Email")) {
               toast.error("Email already taken");
            }

            if (res?.data.message.startsWith("Username")) {
               toast.error("Username already taken");
            }
         }
      },
   });

   const onSubmit: SubmitHandler<ChangeDataForm> = data => {
      updateDataMutation(data);
      setButtonLoading(true);
   };

   return (
      <form
         className="flex w-full flex-col items-center"
         onSubmit={handleSubmit(onSubmit)}
      >
         <h2 className="mt-2 text-3xl font-bold">Profile data</h2>
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
            Edit your data
         </button>
         <div className="flex w-3/4 flex-col gap-4">
            <div className="flex flex-col">
               <LabelInput
                  label="Your email: "
                  inputType="email"
                  disabled={disabled}
                  register={register}
                  name="email"
                  errors={errors}
               />
            </div>
            <div className="flex flex-col">
               <LabelInput
                  label="Your username: "
                  inputType="text"
                  disabled={disabled}
                  register={register}
                  name="username"
                  errors={errors}
               />
            </div>
            <div className="flex flex-col">
               <LabelInput
                  label="Your first name: "
                  inputType="text"
                  disabled={disabled}
                  register={register}
                  name="firstName"
                  errors={errors}
               />
            </div>
            <div className="flex flex-col">
               <LabelInput
                  label="Your last name: "
                  inputType="text"
                  disabled={disabled}
                  register={register}
                  name="lastName"
                  errors={errors}
               />
            </div>
            <div className="flex flex-col">
               <LabelInput
                  label="Provide your password to change data: "
                  inputType="password"
                  disabled={disabled}
                  register={register}
                  name="currentPassword"
                  errors={errors}
               />
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
