import classnames from "classnames";
import type { ReactNode } from "react";
import BeatLoader from "react-spinners/BeatLoader";

interface ButtonProps {
   children: ReactNode;
   type?: "button" | "submit";
   onClick?: () => void;
   variant?: "primary" | "white" | "accent" | "black";
   className?: string;
   isLoading?: boolean;
   disabled?: boolean;
}

const Button = ({
   type = "button",
   onClick,
   variant = "primary",
   className,
   isLoading = false,
   children,
   disabled = false,
}: ButtonProps) => {
   return (
      <button
         onClick={onClick}
         type={type}
         disabled={disabled}
         className={classnames(
            variant === "primary" &&
               "bg-primary hover:bg-accent disabled:bg-gray-600 disabled:text-white",
            variant === "accent" && "bg-accent hover:bg-primary",
            variant === "white" && "bg-text",
            variant === "black" &&
               "bg-background text-white hover:bg-[#2e2e2e]",
            "rounded-lg px-12 py-2 text-background",
            className
         )}
      >
         {isLoading ? (
            <span>
               <BeatLoader
                  color="#110f1f"
                  loading={isLoading}
                  size={10}
                  className="relative top-[2px] grid"
               />
            </span>
         ) : (
            children
         )}
      </button>
   );
};

export default Button;
