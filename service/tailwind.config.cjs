module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', '../component/src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        backgroundImage: { send: "url('./assets/send-2.png')" },
        fontSize: {
            base: '1rem', // 16px
            sm: '0.875rem', //14px
            lg: '1.125rem', // 18px
            xs: '0.75rem', //12px
        },
    },
    darkMode: 'class',
    plugins: [],
};
