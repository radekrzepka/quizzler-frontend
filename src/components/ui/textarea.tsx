import classNames from "classnames";
import {
   FieldErrors,
   FieldValues,
   Path,
   UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "./error-message";

interface TextareaProps<T extends FieldValues> {
   placeholder?: string;
   id: string;
   register: UseFormRegister<T>;
   name: Path<T>;
   errors: FieldErrors<T>;
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
   errors,
}: TextareaProps<T>) => {
   return (
      <>
         <textarea
            {...register(name)}
            placeholder={placeholder}
            id={id}
            className={classNames(
               "resize-none rounded-md px-4 py-1 text-background placeholder:text-[#d6d6d6] disabled:bg-gray-300",
               className,
               !errors[name] ? "mb-[23px]" : "",
            )}
            disabled={disabled}
         />
         {errors[name]?.message && (
            <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
         )}
      </>
   );
};

export default Textarea;
