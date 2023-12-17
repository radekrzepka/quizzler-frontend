import classNames from "classnames";
import type { ReactNode } from "react";

interface TagProps {
   className?: string;
   children: ReactNode;
   type?: "transparent" | "dark";
}

const Tag = ({ className, children, type = "transparent" }: TagProps) => {
   return (
      <div
         className={classNames(
            "h-min w-max rounded-xl border border-background px-4 text-sm leading-none",
            type === "transparent" && "text-background",
            type === "dark" && "bg-background text-text",
            className
         )}
      >
         {children}
      </div>
   );
};

export default Tag;
