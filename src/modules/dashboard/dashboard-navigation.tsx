"use client";

import DashboardNavigationLink from "@/components/dashboard/dashboard-navigation-link";
import Button from "@/components/ui/button";
import LogoText from "@/components/ui/logo-text";
import Skeleton from "@/components/ui/skeleton";
import { generateAbbreviation } from "@/utils/generate-abbreviation";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Bars3Icon } from "@heroicons/react/20/solid";
import {
   BASE_PATH,
   DASHBOARD,
   LOGIN,
   MY_LESSONS,
   MY_PROFILE,
   SEARCH,
} from "@/utils/urls";
import { getUser } from "@/utils/api-utils/get-user";

const DashboardNavigation = () => {
   const [signOutClicked, setSignOutClicked] = useState(false);
   const [showOptions, setShowOptions] = useState<boolean>(
      typeof window !== "undefined" ? window.innerWidth > 1024 : true
   );
   const router = useRouter();
   const pathname = usePathname();

   console.log(pathname);

   const JWT = getCookie("JWT") as string;

   const {
      data: profile,
      isLoading,
      isError,
   } = useQuery({
      queryFn: () => getUser(JWT),
      queryKey: ["profileData"],
      retry: 0,
   });

   useEffect(() => {
      const handleResize = () => {
         setShowOptions(window.innerWidth > 1024);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
   }, []);

   return (
      <nav className="shadow-shadow my-4 flex w-full flex-col items-center justify-between gap-4 rounded-lg border-[1px] border-borderContainer bg-background p-2 text-text shadow-containerShadow lg:flex-row">
         <div className="flex w-full items-center justify-between lg:w-auto">
            <Link href={DASHBOARD}>
               <LogoText variant="light">Quizzler</LogoText>
            </Link>
            <button
               className="block lg:hidden"
               onClick={() => setShowOptions(prevOption => !prevOption)}
            >
               <Bars3Icon className="h-12 w-12 text-text" />
            </button>
         </div>

         {showOptions && (
            <>
               <ul className="flex w-full flex-col gap-1 text-center md:flex-row lg:justify-center xl:gap-6">
                  <DashboardNavigationLink
                     path={MY_LESSONS}
                     label="My lessons"
                  />
                  <DashboardNavigationLink path={SEARCH} label="Search" />
               </ul>
               <div className="grid w-full flex-shrink-0 place-items-end lg:w-auto lg:grid-cols-[auto_auto] lg:gap-6">
                  {isLoading ? (
                     <div className="mb-6 flex w-full items-center justify-center gap-3 lg:mb-0">
                        <Skeleton circle height="44px" width="44px" />
                        <Skeleton height="20px" width="180px" />
                     </div>
                  ) : !isError ? (
                     <Link
                        href={MY_PROFILE}
                        className="mb-6 flex w-full items-center justify-center gap-3 lg:mb-0"
                     >
                        {profile?.avatar === null ? (
                           <div className="grid h-11 w-11 place-items-center rounded-full border text-3xl font-bold text-primary">
                              {generateAbbreviation(profile)}
                           </div>
                        ) : (
                           <Image
                              width={44}
                              height={44}
                              src={`/images/avatars/avatar_${profile?.avatar}.png`}
                              alt={`Avatar of ${profile?.username}`}
                           />
                        )}
                        <p className="whitespace-nowrap text-xl">
                           Welcome, {profile?.firstName || profile?.username}!
                        </p>
                     </Link>
                  ) : (
                     <Button
                        variant="accent"
                        className="w-full lg:w-auto"
                        onClick={() => {
                           router.push(`${LOGIN}?next=${pathname}`);
                        }}
                     >
                        Sign in
                     </Button>
                  )}
                  {!isError && !isLoading && (
                     <Button
                        isLoading={signOutClicked}
                        disabled={signOutClicked}
                        variant="accent"
                        className="w-full lg:w-auto"
                        onClick={() => {
                           router.push(BASE_PATH);
                           deleteCookie("JWT");
                           setSignOutClicked(true);
                           toast.success("Logged out");
                        }}
                     >
                        Sign out
                     </Button>
                  )}
               </div>
            </>
         )}
      </nav>
   );
};

export default DashboardNavigation;
