"use client";

import { FC } from "react";
import LogoText from "@/components/ui/logo-text";
import Link from "next/link";
import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface DashboardNavigationProps {}

const DashboardNavigation: FC<DashboardNavigationProps> = ({}) => {
   const router = useRouter();

   return (
      <nav className="m-6 flex flex-col items-center justify-between gap-4 rounded-xl bg-text p-4 text-background xl:flex-row">
         <LogoText variant="dark">
            <Link href="/dashboard">Quizzler</Link>
         </LogoText>
         <ul className="flex gap-6 text-center">
            <li>
               <Link href="/">New lesson</Link>
            </li>
            <li>
               <Link href="/">New quiz</Link>
            </li>

            <li>
               <Link href="/">New lesson</Link>
            </li>
            <li>
               <Link href="/">New flashcard</Link>
            </li>
         </ul>
         <div className="grid place-items-center lg:block">
            <Button
               label="My profile"
               variant="black"
               type="button"
               onClick={() => router.push("/")}
               className="mb-3 lg:mb-0 lg:mr-3"
            />
            <Button
               label="Sign out"
               variant="accent"
               type="button"
               onClick={() => signOut()}
            />
         </div>
      </nav>
   );
};

export default DashboardNavigation;
