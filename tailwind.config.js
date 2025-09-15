/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				// Keep existing colors for backward compatibility
				"dark-layer-1": "rgb(40,40,40)",
				"dark-layer-2": "rgb(26,26,26)",
				"dark-label-2": "rgba(239, 241, 246, 0.75)",
				"dark-divider-border-2": "rgb(61, 61, 61)",
				"dark-fill-2": "hsla(0,0%,100%,.14)",
				"dark-fill-3": "hsla(0,0%,100%,.1)",
				"dark-gray-6": "rgb(138, 138, 138)",
				"dark-gray-7": "rgb(179, 179, 179)",
				"gray-8": "rgb(38, 38, 38)",
				"dark-gray-8": "rgb(219, 219, 219)",
				"brand-orange": "rgb(255 161 22)",
				"brand-orange-s": "rgb(193, 122, 15)",
				"dark-yellow": "rgb(255 192 30)",
				"dark-pink": "rgb(255 55 95)",
				olive: "rgb(0, 184, 163)",
				"dark-green-s": "rgb(44 187 93)",
				"dark-blue-s": "rgb(10 132 255)",
				
				// CodeMaster brand colors
				"codemaster-orange": "#FFA116",
				"codemaster-orange-hover": "#FF9500", 
				"codemaster-orange-dark": "#FF8C00",
				"codemaster-easy": "#00b8a3",
				"codemaster-medium": "#ffb800",
				"codemaster-hard": "#ff375f",
				"codemaster-bg": {
					light: "#ffffff",
					dark: "#1a1a1a"
				},
				"codemaster-surface": {
					light: "#f7f8fa",
					dark: "#2d2d2d"
				},
				"codemaster-text": {
					light: "#262626", 
					dark: "#eff1f6bf"
				},
				"codemaster-border": {
					light: "#e5e7eb",
					dark: "#3a3a3a"
				}
			},
		},
	},
	plugins: [],
};
