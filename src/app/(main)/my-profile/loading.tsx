"use client";

import ProfileCardSkeleton from "@/components/my-profile/profile-card-skeleton";
import ProfileFormsSkeleton from "@/components/my-profile/profile-forms-skeleton";

export default function Loading() {
   return (
      <div className="ml-0 grid gap-10 lg:grid-cols-[3fr_2fr]">
         <ProfileCardSkeleton />
         <ProfileFormsSkeleton />
      </div>
   );
}
