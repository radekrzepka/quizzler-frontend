"use client";

import DashboardNavigationLink from "@/components/dashboard/dashboard-navigation-link";
import Button from "@/components/ui/button";
import LogoText from "@/components/ui/logo-text";
import Skeleton from "@/components/ui/skeleton";
import { deleteCookie } from "cookies-next";
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
} from "@/utils/urls";
import classNames from "classnames";
import Avatar from "../ui/avatar";
import SerachPanel from "@/modules/serach/panel/search-panel";
import useCurrentUserInfo from "@/hooks/api-hooks/use-current-user-info";
import { useQueryClient } from "@tanstack/react-query";

const DashboardNavigation = () => {
   const [signOutClicked, setSignOutClicked] = useState(false);
   const [showOptions, setShowOptions] = useState(false);
   const queryClient = useQueryClient();

   const router = useRouter();
   const pathname = usePathname();

   const { data: profile, isLoading, isError } = useCurrentUserInfo();

   return (
      <nav className="shadow-shadow my-4 flex w-full flex-col items-center justify-between gap-4 rounded-lg border-[1px] border-borderContainer bg-background p-2 text-text shadow-containerShadow xl:flex-row">
         <div className="flex w-full items-center justify-between xl:w-auto">
            <Link href={DASHBOARD}>
               <LogoText variant="light">Quizzler</LogoText>
            </Link>
            <button
               className="block xl:hidden"
               onClick={() => setShowOptions(prevOption => !prevOption)}
            >
               <Bars3Icon className="h-12 w-12 text-text" />
            </button>
         </div>

         <>
            <ul
               className={classNames(
                  "flex w-full flex-col items-center gap-1 text-center xl:flex-row xl:gap-6",
                  showOptions ? "flex" : "hidden xl:flex"
               )}
            >
               <DashboardNavigationLink path={MY_LESSONS} label="My lessons" />
               <SerachPanel className="sm:w-3/4 xl:mt-0 xl:w-auto" />
            </ul>
            <div
               className={classNames(
                  "grid w-full flex-shrink-0 place-items-center xl:w-auto xl:gap-6",
                  isLoading ? "lg:grid-cols-auto" : "xl:grid-cols-[auto_auto]",
                  showOptions ? "grid" : "hidden xl:grid"
               )}
            >
               {isLoading ? (
                  <div className="mb-6 flex w-full items-center gap-3 place-self-end xl:mb-0">
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
               ) : profile !== null ? (
                  <Link
                     href={MY_PROFILE}
                     className="mb-6 flex w-full items-center justify-center gap-3 xl:mb-0"
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
                        className="mb-4 w-full sm:w-3/4 xl:mb-0 xl:w-auto"
                        onClick={() => {
                           router.push(`${LOGIN}?next=${pathname}`);
                        }}
                     >
                        Sign in
                     </Button>
                     <Button
                        variant="white"
                        className="w-full sm:w-3/4 xl:w-auto"
                        onClick={() => {
                           router.push(REGISTER);
                        }}
                     >
                        Sign up
                     </Button>
                  </>
               )}
               {profile !== null && !isLoading && (
                  <Button
                     isLoading={signOutClicked}
                     disabled={signOutClicked}
                     variant="accent"
                     className="w-full sm:w-3/4 xl:w-auto"
                     onClick={() => {
                        router.push(BASE_PATH);
                        setSignOutClicked(true);
                        deleteCookie("JWT");
                        queryClient.removeQueries({
                           queryKey: ["currentUser"],
                        });
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
