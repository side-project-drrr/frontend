import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CategoryPage from './pages/CategoryPage';
import SocialCallback from './components/social/SocialCallback';
import { ThemeProvider } from '@mui/material';
import theme from './ThemeContext/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
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
