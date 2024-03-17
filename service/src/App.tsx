import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CategoryPage from './pages/CategoryPage';
import SocialCallback from './components/social/SocialCallback';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useDarkMode } from './ThemeContext/ThemeProvider';
import LayoutWithAside from './components/layout/LayoutWIthAside';
import LayoutWithOutAside from './components/layout/LayoutWIthOutAside';
import TopicPage from './pages/TopicPage';
import HeaderSearchPage from './pages/HeaderSearchPage';
import { AlarmListPage } from './pages/AlarmListPage';
import { ViewPage } from './pages/ViewPage';

function App() {
    const { darkMode } = useDarkMode();

    const lightTheme = createTheme({
        palette: {
            mode: 'light',
            background: {
                default: '#ffffff', // 배경색 설정
                paper: '#f0f0f0',
            },
            text: {
                primary: '#2c2c2c',
                secondary: '#ffffff',
            },
            primary: {
                main: '#f0f0f0',
            },
            secondary: {
                main: '#D16E37', // 포인트 색상 (액센트 색상)
            },
        },
    });

    // Dark Mode에서의 배경색
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            background: {
                default: '#2c2c2c', // 다크 모드의 주요 색상 설정
                paper: '#444',
            },
            text: {
                primary: '#ffffff',
                secondary: '#ffffff',
            },
            primary: {
                main: '#444',
            },
            secondary: {
                main: '#E6783A', // 포인트 색상 (액센트 색상)
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
                    <Route path="/search/:search" element={<HeaderSearchPage />} />
                    <Route path="/topics" element={<TopicPage />} />
                    <Route path="/alarm/list" element={<AlarmListPage />} />
                </Route>
                <Route element={<LayoutWithOutAside />}>
                    <Route path="/view/:id" element={<ViewPage />} />
                </Route>
                <Route path="/github/auth" element={<SocialCallback />} />
                <Route path="/kakao/auth" element={<SocialCallback />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
