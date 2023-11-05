import InputSkeleton from "@/components/ui/input-skeleton";
import Skeleton from "@/components/ui/skeleton";
import { FC } from "react";

const EditLessonSkeleton: FC = ({}) => {
   return (
      <div className="grid gap-4 xl:grid-cols-2">
         <div className="flex h-[70vh] flex-col items-center rounded-xl bg-text pt-6">
            <Skeleton width="95%" className="mb-3" height="22px" />
            <Skeleton width="95%" height="200px" />
            <InputSkeleton className="w-[95%]" />
            <InputSkeleton className="w-[95%]" />
            <InputSkeleton className="w-[95%]" />
            <InputSkeleton className="w-[95%]" />
            <Skeleton width="70%" className="mt-6" height="30px" />
         </div>
         <div className="flex h-[70vh] flex-col items-center rounded-xl bg-text pt-6">
            <Skeleton width="95%" className="mb-3" height="22px" />
            <Skeleton width="95%" className="mb-3" height="22px" />
            <InputSkeleton className="w-[95%]" />
            <InputSkeleton className="w-[95%]" />
            <div className="my-3 flex w-[95%] justify-between">
               <Skeleton width="47%" className="mb-3" height="300px" />
               <Skeleton width="47%" className="mb-3" height="300px" />
            </div>
            <Skeleton width="70%" className="mt-6" height="30px" />
         </div>
         <div className="flex h-[40vh] flex-col items-center rounded-xl bg-text pt-6 xl:col-span-2">
            <Skeleton width="20%" className="mb-3" height="24px" />
            <Skeleton width="95%" className="mb-3" height="22px" />
            <div className="flex w-full flex-row flex-wrap gap-3 px-8">
               <Skeleton width="160px" height="160px" />
               <Skeleton width="160px" height="160px" />
               <Skeleton width="160px" height="160px" />
            </div>
         </div>
      </div>
   );
};

export default EditLessonSkeleton;
