"use client";

import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignInForm, signInFormSchema } from "./sign-in-form-schema";
import TextInput from "@/components/ui/text-input";
import Button from "@/components/ui/button";
import LabelInputContainer from "@/components/auth/sign-up/label-input-container";
import ErrorMessage from "@/components/ui/error-message";
import { useRouter } from "next/navigation";

const SignInForm = () => {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<SignInForm>({
      resolver: zodResolver(signInFormSchema),
   });

   const router = useRouter();

   const onSubmit: SubmitHandler<SignInForm> = (data) => console.log(data);
   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className="rounded-md bg-[#f1f1f1] p-6 text-background md:p-10"
      >
         <LabelInputContainer>
            <label htmlFor="email">Enter email: </label>
            <TextInput
               id="email"
               type="email"
               register={register}
               name="email"
               className={!errors.email ? "mb-7" : ""}
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
               className={!errors.password ? "mb-7" : ""}
            />
            {errors.password && (
               <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
         </LabelInputContainer>
         <div className="flex flex-col justify-between md:flex-row md:gap-3">
            <Button
               type="submit"
               label="Sign in"
               variant="primary"
               onClick={handleSubmit(onSubmit)}
               className="mb-3 md:mb-0"
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
