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
import Modal from "@/components/ui/modal";
import Link from "next/link";
import { toast } from "react-hot-toast";

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
   const [openErrorModal, setOpenErrorModal] = useState(false);

   const { mutate: registerUserMutation, data: response } = useMutation({
      mutationFn: async () => {
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

         const data = await res.json();
         return { status: res.status, data };
      },

      onSettled: (res) => {
         if (res?.status === 201) {
            router.push("/auth/sign-in");
            toast.success("Created account, you can log in.");
         } else if (res?.status === 409) {
            setButtonLoading(false);
         } else {
            setOpenErrorModal(true);
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
         {openErrorModal && (
            <Modal
               closeModalFunction={() => {
                  setOpenErrorModal(false);
                  setButtonLoading(false);
               }}
            >
               <div className="text-center">
                  <p className="mb-3">
                     We apologize for the inconvenience, but it seems that
                     something is not quite right with our server at the moment.
                     We are aware of the issue and are actively working to
                     resolve it as quickly as possible.
                  </p>
                  <p className="mb-3">
                     Please bear with us while we fix the problem. We appreciate
                     your patience and understanding.
                  </p>
                  <Button
                     type="button"
                     variant="primary"
                     label="Close"
                     onClick={() => {
                        setOpenErrorModal(false);
                        setButtonLoading(false);
                     }}
                  />
               </div>
            </Modal>
         )}
         <LabelInputContainer>
            <label htmlFor="email">Enter email: * </label>
            <TextInput
               id="email"
               type="email"
               register={register}
               name="email"
               className={
                  !errors.email && !response?.data.message.startsWith("Email")
                     ? "mb-[23px]"
                     : ""
               }
            />
            {response?.data.message.startsWith("Email") && (
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
                  !errors.username &&
                  !response?.data.message.startsWith("Username")
                     ? "mb-[23px]"
                     : ""
               }
            />
            {response?.data.message.startsWith("Username") && (
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

         <div className="flex flex-col justify-between whitespace-nowrap md:flex-row md:gap-3">
            <Button
               type="submit"
               label="Sign up"
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

export default SignUpForm;
