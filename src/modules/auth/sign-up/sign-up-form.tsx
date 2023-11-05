"use client";

import Button from "@/components/ui/button";
import LabelInput from "@/components/ui/label-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signUpFormSchema, type SignUpForm } from "./sign-up-form-schema";

const SignUpForm = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<SignUpForm>({
      resolver: zodResolver(signUpFormSchema),
   });

   const router = useRouter();
   const [buttonLoading, setButtonLoading] = useState(false);

   const { mutate: registerUserMutation } = useMutation({
      mutationFn: async (data: SignUpForm) => {
         const { email, username, password, firstName, lastName } = data;

         const res = await fetch(`/api/user/register`, {
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
               email,
               username,
               password,
               firstName,
               lastName,
            }),
         });

         return res.json();
      },

      onSettled: (res) => {
         if (res?.status === 201) {
            router.push("/auth/sign-in");
            toast.success("Created account, you can log in.");
         } else if (res?.status !== 409)
            toast.error(
               "There is something wrong with server. Try again later.",
            );

         setButtonLoading(false);

         if (res?.data.startsWith("Email")) {
            toast.error("Email already taken");
         }

         if (res?.data.startsWith("Username")) {
            toast.error("Username already taken");
         }
      },
   });

   const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
      setButtonLoading(true);
      registerUserMutation(data);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="w-4/5 rounded-md bg-text p-6 text-background md:w-3/5 xl:w-2/5 xl:p-10"
      >
         <h2 className="text-center text-4xl font-bold">Create an account</h2>
         <h3 className="text-center font-bold">
            Already have an account?{" "}
            <Link className="underline" href="/auth/sign-in">
               Sign in
            </Link>
         </h3>
         <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-1">
            <LabelInput
               label="Enter email: *"
               inputType="email"
               register={register}
               name="email"
               errors={errors}
            />
         </div>
         <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-1">
            <LabelInput
               label="Enter password: *"
               inputType="password"
               register={register}
               name="password"
               errors={errors}
            />
         </div>
         <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-1">
            <LabelInput
               label="Repeat password: *"
               inputType="password"
               register={register}
               name="repeatedPassword"
               errors={errors}
            />
         </div>
         <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-1">
            <LabelInput
               label="Enter username: *"
               inputType="text"
               register={register}
               name="username"
               errors={errors}
            />
         </div>
         <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-1">
            <LabelInput
               label="Enter first name:"
               inputType="text"
               register={register}
               name="firstName"
               errors={errors}
            />
         </div>
         <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-1">
            <LabelInput
               label="Enter last name:"
               inputType="text"
               register={register}
               name="lastName"
               errors={errors}
            />
         </div>

         <div className="flex flex-col justify-between whitespace-nowrap md:flex-row md:gap-3">
            <Button
               type="submit"
               label="Sign up"
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

export default SignUpForm;
