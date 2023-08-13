"use client";

import { FC, useState } from "react";
import LogoText from "@/components/ui/logo-text";
import Link from "next/link";
import Button from "@/components/ui/button";
import DashboardNavigationLink from "@/components/dashboard/dashboard-navigation-link";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const DashboardNavigation: FC = () => {
   const [signOutClicked, setSignOutClicked] = useState(false);
   const router = useRouter();

   return (
      <nav className="shadow-shadow my-6 flex flex-col items-center justify-between gap-4 rounded-xl border-[1px] border-borderContainer bg-background p-4 text-text shadow-containerShadow xl:flex-row">
         <button onClick={() => router.push("/dashboard")}>
            <LogoText variant="light">Quizzler</LogoText>
         </button>
         <ul className="flex gap-1 text-center md:gap-6">
            <li className="grid place-items-center">
               <DashboardNavigationLink
                  path="/dashboard/my-lessons"
                  label="My lessons"
               />
            </li>
         </ul>
         <div className="grid w-full place-items-center lg:block lg:w-auto">
            <Button
               label="My profile"
               variant="white"
               type="button"
               className="mb-3 w-full lg:mr-3  lg:w-auto"
               onClick={() => router.push("/dashboard/my-profile")}
            />

            <Button
               isLoading={signOutClicked}
               label="Sign out"
               variant="accent"
               type="button"
               className="w-full lg:w-auto"
               onClick={() => {
                  deleteCookie("JWT");
                  setSignOutClicked(true);
                  router.push("/");
               }}
            />
         </div>
      </nav>
   );
};

export default DashboardNavigation;
