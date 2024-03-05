import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CategoryPage from './pages/CategoryPage';
import SocialCallback from './components/social/SocialCallback';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useDarkMode } from './ThemeContext/ThemeProvider';
import LayoutWithAside from './components/layout/LayoutWithAside';
import LayoutWithOutAside from './components/layout/LayoutWithOutAside';
import { RecommendedListPage } from './pages/recommendedListPage';

function App() {
    const { darkMode } = useDarkMode();

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: '#ffffff', // 배경색 설정
            },
            text: {
                primary: '#2c2c2c',
            },
        },
    });

    // Dark Mode에서의 배경색
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: '#2c2c2c', // 다크 모드의 주요 색상 설정
            },
            text: {
                primary: '#ffffff',
            },
        },
    });

    return (
        <ThemeProvider theme={darkMode === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <Routes>
                <Route element={<LayoutWithAside />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/detail/:id" element={<ItemDetailPage />} />
                    <Route path="/signup/category" element={<CategoryPage />} />
                    <Route path="/category/detail/:id" element={<ItemDetailPage />} />
                </Route>
                <Route element={<LayoutWithOutAside />}>
                    <Route path="/recommend/list" element={<RecommendedListPage />} />
                </Route>
                <Route path="/kakao/auth" element={<SocialCallback />} />
                <Route path="/github/auth" element={<SocialCallback />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
