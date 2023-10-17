import { Controller, FieldValues, Path, Control } from "react-hook-form";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import { useState, Fragment } from "react";

interface Option {
   value: string;
   label: string;
}

interface SelectProps<T extends FieldValues> {
   name: Path<T>;
   className?: string;
   disabled?: boolean;
   options: Option[];
   control: Control<T>;
   defaultValue?: Option;
}

const Select = <T extends FieldValues>({
   control,
   name,
   className,
   disabled = false,
   options,
   defaultValue,
}: SelectProps<T>) => {
   const [selected, setSelected] = useState(defaultValue || options[0]);

   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onChange, value } }) => (
            <Listbox
               disabled={disabled}
               value={
                  options.find((option) => option.value === value) || selected
               }
               onChange={(newSelected) => {
                  setSelected(newSelected);
                  onChange(newSelected);
               }}
            >
               <div className={classNames(className, "relative")}>
                  <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-[6px] pl-4 text-left text-base">
                     <span className="block truncate">{selected.label}</span>
                  </Listbox.Button>
                  <Transition
                     as={Fragment}
                     leave="transition ease-in duration-100"
                     leaveFrom="opacity-100"
                     leaveTo="opacity-0"
                  >
                     <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {options.map((option) => (
                           <Listbox.Option
                              key={option.value}
                              className={({ active }) =>
                                 `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                    active ? "bg-primary" : "text-gray-900"
                                 }`
                              }
                              value={option}
                           >
                              <span className="block truncate">
                                 {option.label}
                              </span>
                           </Listbox.Option>
                        ))}
                     </Listbox.Options>
                  </Transition>
               </div>
            </Listbox>
         )}
      ></Controller>
   );
};

export default Select;
