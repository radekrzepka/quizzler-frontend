import useDebounce from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

interface TagsMultiSelectProps<T extends FieldValues> {
   name: Path<T>;
   control: Control<T>;
   defaultTags?: Array<{ label: string; value: string }>;
}

const getTagsByQuery = async (query: string) => {
   const JWT = getCookie("JWT") as string;

   if (query === "") return [];

   const res = await fetch(`/api/tag/${query}`, {
      headers: {
         Authorization: JWT,
         Accept: "text/json",
      },
      method: "GET",
   });

   const json = await res.json();

   if (json.data.length > 0) {
      const mappedTags = json.data.map((tag: string) => ({
         value: tag,
         label: tag,
      }));
      return mappedTags;
   }

   return json.data;
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
               onChange={(selected) => onChange(selected)}
               isMulti
               onInputChange={(value) => setQuery(value)}
               options={options}
               isValidNewOption={(inputValue, selectOptions) =>
                  inputValue.length <= 50 &&
                  !selectOptions.some((option) => option.label === inputValue)
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
