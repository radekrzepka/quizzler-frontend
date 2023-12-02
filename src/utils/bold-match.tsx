interface BoldMatchProps {
   text: string;
   query: string;
}

const BoldMatch = ({ text, query }: BoldMatchProps) => {
   if (!query) return <>{text}</>;
   const regex = new RegExp(`(${query})`, "gi");
   const parts = text.split(regex);

   return parts.map((part, index) =>
      regex.test(part) ? (
         <span key={index} className="font-bold">
            {part}
         </span>
      ) : (
         part
      )
   );
};

export default BoldMatch;
