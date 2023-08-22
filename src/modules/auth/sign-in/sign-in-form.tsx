"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInForm, signInFormSchema } from "./sign-in-form-schema";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Link from "next/link";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import LabelInput from "@/components/ui/label-input";

const SignInForm = () => {
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<SignInForm>({
      resolver: zodResolver(signInFormSchema),
   });

   const router = useRouter();
   const [buttonLoading, setButtonLoading] = useState(false);

   const { email, password } = getValues();

   const { mutate: loginUserMutation } = useMutation({
      mutationFn: async () => {
         const res = await fetch(`/api/user/login`, {
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
               email,
               password,
            }),
         });

         const data = await res.json();

         return data;
      },

      onSettled: (res) => {
         if (res?.status === 200) {
            router.refresh();
            router.push("/dashboard");
            setCookie("JWT", `Bearer ${res.token}`);
            toast.success("Logged in");
         } else if (res?.status === 409) {
            toast.error("There is no account set up with the given email");
         } else if (res?.status === 400) {
            toast.error("Wrong credentials");
         } else {
            toast.error(
               "There is something wrong with server. Try again later.",
            );
         }
         setButtonLoading(false);
      },
   });

   const onSubmit: SubmitHandler<SignInForm> = () => {
      setButtonLoading(true);
      loginUserMutation();
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-3/4 rounded-md bg-text p-6 text-background md:w-auto md:p-10"
      >
         <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-1">
            <LabelInput
               label="Enter email:"
               inputType="email"
               register={register}
               name="email"
               errors={errors}
            />
         </div>
         <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-1">
            <LabelInput
               label="Enter password: "
               inputType="password"
               register={register}
               name="password"
               errors={errors}
            />
         </div>
         <div className="flex flex-col justify-between whitespace-nowrap md:flex-row md:gap-3">
            <Button
               type="submit"
               label="Sign in"
               variant="primary"
               onClick={handleSubmit(onSubmit)}
               className="mb-3 md:mb-0"
               isLoading={buttonLoading}
            />
            <Link href="/" className="w-full">
               <Button
                  type="button"
                  label="Go back"
                  variant="black"
                  className="w-full"
               />
            </Link>
         </div>
      </form>
   );
};

export default SignInForm;
