"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

function Providers({ children }: React.PropsWithChildren) {
   const [client] = React.useState(
      new QueryClient({
         defaultOptions: {
            queries: {
               refetchOnWindowFocus: false,
            },
         },
      })
   );

   return (
      <QueryClientProvider client={client}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
   );
}

export default Providers;
