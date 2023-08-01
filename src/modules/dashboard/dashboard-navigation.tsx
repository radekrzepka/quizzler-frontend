"use client";

import { FC } from "react";
import LogoText from "@/components/ui/logo-text";
import Link from "next/link";
import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardNavigationLink from "@/components/dashboard/dashboard-navigation-link";

interface DashboardNavigationProps {}

const DashboardNavigation: FC<DashboardNavigationProps> = ({}) => {
   const router = useRouter();

   return (
      <nav className="shadow-shadow my-6 flex flex-col items-center justify-between gap-4 rounded-xl border-[1px] border-borderContainer bg-background p-4 text-text xl:flex-row">
         <LogoText variant="light">
            <Link href="/dashboard">Quizzler</Link>
         </LogoText>
         <ul className="flex gap-1 text-center md:gap-6">
            <li className="grid place-items-center">
               <DashboardNavigationLink
                  path="/dashboard/new-question"
                  label="New question"
               />
            </li>
            <li className="grid place-items-center">
               <DashboardNavigationLink
                  path="/dashboard/new-quiz"
                  label="New quiz"
               />
            </li>
            <li className="grid place-items-center">
               <DashboardNavigationLink
                  path="/dashboard/new-flashcard"
                  label="New flashcard"
               />
            </li>
            <li className="grid place-items-center">
               <DashboardNavigationLink
                  path="/dashboard/new-lesson"
                  label="New lesson"
               />
            </li>
         </ul>
         <div className="grid place-items-center lg:block">
            <Button
               label="My profile"
               variant="white"
               type="button"
               onClick={() => router.push("/dashboard/my-profile")}
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
