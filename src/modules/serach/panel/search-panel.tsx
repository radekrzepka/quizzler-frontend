import TextInput from "@/components/ui/text-input";
import { SEARCH } from "@/utils/urls";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SerachPanel = () => {
   const [query, setQuery] = useState("");
   const router = useRouter();

   return (
      <form
         onSubmit={event => {
            event.preventDefault();
            router.push(`${SEARCH}?query=${query}`);
         }}
         className="mt-2 w-full flex-grow sm:w-3/4 xl:mt-0 xl:w-auto"
      >
         <TextInput
            className="w-full rounded-xl py-2 placeholder:text-gray-600"
            type="text"
            name="query"
            id="search"
            placeholder="Search"
            // icon={<MagnifyingGlassIcon className="h-6 w-6 text-background" />}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
               setQuery(event.target.value)
            }
         />
      </form>
   );
};

export default SerachPanel;
