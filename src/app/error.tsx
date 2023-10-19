"use client";

import Button from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
   return (
      <div className="fixed left-0 top-0 grid h-screen w-screen place-items-center bg-background bg-opacity-50 text-background">
         <div className="relative z-20 grid w-4/5 place-items-center rounded-xl bg-text p-5 lg:w-1/2">
            <div className="grid place-items-center text-center">
               <h2 className="mb-3">
                  An error occurred. Please try again later. If the problem
                  persists, contact support.
               </h2>

               <Button
                  type="button"
                  variant="primary"
                  label="Try again"
                  onClick={() => reset()}
               />
            </div>
         </div>
      </div>
   );
}
