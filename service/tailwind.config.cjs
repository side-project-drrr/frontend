module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}', '../component/src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        backgroundImage: { send: "url('./assets/send-2.png')" },
        extend: {
            // colors: {
            //     light: {
            //         DEFAULT: '#C2C2C2',
            //     },
            //     dark: {
            //         text: {
            //             DEFAULT: '#FFF',
            //             1: '#D9D9D9',
            //             2: '#ACACAC',
            //             3: '#595959',
            //         },
            //     }
            // },
        },
    },
    // darkMode: 'class',
    plugins: [],
};
