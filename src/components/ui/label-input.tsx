import classNames from "classnames";
import type {
   FieldErrors,
   FieldValues,
   Path,
   UseFormRegister,
} from "react-hook-form";
import ErrorMessage from "./error-message";
import TextInput from "./text-input";

interface LabelInputProps<T extends FieldValues> {
   label?: string;
   inputType: "text" | "password" | "email";
   disabled?: boolean;
   register: UseFormRegister<T>;
   name: Path<T>;
   errors: FieldErrors<T>;
   className?: string;
}

const LabelInput = <T extends FieldValues>({
   label,
   inputType,
   disabled = false,
   register,
   name,
   errors,
   className,
}: LabelInputProps<T>) => {
   return (
      <>
         {label && <label htmlFor={name}>{label}</label>}
         <TextInput
            id={name}
            type={inputType}
            register={register}
            name={name}
            className={classNames(!errors[name] ? "mb-[23px]" : "", className)}
            disabled={disabled}
         />
         {errors[name]?.message && (
            <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
         )}
      </>
   );
};

export default LabelInput;
