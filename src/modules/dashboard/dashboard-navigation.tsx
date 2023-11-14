"use client";

import DashboardNavigationLink from "@/components/dashboard/dashboard-navigation-link";
import Button from "@/components/ui/button";
import LogoText from "@/components/ui/logo-text";
import Skeleton from "@/components/ui/skeleton";
import type { UserInfo } from "@/types/user-info";
import { generateAbbreviation } from "@/utils/generate-abbreviation";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Bars3Icon } from "@heroicons/react/20/solid";
import {
   BASE_PATH,
   DASHBOARD,
   MY_LESSONS,
   MY_PROFILE,
   SEARCH,
} from "@/utils/urls";

const getProfileData = async (): Promise<UserInfo> => {
   const JWT = getCookie("JWT") as string;

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
      headers: { Authorization: JWT },
   });

   return (await res.json()) as UserInfo;
};

const DashboardNavigation = () => {
   const [signOutClicked, setSignOutClicked] = useState(false);
   const [showOptions, setShowOptions] = useState<boolean>(true);
   const router = useRouter();

   const {
      data: profileData,
      isLoading,
      isError,
   } = useQuery<UserInfo>({
      queryFn: getProfileData,
      queryKey: ["profileData"],
   });

   useEffect(() => {
      setShowOptions(window ? window.innerWidth > 1024 : true);
   }, []);

   return (
      <nav className="shadow-shadow my-6 flex w-full flex-col items-center justify-between gap-4 rounded-lg border-[1px] border-borderContainer bg-background p-2 text-text shadow-containerShadow lg:flex-row">
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
                  {isLoading || isError || !profileData ? (
                     <div className="mb-6 flex w-full items-center justify-center gap-3 lg:mb-0">
                        <Skeleton circle height="44px" width="44px" />
                        <Skeleton height="20px" width="180px" />
                     </div>
                  ) : (
                     <Link
                        href={MY_PROFILE}
                        className="mb-6 flex w-full items-center justify-center gap-3 lg:mb-0"
                     >
                        {profileData.avatar === null ? (
                           <div className="grid h-11 w-11 place-items-center rounded-full border text-3xl font-bold text-primary">
                              {generateAbbreviation(profileData)}
                           </div>
                        ) : (
                           <Image
                              width={44}
                              height={44}
                              src={`/images/avatars/avatar_${profileData.avatar}.png`}
                              alt={`Avatar of ${profileData.username}`}
                           />
                        )}

                        <p className="whitespace-nowrap text-xl">
                           Welcome,{" "}
                           {profileData?.firstName || profileData.username}!
                        </p>
                     </Link>
                  )}

                  <Button
                     isLoading={signOutClicked}
                     disabled={signOutClicked}
                     variant="accent"
                     type="button"
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
               </div>
            </>
         )}
      </nav>
   );
};

export default DashboardNavigation;
