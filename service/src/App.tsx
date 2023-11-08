import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';
import ItemDetailPage from './pages/ItemDetailPage';
import SignUpPage from './pages/SignUpPage';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<MainPage />} />
                <Route path="/detail/:id" element={<ItemDetailPage />} />
                <Route path="/signup" element={<SignUpPage />} />
            </Route>
        </Routes>
    );
}

export default App;
