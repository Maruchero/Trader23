/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/routes/**/*.{svelte,js,ts}'],
	daisyui: {
		themes: ['dark']
	},
	plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
