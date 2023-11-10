import classNames from "classnames";
import type { ReactNode } from "react";

interface LogoTextProps {
   variant?: "light" | "dark";
   children: ReactNode;
}

const LogoText = ({ variant = "light", children }: LogoTextProps) => {
   return (
      <h1
         className={classNames(
            "bg-gradient-to-r bg-clip-text text-6xl font-bold text-transparent",
            variant === "light" && "from-text to-primary",
            variant === "dark" && "from-background to-background",
         )}
      >
         {children}
      </h1>
   );
};

export default LogoText;
