"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

interface SignUpConfirmationProps {}

const SignUpConfirmation: FC<SignUpConfirmationProps> = ({}) => {
   const router = useRouter();

   return (
      <div className="grid h-full min-h-screen w-full place-items-center">
         <div className="grid place-items-center rounded-md bg-[#f1f1f1] p-6 text-background md:p-10">
            <p className="mb-4">
               You have successfully created an account in quizzler. You can now
               sign in.
            </p>
            <Button
               type="button"
               label="Sign in"
               onClick={() => router.push("/auth/sign-in")}
               variant="primary"
            />
         </div>
      </div>
   );
};

export default SignUpConfirmation;
