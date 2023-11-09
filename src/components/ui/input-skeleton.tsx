import Skeleton from "@/components/ui/skeleton";
import classNames from "classnames";

interface InputSkeletonProps {
   className?: string;
}

const InputSkeleton = ({ className }: InputSkeletonProps) => {
   return (
      <div className={classNames("mt-12 flex w-3/4 flex-col gap-1", className)}>
         <Skeleton className="mr-3" width="20%" />
         <Skeleton height="26px" />
      </div>
   );
};

export default InputSkeleton;
