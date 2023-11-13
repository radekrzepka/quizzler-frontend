"use client";

import { useState, useEffect } from "react";

const useWindowWidth = () => {
   // Initialize width to undefined or a default value
   const [width, setWidth] = useState(
      typeof window !== "undefined" ? window.innerWidth : undefined
   );

   useEffect(() => {
      // Ensure window object is available
      if (typeof window !== "undefined") {
         const handleResize = () => setWidth(window.innerWidth);
         window.addEventListener("resize", handleResize);

         // Cleanup function to remove the event listener
         return () => window.removeEventListener("resize", handleResize);
      }
   }, []);

   return width;
};

export default useWindowWidth;
