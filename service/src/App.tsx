import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CategoryPage from './pages/CategoryPage';
import SocialCallback from './components/social/SocialCallback';
import { ThemeProvider } from '@mui/material';
import { darkModeState } from './recoil/atom/darkModeState';
import { useRecoilValue } from 'recoil';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useMemo } from 'react';
import { useDarkMode } from './ThemeContext/ThemeProvider';

function App() {
    // const darkMode = useRecoilValue(darkModeState);
    const { darkMode } = useDarkMode();

    const lightTheme = useMemo(() => 
        createTheme({
            palette: {
                mode: 'light',
                background: {
                    default: '#ffffff', // 배경색 설정
                },
                text: {
                    primary: '#2c2c2c'
                }
            },
        })
    , [darkMode])

    // Dark Mode에서의 배경색
    const darkTheme = useMemo(() => 
        createTheme({
            palette: {
                mode: 'dark',
                background: {
                    default: '#2c2c2c', // 다크 모드의 주요 색상 설정
                },
                text: {
                    primary: '#ffffff'
                }
            },
        })
    , [darkMode])
    
    return (
        <ThemeProvider theme={darkMode === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/detail/:id" element={<ItemDetailPage />} />
                    <Route path="/signup/category" element={<CategoryPage />} />
                    <Route path="/category/detail/:id" element={<ItemDetailPage />} />
                </Route>
                <Route path="/kakao/auth" element={<SocialCallback />} />
                <Route path="/github/auth" element={<SocialCallback />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
