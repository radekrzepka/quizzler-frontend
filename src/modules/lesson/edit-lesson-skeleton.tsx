import InputSkeleton from "@/components/ui/input-skeleton";
import Skeleton from "@/components/ui/skeleton";
import { FC } from "react";

const EditLessonSkeleton: FC = ({}) => {
   return (
      <div className="grid gap-4 xl:grid-cols-[2fr_2fr_1fr]">
         <div className="flex h-[60vh] flex-col items-center rounded-xl bg-text pt-6">
            <Skeleton width="95%" className="mb-3" height="22px" />
            <Skeleton width="95%" height="200px" />
            <InputSkeleton className="w-[95%]" />
            <InputSkeleton className="w-[95%]" />
            <InputSkeleton className="w-[95%]" />
            <InputSkeleton className="w-[95%]" />
            <Skeleton width="70%" className="mt-6" height="30px" />
         </div>
         <div className="flex h-[60vh] flex-col items-center rounded-xl bg-text pt-6">
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
         <div className="flex h-[60vh] flex-col items-center rounded-xl bg-text pt-6">
            <Skeleton width="95%" className="mb-3" height="22px" />
            <Skeleton width="95%" className="mb-3" height="22px" />
         </div>
      </div>
   );
};

export default EditLessonSkeleton;
