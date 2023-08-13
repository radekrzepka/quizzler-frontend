"use client";

import Modal from "@/components/ui/modal";

export default function NotFound() {
   return (
      <Modal displayCloseIcon={false}>
         <p className="text-4xl font-bold">404 error - Not Found</p>
         <p className="text-base">Could not find requested resource</p>
      </Modal>
   );
}
