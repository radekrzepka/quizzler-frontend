import Skeleton from "@/components/ui/skeleton";
import { FC } from "react";
import InputSkeleton from "@/components/ui/input-skeleton";

const ProfileFormsSkeleton: FC = () => {
   return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-text text-background">
         <div className="flex w-full flex-col items-center">
            <Skeleton height="36px" className="mb-10 mt-2" width="50%" />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
            <InputSkeleton />
         </div>
         <div className="flex w-full flex-col items-center">
            <Skeleton height="36px" className="mb-10 mt-2" width="50%" />
            <InputSkeleton />
            <InputSkeleton />
         </div>
      </div>
   );
};

export default ProfileFormsSkeleton;
