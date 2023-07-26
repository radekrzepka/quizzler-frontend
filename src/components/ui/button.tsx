import { FC } from "react";
import classnames from "classnames";

interface buttonProps {
   type: "button";
   onClick?: () => void;
   label: string;
   variant: "primary" | "white";
}

const Button: FC<buttonProps> = ({ type, label, onClick, variant }) => {
   return (
      <button
         onClick={onClick}
         type={type}
         className={classnames(
            variant === "primary" && "bg-primary hover:bg-accent",
            variant === "white" && "bg-text",
            "rounded-lg px-12 py-2 text-background",
         )}
      >
         {label}
      </button>
   );
};

export default Button;
