import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useDarkMode } from './ThemeContext/ThemeProvider';

import ToManyRequestError from './components/errors/ToManyRequestError';
import HealthCheck from './pages/HealthCheck';
const RecommendedListPage = lazy(() => import('./pages/RecommendedListPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const HeaderSearchPage = lazy(() => import('./pages/HeaderSearchPage'));
const TopicPage = lazy(() => import('./pages/TopicPage'));
const LayoutWithOutAside = lazy(() => import('./components/layout/LayoutWithOutAside'));
const LayoutWithAside = lazy(() => import('./components/layout/LayoutWIthAside'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AlarmListPage = lazy(() => import('./pages/AlarmListPage'));
const ViewPageComponent = lazy(() => import('./pages/ViewPage'));
const SocialComponent = lazy(() => import('./components/social/SocialCallback'));

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
        typography: {
            fontFamily: "'Nanum Gothic', 'sans-serif'",
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
        typography: {
            fontFamily: "'Nanum Gothic', 'sans-serif'",
        },
    });

    return (
        <>
            <ThemeProvider theme={darkMode === 'dark' ? darkTheme : lightTheme}>
                <CssBaseline />
                <Routes>
                    <Route path="/healthcheck" element={<HealthCheck />} />
                    <Route path="/error" element={<ToManyRequestError />} />
                    <Route element={<LayoutWithAside />}>
                        <Route path="/search/:search" element={<HeaderSearchPage />} />
                        <Route path="/topics" element={<TopicPage />} />
                        <Route path="/alarm/list" element={<AlarmListPage />} />
                        <Route path="/" element={<MainPage />} />
                    </Route>
                    <Route element={<LayoutWithOutAside />}>
                        <Route path="/recommend/list" element={<RecommendedListPage />} />
                        <Route path="/view/:postId" element={<ViewPageComponent />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                    <Route path="/kakao/auth" element={<SocialComponent />} />
                    <Route path="/github/auth" element={<SocialComponent />} />
                </Routes>
            </ThemeProvider>
        </>
    );
}

export default App;
