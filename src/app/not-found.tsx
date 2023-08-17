export default function NotFound() {
   return (
      <div className="flex h-screen w-screen items-center justify-center ">
         <div className="flex w-3/4 items-center justify-center rounded-xl bg-text p-4 py-10 text-center text-black">
            <div>
               <p className="text-6xl font-bold">404 error - Not Found</p>
               <p className="text-xl">Could not find requested resource</p>
            </div>
         </div>
      </div>
   );
}
