import TextInput from "@/components/ui/text-input";
import { SEARCH } from "@/utils/urls";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

const SerachPanel = () => {
   const router = useRouter();

   return (
      <div className="grid w-full place-items-center">
         <div className="w-full md:w-3/4 lg:w-1/2">
            <TextInput
               className="w-full py-4 placeholder:text-gray-600"
               type="text"
               id="search"
               placeholder="Search for other users, lessons"
               icon={
                  <MagnifyingGlassIcon className="h-6 w-6 text-background" />
               }
               onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  router.replace(
                     `${SEARCH}${
                        event.target.value.trim() !== ""
                           ? `?query=${event.target.value}`
                           : ""
                     }`
                  );
               }}
            />
         </div>
      </div>
   );
};

export default SerachPanel;
