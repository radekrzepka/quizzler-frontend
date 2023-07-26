import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
   type: "text" | "password" | "email";
   placeholder?: string;
   id: string;
   register: UseFormRegister<T>;
   name: Path<T>;
}

const TextInput = <T extends FieldValues>({
   type,
   placeholder,
   id,
   register,
   name,
}: TextInputProps<T>) => {
   return (
      <input
         {...register(name)}
         type={type}
         placeholder={placeholder}
         id={id}
         className="rounded-md px-4 py-1 text-background placeholder:text-[#858585]"
      />
   );
};

export default TextInput;
