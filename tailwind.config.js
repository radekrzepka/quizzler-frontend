/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         boxShadow: {
            containerShadow: "0px -1px 6px -1px #030303",
         },
         // yellow primary color
         colors: {
            text: "#dfddee",
            background: "#110f1f",
            primary: "#d9ec4b",
            secondary: "#141326",
            accent: "#c6de17",
            borderContainer: "#1c1e24",
         },
         //blue primary color
         // colors: {
         //    text: "#dfddee",
         //    background: "#110f1f",
         //    primary: "#00e4dc",
         //    secondary: "#141326",
         //    accent: "#43aeac",
         // },
      },
   },
};
