import classNames from "classnames";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
   type: "text" | "password" | "email";
   placeholder?: string;
   id: string;
   register: UseFormRegister<T>;
   name: Path<T>;
   className?: string;
   disabled?: boolean;
}

const TextInput = <T extends FieldValues>({
   type,
   placeholder,
   id,
   register,
   name,
   className,
   disabled = false,
}: TextInputProps<T>) => {
   return (
      <input
         {...register(name)}
         type={type}
         placeholder={placeholder}
         id={id}
         className={classNames(
            "w-full rounded-md px-4 py-1 text-background placeholder:text-[#d6d6d6] disabled:bg-gray-300",
            className
         )}
         disabled={disabled}
      />
   );
};

export default TextInput;
