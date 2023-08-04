"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignUpForm, signUpFormSchema } from "./sign-up-form-schema";
import TextInput from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import LabelInputContainer from "@/components/auth/sign-up/label-input-container";
import ErrorMessage from "@/components/ui/error-message";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = () => {
   const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
   } = useForm<SignUpForm>({
      resolver: zodResolver(signUpFormSchema),
   });

   const router = useRouter();
   const { email, username, password, firstName, lastName } = getValues();
   const [buttonLoading, setButtonLoading] = useState(false);

   const { mutate: registerUserMutation, data: response } = useMutation({
      mutationFn: () => {
         return fetch(`/api/register-user`, {
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
      },

      onSettled: (res) => {
         if (res?.status === 201) router.push("/auth/sign-up-confirmation");
         if (res?.status === 409) {
            setButtonLoading(false);
         }
      },
   });

   const onSubmit: SubmitHandler<SignUpForm> = async () => {
      setButtonLoading(true);
      registerUserMutation();
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="rounded-md bg-[#f1f1f1] p-6 text-background md:p-10"
      >
         <LabelInputContainer>
            <label htmlFor="email">Enter email: * </label>
            <TextInput
               id="email"
               type="email"
               register={register}
               name="email"
               className={
                  !errors.email && !(response?.statusText === "email")
                     ? "mb-[23px]"
                     : ""
               }
            />
            {response?.statusText === "email" && (
               <ErrorMessage>Email already taken</ErrorMessage>
            )}
            {errors.email && (
               <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
         </LabelInputContainer>
         <LabelInputContainer>
            <label htmlFor="password">Enter password: * </label>
            <TextInput
               id="password"
               type="password"
               register={register}
               name="password"
               className={!errors.password ? "mb-[23px]" : ""}
            />
            {errors.password && (
               <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
         </LabelInputContainer>
         <LabelInputContainer>
            <label htmlFor="repeatedPassword">Repeat password: * </label>
            <TextInput
               id="repeatedPassword"
               type="password"
               register={register}
               name="repeatedPassword"
               className={!errors.repeatedPassword ? "mb-[23px]" : ""}
            />
            {errors.repeatedPassword && (
               <ErrorMessage>{errors.repeatedPassword.message}</ErrorMessage>
            )}
         </LabelInputContainer>
         <LabelInputContainer>
            <label htmlFor="username">Enter username: * </label>
            <TextInput
               id="username"
               type="text"
               register={register}
               name="username"
               className={
                  !errors.username && !(response?.statusText === "username")
                     ? "mb-[23px]"
                     : ""
               }
            />
            {response?.statusText === "username" && (
               <ErrorMessage>Username already taken</ErrorMessage>
            )}
            {errors.username && (
               <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
         </LabelInputContainer>
         <LabelInputContainer>
            <label htmlFor="firstName">Enter first name: </label>
            <TextInput
               id="firstName"
               type="text"
               register={register}
               name="firstName"
               className={!errors.firstName ? "mb-[23px]" : ""}
            />
            {errors.firstName && (
               <ErrorMessage>{errors.firstName.message}</ErrorMessage>
            )}
         </LabelInputContainer>
         <LabelInputContainer>
            <label htmlFor="lastName">Enter last name: </label>
            <TextInput
               id="lastName"
               type="text"
               register={register}
               name="lastName"
               className={!errors.lastName ? "mb-[23px]" : ""}
            />
            {errors.lastName && (
               <ErrorMessage>{errors.lastName.message}</ErrorMessage>
            )}
         </LabelInputContainer>

         <div className="flex flex-col justify-between md:flex-row md:gap-3">
            <Button
               type="submit"
               label="Sign up"
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

export default SignUpForm;
