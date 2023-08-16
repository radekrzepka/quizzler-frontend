"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Link from "next/link";

const SignUpConfirmation: FC = () => {
   const router = useRouter();

   return (
      <div className="grid h-full min-h-screen w-full place-items-center">
         <div className="grid place-items-center rounded-md bg-[#f1f1f1] p-6 text-background md:p-10">
            <p className="mb-4">
               You have successfully created an account in quizzler. You can now
               sign in.
            </p>
            <Link href="/auth/sign-in">
               <Button type="button" label="Sign in" variant="primary" />
            </Link>
         </div>
      </div>
   );
};

export default SignUpConfirmation;
