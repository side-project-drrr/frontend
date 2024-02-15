module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', '../component/src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        backgroundImage: { send: "url('./assets/send-2.png')" },
        extend: {
            colors: {
                light: {
                    DEFAULT: '#D9D9D9',
                },
                dark: {
                    text: {
                        DEFAULT: '#fffff',
                        1: '#D9D9D9',
                        2: '#ACACAC',
                        3: '#595959',
                    },
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [],
};
