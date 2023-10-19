import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { getCookie } from "cookies-next";
import { Controller, FieldValues, Control, Path } from "react-hook-form";
import useDebounce from "@/hooks/use-debounce";

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
               noOptionsMessage={({ inputValue }) =>
                  inputValue ? `No options for "${inputValue}"` : "Please write"
               }
            />
         )}
      />
   );
};

export default TagsMultiSelect;
