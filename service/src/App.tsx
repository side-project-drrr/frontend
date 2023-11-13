import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SignUpPage from './pages/SignUpPage';
import CategoryPage from './pages/CategoryPage';
//import KaKaoCallback from './components/social/kakao/KaKaoCallback';
import GithubCallback from './components/social/github/GithubCallback';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/detail/:id" element={<ItemDetailPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/signup/category" element={<CategoryPage />} />
            </Route>
            {/* <Route path="/auth" element={<KaKaoCallback />} /> */}
            <Route path="/auth" element={<GithubCallback />} />
        </Routes>
    );
}

export default App;
