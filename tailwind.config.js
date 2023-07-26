/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				text: "#dfddee",
				background: "#110f1f",
				primary: "#d9ec4b",
				secondary: "#141326",
				accent: "#c6de17",
			},
		},
	},
	plugins: [],
};
