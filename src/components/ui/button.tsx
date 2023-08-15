import { FC, ReactNode } from "react";
import classnames from "classnames";
import BeatLoader from "react-spinners/BeatLoader";

interface buttonProps {
   type: "button" | "submit";
   onClick?: () => void;
   label?: string;
   variant: "primary" | "white" | "accent" | "black";
   className?: string;
   isLoading?: boolean;
   children?: ReactNode;
   disabled?: boolean;
}

const Button: FC<buttonProps> = ({
   type,
   label,
   onClick,
   variant,
   className,
   isLoading = false,
   children,
   disabled = false,
}) => {
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
            className,
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
            label || children
         )}
      </button>
   );
};

export default Button;
