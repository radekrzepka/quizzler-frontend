import useDebounce from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

interface TagsMultiSelectProps<T extends FieldValues> {
   name: Path<T>;
   control: Control<T>;
   defaultTags?: Array<{ label: string; value: string }>;
}

const getTagsByQuery = async (query: string) => {
   const JWT = getCookie("JWT") as string;

   if (query === "") return [];

   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag/${query}`, {
      headers: {
         Authorization: JWT,
         Accept: "text/json",
      },
      method: "GET",
   });

   const data = (await res.json()) as Array<string>;

   if (data.length > 0) {
      const mappedTags = data.map((tag: string) => ({
         value: tag,
         label: tag,
      }));
      return mappedTags;
   }

   return [];
};

const TagsMultiSelect = <T extends FieldValues>({
   name,
   control,
   defaultTags,
}: TagsMultiSelectProps<T>) => {
   const [query, setQuery] = useState("");
   const debouncedQuery = useDebounce(query, 100);

   const { data: options, isLoading } = useQuery({
      queryKey: ["tags", debouncedQuery],
      queryFn: () => getTagsByQuery(debouncedQuery),
   });

   return (
      <Controller
         control={control}
         name={name}
         render={({ field: { onChange } }) => (
            <CreatableSelect
               isLoading={isLoading}
               defaultValue={defaultTags}
               onChange={selected => onChange(selected)}
               isMulti
               onInputChange={value => setQuery(value)}
               options={options}
               isValidNewOption={(inputValue, selectOptions) =>
                  inputValue.length <= 50 &&
                  inputValue.trim().length > 0 &&
                  !selectOptions.some(option => option.label === inputValue)
               }
               noOptionsMessage={({ inputValue }) =>
                  inputValue.length > 50
                     ? "Tag too long (max 50 characters)"
                     : inputValue
                     ? `No options for "${inputValue}"`
                     : "Please write"
               }
            />
         )}
      />
   );
};

export default TagsMultiSelect;
