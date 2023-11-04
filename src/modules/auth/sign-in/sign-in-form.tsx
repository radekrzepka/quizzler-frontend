"use client";

import Button from "@/components/ui/button";
import LabelInput from "@/components/ui/label-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { signInFormSchema, type SignInForm } from "./sign-in-form-schema";

const SignInForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SignInForm>({
      resolver: zodResolver(signInFormSchema),
   });

   const router = useRouter();
   const [buttonLoading, setButtonLoading] = useState(false);

   const { mutate: loginUserMutation } = useMutation({
      mutationFn: async (data: SignInForm) => {
         const { email, password } = data;

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

         return res.json();
      },

      onSettled: (res) => {
         if (res?.status === 200) {
            router.refresh();
            router.push("/dashboard");
            setCookie("JWT", `Bearer ${res.data}`);
            toast.success("Logged in");
         } else if (res?.status === 409) {
            toast.error("There is no account set up with the given email");
         } else if (res?.status === 401) {
            toast.error("Wrong credentials");
         } else {
            toast.error(
               "There is something wrong with server. Try again later.",
            );
         }
         setButtonLoading(false);
      },
   });

   const onSubmit: SubmitHandler<SignInForm> = (data) => {
      setButtonLoading(true);
      loginUserMutation(data);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-3/4 rounded-md bg-text p-6 text-background xl:w-1/3"
      >
         <h2 className="text-center text-4xl font-bold">Log in</h2>
         <h3 className="text-center font-bold">
            Don&apos;t have an account ?{" "}
            <Link className="underline" href="/auth/sign-up">
               Sign up
            </Link>
         </h3>
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
         <div className="flex flex-col justify-between whitespace-nowrap sm:flex-row sm:gap-3">
            <Button
               type="submit"
               label="Sign in"
               variant="primary"
               onClick={handleSubmit(onSubmit)}
               className="mb-3 w-full md:mb-0"
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
