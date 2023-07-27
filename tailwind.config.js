/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         // yellow primary color
         colors: {
            text: "#dfddee",
            background: "#110f1f",
            primary: "#d9ec4b",
            secondary: "#141326",
            accent: "#c6de17",
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
