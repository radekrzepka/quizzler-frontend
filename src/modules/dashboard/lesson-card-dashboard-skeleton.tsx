import Skeleton from "@/components/ui/skeleton";
import Image from "next/image";
const LessonCardDashboardSkeleton = () => {
   return (
      <div className="relative my-2 flex w-11/12 rounded-xl bg-text shadow-lessonCardShadow md:max-h-32 lg:max-h-36 xl:max-h-28 2xl:max-h-40">
         <div className="flex w-[60%]">
            <Image
               alt=""
               width={300}
               height={300}
               className="rounded-l-xl object-cover "
               src={"/icons/empty-image.png"}
            />
         </div>
         <div className="absolute flex h-full w-[60%]">
            <Skeleton width="100%" height="100%" />
         </div>
         <div className="flex flex-grow flex-col items-end justify-between p-2">
            <Skeleton height="30px" width="100%" />
            <div className="mb-5 flex w-full items-center justify-end">
               <Skeleton width="70%" height="20px" />
               <Skeleton
                  circle
                  width="30px"
                  height="30px"
                  className="mt-1 rounded-l-xl"
               />
            </div>
            <Skeleton height="20px" width="30%" />
         </div>
      </div>
   );
};

export default LessonCardDashboardSkeleton;
