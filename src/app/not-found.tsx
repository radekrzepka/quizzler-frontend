export default function NotFound() {
   return (
      <div className="grid h-screen w-screen place-items-center">
         <div className="w-3/4 rounded-xl bg-text p-4 py-10 text-center text-black">
            <p className="text-4xl font-bold">404 error - Not Found</p>
            <p className="text-base">Could not find requested resource</p>
         </div>
      </div>
   );
}
