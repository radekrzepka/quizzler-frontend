import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import classNames from "classnames";

interface TextareaProps<T extends FieldValues> {
   placeholder?: string;
   id: string;
   register: UseFormRegister<T>;
   name: Path<T>;
   className?: string;
   disabled?: boolean;
}

const Textarea = <T extends FieldValues>({
   placeholder,
   id,
   register,
   name,
   className,
   disabled = false,
}: TextareaProps<T>) => {
   return (
      <textarea
         {...register(name)}
         placeholder={placeholder}
         id={id}
         className={classNames(
            "resize-none rounded-md px-4 py-1 text-background placeholder:text-[#d6d6d6] disabled:bg-gray-300",
            className,
         )}
         disabled={disabled}
      />
   );
};

export default Textarea;
