"use client";

import Button from "@/components/ui/button";
import LogoText from "@/components/ui/logo-text";
import Link from "next/link";
import { useState } from "react";

const HomeNavigation = () => {
   const [signInButtonLoading, setSignInButtonLoading] = useState(false);
   const [signUpButtonLoading, setSignUpButtonLoading] = useState(false);

   return (
      <header>
         <ul className="shadow-shadow flex flex-col items-center gap-2 rounded-xl border-[1px] border-borderContainer p-3 shadow-containerShadow md:flex-row md:justify-between">
            <li>
               <Link href="/">
                  <LogoText>Quizzler</LogoText>
               </Link>
            </li>
            <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:justify-end">
               <li className="w-full md:w-auto">
                  <Link href="/auth/sign-in">
                     <Button
                        onClick={() => setSignInButtonLoading(true)}
                        isLoading={signInButtonLoading}
                        className="w-full"
                     >
                        Sign In
                     </Button>
                  </Link>
               </li>
               <li className="w-full md:w-auto">
                  <Link href="/auth/sign-up">
                     <Button
                        onClick={() => setSignUpButtonLoading(true)}
                        variant="white"
                        isLoading={signUpButtonLoading}
                        className="w-full"
                     >
                        Sign up
                     </Button>
                  </Link>
               </li>
            </div>
         </ul>
      </header>
   );
};

export default HomeNavigation;
