import { createTheme } from '@mui/material/styles';

const createCustomTheme = (darkMode: string) => {
    return createTheme({
        palette: {
            mode: darkMode === 'dark' ? 'dark' : 'light',
        },
    });
};

export default createCustomTheme;
