import classNames from "classnames";
import type { ReactNode } from "react";

interface TagProps {
   className?: string;
   children: ReactNode;
}

const Tag = ({ className, children }: TagProps) => {
   return (
      <div
         className={classNames(
            "h-min w-max rounded-xl border border-background px-4 text-sm leading-none text-background",
            className
         )}
      >
         {children}
      </div>
   );
};

export default Tag;
