"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import LogoText from "@/components/ui/logo-text";
import { useState } from "react";

const HomeNavigation = () => {
   const [signInButtonLoading, setSignInButtonLoading] = useState(false);
   const [signUpButtonLoading, setSignUpButtonLoading] = useState(false);
   const router = useRouter();

   return (
      <header>
         <ul className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
            <li>
               <LogoText>
                  <Link href="/">Quizzler</Link>
               </LogoText>
            </li>
            <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-end">
               <li className="w-full md:w-auto">
                  <Button
                     label="Sign In"
                     type="button"
                     onClick={() => {
                        setSignInButtonLoading(true);
                        signIn();
                     }}
                     variant="primary"
                     isLoading={signInButtonLoading}
                     className="w-full"
                  />
               </li>
               <li className="w-full md:w-auto">
                  <Button
                     label="Sign Up"
                     type="button"
                     onClick={() => {
                        setSignUpButtonLoading(true);
                        router.push("/auth/sign-up");
                     }}
                     variant="white"
                     isLoading={signUpButtonLoading}
                     className="w-full"
                  />
               </li>
            </div>
         </ul>
      </header>
   );
};

export default HomeNavigation;
