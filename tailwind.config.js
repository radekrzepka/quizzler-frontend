/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
   theme: {
      extend: {
         boxShadow: {
            containerShadow: "0px -1px 6px -1px #030303",
            lessonCardShadow: "0px 3px 3px 1px #A3A3A3",
            lessonCardShadowHover: "0px 8px 20px 1px #A3A3A3",
         },
         colors: {
            text: "#dfddee",
            background: "#110f1f",
            primary: "#d9ec4b",
            secondary: "#141326",
            accent: "#c6de17",
            borderContainer: "#1c1e24",
         },
         backgroundImage: {
            "liked-heart": "url('/icons/filled-heart.png')",
            "unliked-heart": "url('/icons/empty-heart.png')",
         },
      },
   },
};
