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
import HeaderSearchPage from './pages/HeaderSearchPage';

function App() {
    const darkMode = useRecoilValue(darkModeState);

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: 'red', // 배경색 설정
            },
        },
    });

    // Dark Mode에서의 배경색
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: 'red', // 배경색 설정
            },
        },
    });

    return (
        <ThemeProvider theme={darkMode === 'dark' ? darkTheme : lightTheme}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/detail/:id" element={<ItemDetailPage />} />
                    <Route path="/signup/category" element={<CategoryPage />} />
                    <Route path="/category/detail/:id" element={<ItemDetailPage />} />
                    <Route path="/Exploretopics" element={<ItemDetailPage />} />
                    <Route path="/search/:search" element={<HeaderSearchPage />} />
                </Route>
                <Route path="/kakao/auth" element={<SocialCallback />} />
                <Route path="/github/auth" element={<SocialCallback />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
