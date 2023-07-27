import { FC } from "react";
import classnames from "classnames";

interface buttonProps {
   type: "button" | "submit";
   onClick?: () => void;
   label: string;
   variant: "primary" | "white" | "accent" | "black";
   className?: string;
}

const Button: FC<buttonProps> = ({
   type,
   label,
   onClick,
   variant,
   className,
}) => {
   return (
      <button
         onClick={onClick}
         type={type}
         className={classnames(
            variant === "primary" && "bg-primary hover:bg-accent",
            variant === "accent" && "bg-accent hover:bg-primary",
            variant === "white" && "bg-text",
            variant === "black" &&
               "bg-background text-white hover:bg-[#2e2e2e]",
            "rounded-lg px-12 py-2 text-background",
            className,
         )}
      >
         {label}
      </button>
   );
};

export default Button;
