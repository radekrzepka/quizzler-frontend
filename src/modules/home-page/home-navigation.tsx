"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import LogoText from "@/components/ui/logo-text";

const HomeNavigation = () => {
   const router = useRouter();

   return (
      <header>
         <ul className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
            <li>
               <LogoText>
                  <Link href="/">Quizzler</Link>
               </LogoText>
            </li>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
               <li>
                  <Button
                     label="Sign In"
                     type="button"
                     onClick={() => signIn()}
                     variant="primary"
                  />
               </li>
               <li>
                  <Button
                     label="Sign Up"
                     type="button"
                     onClick={() => router.push("/auth/sign-up")}
                     variant="white"
                  />
                  {/* <Link href="/auth/sign-up">Sign up</Link> */}
               </li>
            </div>
         </ul>
      </header>
   );
};

export default HomeNavigation;
