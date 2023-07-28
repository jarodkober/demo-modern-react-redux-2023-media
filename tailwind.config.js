/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				shimmer: 'shimmer 1.5s infinite'
			},
			keyframes: {
				shimmer: {
					'100%': { transform: 'translateX(100%)' }
				}
			}
		}
	},
	plugins: []
};
