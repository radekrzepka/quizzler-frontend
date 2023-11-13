"use client";

import Button from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
   return (
      <div className="fixed left-0 top-0 grid h-screen w-screen place-items-center bg-background text-background">
         <div className="grid w-4/5 place-items-center rounded-xl bg-text p-5 lg:w-1/2">
            <div className="grid place-items-center text-center">
               <p className="mb-3 text-lg">
                  An error occurred. Please try again later. If the problem
                  persists, contact support.
               </p>

               <Button onClick={reset}>Try again</Button>
            </div>
         </div>
      </div>
   );
}
