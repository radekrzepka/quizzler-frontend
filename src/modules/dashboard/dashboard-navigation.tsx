"use client";

import { FC } from "react";
import LogoText from "@/components/ui/logo-text";
import Link from "next/link";
import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface DashboardNavigationProps {}

const DashboardNavigation: FC<DashboardNavigationProps> = ({}) => {
   return (
      <nav className="m-6 flex items-center justify-between rounded-xl bg-text p-4 text-background">
         <LogoText variant="dark">
            <Link href="/dashboard">Quizzler</Link>
         </LogoText>
         <ul className="flex gap-6">
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
         <Button
            label="Sign out"
            variant="accent"
            type="button"
            onClick={() => signOut()}
         />
      </nav>
   );
};

export default DashboardNavigation;
