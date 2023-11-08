"use client";

import DashboardNavigationLink from "@/components/dashboard/dashboard-navigation-link";
import Button from "@/components/ui/button";
import LogoText from "@/components/ui/logo-text";
import Skeleton from "@/components/ui/skeleton";
import { UserInfo } from "@/types/user-info";
import { generateAbbreviation } from "@/utils/generate-abbreviation";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";

const getProfileData = async () => {
   const JWT = getCookie("JWT") as string;

   const res = await fetch("/api/user/profile", {
      headers: { Authorization: JWT },
   });
   const json = await res.json();

   return json.data;
};

const DashboardNavigation: FC = () => {
   const [signOutClicked, setSignOutClicked] = useState(false);
   const router = useRouter();

   const {
      data: profileData,
      isLoading,
      isError,
      isFetched,
   } = useQuery<UserInfo>({
      queryFn: getProfileData,
      queryKey: ["profileData"],
   });

   return (
      <nav className="shadow-shadow my-6 flex w-full flex-col items-center justify-between gap-4 rounded-xl border-[1px] border-borderContainer bg-background p-4 text-text shadow-containerShadow lg:flex-row">
         <Link href={"/dashboard"}>
            <LogoText variant="light">Quizzler</LogoText>
         </Link>
         <ul className="flex w-full flex-col gap-1 text-center md:flex-row md:gap-6 lg:justify-center">
            <DashboardNavigationLink
               path="/dashboard/my-lessons"
               label="My lessons"
            />
            <DashboardNavigationLink path="/dashboard/search" label="Search" />
         </ul>
         <div className="grid w-full flex-shrink-0 place-items-end lg:w-auto lg:grid-cols-[auto_auto] lg:gap-6">
            {isLoading || isError || !profileData ? (
               <div className="mb-6 flex w-full items-center justify-center gap-3 lg:mb-0">
                  <Skeleton circle height="44px" width="44px" />
                  <Skeleton height="20px" width="180px" />
               </div>
            ) : (
               <Link
                  href="/dashboard/my-profile"
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

                  <p className="whitespace-nowrap text-2xl">
                     Welcome, {profileData?.firstName || profileData.username}!
                  </p>
               </Link>
            )}

            <Button
               isLoading={signOutClicked}
               label="Sign out"
               variant="accent"
               type="button"
               className="w-full lg:w-auto"
               onClick={() => {
                  router.push("/");
                  deleteCookie("JWT");
                  setSignOutClicked(true);
                  toast.success("Logged out");
               }}
            />
         </div>
      </nav>
   );
};

export default DashboardNavigation;
