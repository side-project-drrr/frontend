import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        '../component/src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                'dark-box-bg': '#363D4B',
                'dark-bg': '#1C1D21',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            addCommonColors: true,
        }),
    ],
};
