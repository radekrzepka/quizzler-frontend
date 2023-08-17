import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import classNames from "classnames";

interface Option {
   value: string;
   label: string;
}

interface SelectProps<T extends FieldValues> {
   id: string;
   register: UseFormRegister<T>;
   name: Path<T>;
   className?: string;
   disabled?: boolean;
   options: Option[];
}

const Select = <T extends FieldValues>({
   id,
   register,
   name,
   className,
   disabled = false,
   options,
}: SelectProps<T>) => {
   return (
      <select
         {...register(name)}
         id={id}
         className={classNames(
            "rounded-md px-4 py-1 text-background placeholder:text-[#d6d6d6] disabled:bg-gray-300",
            className,
         )}
         disabled={disabled}
      >
         {options.map((option) => (
            <option key={option.value} value={option.value}>
               {option.label}
            </option>
         ))}
      </select>
   );
};
export default Select;
