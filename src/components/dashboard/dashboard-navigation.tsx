"use client";

import DashboardNavigationLink from "@/components/dashboard/dashboard-navigation-link";
import Button from "@/components/ui/button";
import LogoText from "@/components/ui/logo-text";
import Skeleton from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Bars3Icon } from "@heroicons/react/20/solid";
import {
   BASE_PATH,
   DASHBOARD,
   LOGIN,
   MY_LESSONS,
   MY_PROFILE,
   REGISTER,
   SEARCH,
} from "@/utils/urls";
import { getUser } from "@/utils/api-utils/get-user";
import classNames from "classnames";
import Avatar from "../ui/avatar";

const DashboardNavigation = () => {
   const [signOutClicked, setSignOutClicked] = useState(false);
   const [showOptions, setShowOptions] = useState(false);

   const router = useRouter();
   const pathname = usePathname();

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

         <>
            <ul
               className={classNames(
                  "flex w-full flex-col gap-1 text-center md:flex-row lg:justify-center xl:gap-6",
                  showOptions ? "flex" : "hidden lg:flex"
               )}
            >
               <DashboardNavigationLink path={MY_LESSONS} label="My lessons" />
               <DashboardNavigationLink path={SEARCH} label="Search" />
            </ul>
            <div
               className={classNames(
                  "grid w-full flex-shrink-0 place-items-center lg:w-auto lg:gap-6",
                  isLoading ? "lg:grid-cols-auto" : "lg:grid-cols-[auto_auto]",
                  showOptions ? "grid" : "hidden lg:grid"
               )}
            >
               {isLoading ? (
                  <div className="mb-6 flex w-full items-center gap-3 place-self-end lg:mb-0">
                     <div className="flex items-center gap-3">
                        <Skeleton circle height="44px" width="44px" />
                        <Skeleton height="20px" width="180px" />
                     </div>
                     <Skeleton
                        height="40px"
                        width="145px"
                        className="rounded-lg"
                     />
                  </div>
               ) : !isError ? (
                  <Link
                     href={MY_PROFILE}
                     className="mb-6 flex w-full items-center justify-center gap-3 lg:mb-0"
                  >
                     {profile && <Avatar profile={profile} />}
                     <p className="whitespace-nowrap text-xl">
                        Welcome, {profile?.firstName || profile?.username}!
                     </p>
                  </Link>
               ) : (
                  <>
                     <Button
                        variant="accent"
                        className="w-full lg:w-auto"
                        onClick={() => {
                           router.push(`${LOGIN}?next=${pathname}`);
                        }}
                     >
                        Sign in
                     </Button>
                     <Button
                        variant="white"
                        className="w-full lg:w-auto"
                        onClick={() => {
                           router.push(REGISTER);
                        }}
                     >
                        Sign up
                     </Button>
                  </>
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
      </nav>
   );
};

export default DashboardNavigation;
