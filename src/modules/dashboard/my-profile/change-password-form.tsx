"use client";

import { FC, useState } from "react";
import { UserInfo } from "@/types/user-info";
import { useForm } from "react-hook-form";
import PenImage from "./../../../assets/pen.svg";
import Image from "next/image";
import Button from "@/components/ui/button";
import TextInput from "@/components/ui/text-input";

interface ChangePasswordFormProps {
   profile: UserInfo;
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ profile }) => {
   const [disabled, setDisabled] = useState(false);
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
      watch,
   } = useForm();
   return (
      <form className="flex w-full flex-col items-center">
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
                  type="text"
                  register={register}
                  name="oldPassword"
                  disabled={disabled}
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="newPassword">
                  New password:
               </label>
               <TextInput
                  id="newPassword"
                  type="text"
                  register={register}
                  name="newPassword"
                  disabled={disabled}
               />
            </div>
            <div className="flex flex-col">
               <label className="mr-3" htmlFor="repeatNewPassword">
                  Repeat new password:
               </label>
               <TextInput
                  id="repeatNewPassword"
                  type="text"
                  register={register}
                  name="repeatNewPassword"
                  disabled={disabled}
               />
            </div>
            <Button
               type="button"
               variant="primary"
               label="Change your password"
               className="w-fit self-center"
            />
         </div>
      </form>
   );
};

export default ChangePasswordForm;
