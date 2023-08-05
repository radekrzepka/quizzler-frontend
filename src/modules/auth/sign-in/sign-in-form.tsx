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
import Modal from "@/components/ui/modal";

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
   const [openErrorModal, setOpenErrorModal] = useState(false);

   const { email, password } = getValues();

   const { mutate: loginUserMutation, data: response } = useMutation({
      mutationFn: () => {
         return fetch(`/api/user/login`, {
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
      },

      onSettled: (res) => {
         if (res?.status === 200) router.push("/dashboard");
         else if (res?.status !== 409 && res?.status !== 400) {
            setOpenErrorModal(true);
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
            <label htmlFor="email">Enter email: </label>
            <TextInput
               id="email"
               type="text"
               register={register}
               name="email"
               className={!errors.email ? "mb-[23px]" : ""}
            />
            {errors.email && (
               <ErrorMessage>{errors.email.message}</ErrorMessage>
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
                  !errors.password &&
                  !(response?.status === 400 || response?.status === 409)
                     ? "mb-[23px]"
                     : ""
               }
            />
            {errors.password && (
               <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
            {response?.status === 400 && (
               <ErrorMessage> Wrong credentials</ErrorMessage>
            )}
            {response?.status === 409 && (
               <ErrorMessage>
                  There is no account set up with the given email
               </ErrorMessage>
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
