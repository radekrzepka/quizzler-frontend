"use client";

import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
   return (
      <div className="grid h-[75vh] w-full place-items-center">
         <ClipLoader
            loading={true}
            color="#e8eaed"
            size={100}
            className="mt-10"
         />
      </div>
   );
}
