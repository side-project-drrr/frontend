import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SignUpPage from './pages/SignUpPage';
import CategoryPage from './pages/CategoryPage';
import SocialCallback from './components/social/SocialCallback';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/detail/:id" element={<ItemDetailPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signup/category" element={<CategoryPage />} />
            </Route>
            <Route path="/kakao/auth" element={<SocialCallback />} />
            <Route path="/github/auth" element={<SocialCallback />} />
        </Routes>
    );
}

export default App;
