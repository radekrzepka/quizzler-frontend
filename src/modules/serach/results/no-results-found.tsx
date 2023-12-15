import Image from "next/image";

interface NoResultsFoundProps {
   resultType: "lessons" | "users";
}

const NoResultsFound = ({ resultType }: NoResultsFoundProps) => {
   return (
      <div className="col-span-3 flex items-center rounded-xl bg-text px-3 py-5 md:col-span-1">
         <Image
            src="/icons/not-found.png"
            width={50}
            height={50}
            alt="Icon of not found"
         />
         <div className="text-xl font-bold text-background">
            No {resultType} found
         </div>
      </div>
   );
};

export default NoResultsFound;
