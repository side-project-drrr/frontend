import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CategoryPage from './pages/CategoryPage';
import SocialCallback from './components/social/SocialCallback';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useDarkMode } from './ThemeContext/ThemeProvider';
import LayoutWithAside from './components/layout/LayoutWIthAside';
import LayoutWithOutAside from './components/layout/LayoutWIthOutAside';
import HeaderSearchPage from './pages/HeaderSearchPage';
import KakaoAuthRedirectPage from './pages/KakaoAuthRedirectPage.tsx';
import MemberProfileProvider from './contexts/MemberProfileContext.tsx';

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
            <MemberProfileProvider>
                <Routes>
                    <Route element={<LayoutWithAside />}>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/detail/:id" element={<ItemDetailPage />} />
                        <Route path="/signup/category" element={<CategoryPage />} />
                        <Route path="/category/detail/:id" element={<ItemDetailPage />} />
                        <Route path="/search/:search" element={<HeaderSearchPage />} />
                    </Route>
                    <Route element={<LayoutWithOutAside />}></Route>
                    <Route path="/kakao/auth" element={<KakaoAuthRedirectPage />} />
                    <Route path="/github/auth" element={<SocialCallback />} />
                </Routes>
            </MemberProfileProvider>
        </ThemeProvider>
    );
}

export default App;
