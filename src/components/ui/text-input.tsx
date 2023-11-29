import classNames from "classnames";
import type { ReactNode } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
   type: "text" | "password" | "email";
   placeholder?: string;
   id: string;
   register?: UseFormRegister<T>;
   name?: Path<T>;
   className?: string;
   disabled?: boolean;
   icon?: ReactNode;
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = <T extends FieldValues>({
   type,
   placeholder,
   id,
   register,
   name,
   className,
   disabled = false,
   icon,
   onChange,
}: TextInputProps<T>) => {
   return (
      <div className="relative">
         {icon && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
               {icon}
            </div>
         )}
         <input
            {...(name && register ? register(name) : {})}
            type={type}
            placeholder={placeholder}
            id={id}
            className={classNames(
               "w-full rounded-md px-4 py-1 text-background placeholder:text-[#d6d6d6] disabled:bg-gray-300",
               icon && "pl-10",
               className
            )}
            disabled={disabled}
            onChange={onChange}
         />
      </div>
   );
};

export default TextInput;
