/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/routes/**/*.{svelte,js,ts}'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#2563eb',
					secondary: '#a78bfa',
					accent: '#9333ea',
					neutral: '#1f2937',
					'base-100': '#111827',
					info: '#3abff8',
					success: '#36d399',
					warning: '#fbbd23',
					error: '#f87272'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
