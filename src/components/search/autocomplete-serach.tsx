import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SEARCH } from "@/utils/urls";
import AsyncSelect from "react-select/async";
import {
   components,
   type SingleValue,
   type StylesConfig,
   type DropdownIndicatorProps,
   type GroupBase,
} from "react-select";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Option {
   value: string;
   label: string;
}

const promiseOptions = async (query: string) => {
   console.log(query);
   if (query === "") return [];
   const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/autocomplete/${query}`
   );

   const options = (await res.json()) as Array<string>;

   return options.map(option => ({
      value: option,
      label: option,
   }));
};

const DropdownIndicator = (
   props: DropdownIndicatorProps<Option, false, GroupBase<Option>>
) => {
   return (
      <components.DropdownIndicator {...props}>
         <MagnifyingGlassIcon className="h-5 w-5 text-background" />
      </components.DropdownIndicator>
   );
};

const AutocompleteSerach = () => {
   const [inputValue, setInputValue] = useState("");
   const [selectedOption, setSelectedOption] =
      useState<SingleValue<{ label: string; value: string }>>(null);

   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   useEffect(() => {
      setInputValue("");
      setSelectedOption(null);
   }, [pathname, searchParams]);

   const handleInputChange = (newValue: string) => {
      setInputValue(newValue);
   };

   const handleSelection = (
      option: SingleValue<{ label: string; value: string }>
   ) => {
      setSelectedOption(option);
      if (option) {
         router.push(SEARCH(option.value));
      }
   };

   const customStyles: StylesConfig<{ label: string; value: string }, false> = {
      option: (provided, state) => ({
         ...provided,
         textAlign: "left",
         backgroundColor: state.isSelected
            ? "#d9ec4b"
            : state.isFocused
            ? "#c6de17"
            : provided.backgroundColor,
         color: "black",
         cursor: "pointer",
      }),
      placeholder: provided => ({
         ...provided,
         textAlign: "left",
      }),
      singleValue: provided => ({
         ...provided,
         textAlign: "left",
      }),
      input: provided => ({
         ...provided,
         textAlign: "left",
      }),
      control: provided => ({
         ...provided,
         cursor: "text", // Style for cursor as text input cursor
         "&:hover": {
            cursor: "text", // Style for cursor on hover
         },
      }),
   };
   return (
      <AsyncSelect
         cacheOptions
         loadOptions={promiseOptions}
         onInputChange={handleInputChange}
         inputValue={inputValue}
         value={selectedOption}
         onChange={handleSelection}
         styles={customStyles}
         placeholder="Search"
         components={{
            DropdownIndicator,
         }}
         isClearable
         isSearchable
      />
   );
};

export default AutocompleteSerach;
