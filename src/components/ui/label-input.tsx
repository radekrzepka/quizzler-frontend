import {
   UseFormRegister,
   FieldValues,
   Path,
   FieldErrors,
} from "react-hook-form";
import TextInput from "./text-input";
import ErrorMessage from "./error-message";

interface LabelInputProps<T extends FieldValues> {
   label: string;
   inputType: "text" | "password" | "email";
   disabled?: boolean;
   register: UseFormRegister<T>;
   name: Path<T>;
   errors: FieldErrors<T>;
}

const LabelInput = <T extends FieldValues>({
   label,
   inputType,
   disabled = false,
   register,
   name,
   errors,
}: LabelInputProps<T>) => {
   return (
      <>
         <label htmlFor={name}>{label}</label>
         <TextInput
            id={name}
            type={inputType}
            register={register}
            name={name}
            className={!errors[name] ? "mb-[23px]" : ""}
            disabled={disabled}
         />
         {errors[name]?.message && (
            <ErrorMessage>{errors[name]?.message as string}</ErrorMessage>
         )}
      </>
   );
};

export default LabelInput;
