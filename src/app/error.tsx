"use client"; // Error components must be Client Components

import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";

export default function Error({
   error,
   reset,
}: {
   error: Error;
   reset: () => void;
}) {
   return (
      <Modal displayCloseIcon={false}>
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
      </Modal>
   );
}
