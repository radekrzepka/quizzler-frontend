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
                        label="Sign In"
                        type="button"
                        onClick={() => setSignInButtonLoading(true)}
                        variant="primary"
                        isLoading={signInButtonLoading}
                        className="w-full"
                     />
                  </Link>
               </li>
               <li className="w-full md:w-auto">
                  <Link href="/auth/sign-up">
                     <Button
                        label="Sign Up"
                        type="button"
                        onClick={() => setSignUpButtonLoading(true)}
                        variant="white"
                        isLoading={signUpButtonLoading}
                        className="w-full"
                     />
                  </Link>
               </li>
            </div>
         </ul>
      </header>
   );
};

export default HomeNavigation;
