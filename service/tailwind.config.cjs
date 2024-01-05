/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', '../component/src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            'dark-box-bg': '#363D4B',
            'dark-bg': '#1C1D21',
            'bg-blue': '#006FEE',
        },
    },
    darkMode: 'class',
    plugins: [],
};
