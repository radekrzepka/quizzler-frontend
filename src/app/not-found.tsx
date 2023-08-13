import Link from "next/link";
import Button from "@/components/ui/button";

export default function NotFound() {
   return (
      <div className="grid h-screen place-items-center">
         <div className="flex flex-col gap-3 text-center">
            <p>404 error - Not Found</p>
            <p>Could not find requested resource</p>
            <Link href="/dashboard">
               <Button type="button" variant="primary">
                  Return Home
               </Button>
            </Link>
         </div>
      </div>
   );
}
