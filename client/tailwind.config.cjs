/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,md,mdx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				white: '#f8f9fa',
				black: '#0D0D0D',
				blackish: '#010326',
				'main-blue': '#010440',
				'neutral-blue': '#020873',
				blue: '#030BA6'
			},
			fontFamily: {
				body: ['Manrope', ...defaultTheme.fontFamily.sans]
			},
			gridTemplateColumns: {
				list: 'repeat(auto-fill, minmax(400px, max-content))'
			},
			transitionTimingFunction: {
				custom: 'cubic-bezier(.35, 1, .33, 1)'
			},
			transitionDuration: {
				400: '400ms'
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
}
