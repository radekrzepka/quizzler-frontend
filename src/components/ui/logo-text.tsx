import classNames from "classnames";
import { FC, ReactNode } from "react";

interface LogoTextProps {
   variant?: "light" | "dark";
   children: ReactNode;
}

const LogoText: FC<LogoTextProps> = ({ variant = "light", children }) => {
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
