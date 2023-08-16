import classNames from "classnames";
import { FC } from "react";

interface SkeletonProps {
   backgroundColor?: string;
   height?: string;
   width?: string;
   className?: string;
}

const Skeleton: FC<SkeletonProps> = ({
   backgroundColor = "#b4b4b4",
   height = "16px",
   width = "100%",
   className,
}) => {
   return (
      <>
         <style>
            {`
              @keyframes shimmer {
                0% {
                  background-position: -200% 0;
                }
                100% {
                  background-position: 200% 0;
                }
              }

              .shimmer-effect {
                animation: shimmer 2.5s infinite linear;
                background: linear-gradient(
                  to right,
                  ${backgroundColor} 25%,
                  #e0e0e0 50%,
                  ${backgroundColor} 75%
                );
                background-size: 200% 100%;
              }
            `}
         </style>
         <div
            className={classNames(
               className,
               "shimmer-effect h-4 w-full rounded-xl",
            )}
            style={{ height, width }}
         ></div>
      </>
   );
};

export default Skeleton;
