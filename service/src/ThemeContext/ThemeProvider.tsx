import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useLayoutEffect,
    useEffect,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import {
    setDarkModeSotrage,
    getDarkModeStorage,
    removeDarkModeStorage,
} from '../repository/DarkRepository';
import createCustomTheme from './theme';

interface ThemeContextProps {
    darkMode: string;
    toggleDarkMode: () => void;
}

const DarkModeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState('light');

    const GET_LOCAL_DARK_KEY = 'theme';

    const toggleDarkMode = () => {
        setDarkMode(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        removeDarkModeStorage();
        setDarkModeSotrage(darkMode);
    }, [darkMode]);

    // 새로고침시에도 darkmode 구현된 상태로 놔두기
    useLayoutEffect(() => {
        const savedTheme = getDarkModeStorage(GET_LOCAL_DARK_KEY);
        if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
            setDarkMode(savedTheme);
            return;
        }
    }, []);

    useEffect(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    useLayoutEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode('dark');
        } else {
            setDarkMode('light');
        }
    }, []);

    const theme = createCustomTheme(darkMode);

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <MuiThemeProvider
                theme={{
                    ...theme,
                    palette: {
                        ...theme.palette,
                        mode: darkMode ? 'dark' : 'light',
                    },
                }}
            >
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </DarkModeContext.Provider>
    );
};

const useDarkMode = () => {
    const context = useContext(DarkModeContext);

    if (!context) {
        throw new Error('useDarkMode must be used within a DarkModeProvider');
    }
    return context;
};

export { ThemeProvider, useDarkMode };
