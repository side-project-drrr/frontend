import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SignUpPrivacyPage from './pages/SignUpPrivacyPage';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/detail/:id" element={<ItemDetailPage />} />
                <Route path="/signup/privacy" element={<SignUpPrivacyPage />} />
            </Route>
        </Routes>
    );
}

export default App;
