"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInForm, signInFormSchema } from "./sign-in-form-schema";
import TextInput from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import LabelInputContainer from "@/components/auth/sign-up/label-input-container";
import ErrorMessage from "@/components/ui/error-message";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

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

   const { usernameOrEmail, password } = getValues();

   const { mutate: loginUserMutation, data: response } = useMutation({
      mutationFn: () => {
         return fetch(`/api/login-user`, {
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
               usernameOrEmail,
               password,
            }),
         });
      },

      onSettled: (res) => {
         if (res?.status === 200) router.push("/dashboard");
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
         className="rounded-md bg-[#f1f1f1] p-6 text-background md:p-10"
      >
         <LabelInputContainer>
            <label htmlFor="usernameOrEmail">Enter email/username: </label>
            <TextInput
               id="usernameOrEmail"
               type="text"
               register={register}
               name="usernameOrEmail"
               className={!errors.usernameOrEmail ? "mb-7" : ""}
            />
            {errors.usernameOrEmail && (
               <ErrorMessage>{errors.usernameOrEmail.message}</ErrorMessage>
            )}
         </LabelInputContainer>
         <LabelInputContainer>
            <label htmlFor="password">Enter password: </label>
            <TextInput
               id="password"
               type="password"
               register={register}
               name="password"
               className={
                  !errors.password && !(response?.status === 403) ? "mb-7" : ""
               }
            />
            {errors.password && (
               <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            {response?.status === 403 && (
               <ErrorMessage>Incorrect login or password</ErrorMessage>
            )}
         </LabelInputContainer>
         <div className="flex flex-col justify-between md:flex-row md:gap-3">
            <Button
               type="submit"
               label="Sign in"
               variant="primary"
               onClick={handleSubmit(onSubmit)}
               className="mb-3 md:mb-0"
               isLoading={buttonLoading}
            />
            <Button
               type="button"
               label="Go back"
               variant="black"
               onClick={() => router.push("/")}
            />
         </div>
      </form>
   );
};

export default SignInForm;
