import Skeleton from "@/components/ui/skeleton";
import { FC } from "react";

const Input: FC = () => {
   return (
      <div className="mt-12 flex w-3/4 flex-col gap-1">
         <Skeleton className="mr-3" width="20%" />
         <Skeleton height="26px" />
      </div>
   );
};

const ProfileFormsSkeleton: FC = () => {
   return (
      <div className="flex flex-col items-center gap-4 rounded-xl bg-text text-background">
         <div className="flex w-full flex-col items-center">
            <Skeleton height="36px" className="mb-10 mt-2" width="50%" />
            <Input />
            <Input />
            <Input />
            <Input />
            <Input />
         </div>
         <div className="flex w-full flex-col items-center">
            <Skeleton height="36px" className="mb-10 mt-2" width="50%" />
            <Input />
            <Input />
         </div>
      </div>
   );
};

export default ProfileFormsSkeleton;
