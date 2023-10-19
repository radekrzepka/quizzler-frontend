import Skeleton from "@/components/ui/skeleton";
import { FC } from "react";

const ProfileCardSkeleton: FC = () => {
   return (
      <div className="flex flex-col items-center rounded-xl bg-text py-2 text-background">
         <Skeleton height="64px" width="64px" circle={true} className="my-2" />
         <Skeleton height="16px" width="20%" />
         <Skeleton height="16px" className="mt-2" width="60%" />
         <Skeleton height="36px" className="mt-5" width="40%" />
         <Skeleton height="18px" className="mt-2" width="40%" />
         <Skeleton height="300px" className="mt-2" width="80%" />
         <Skeleton height="18px" className="mt-2" width="40%" />
         <Skeleton height="300px" className="mt-2" width="80%" />
      </div>
   );
};

export default ProfileCardSkeleton;
