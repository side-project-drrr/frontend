import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Layout from './components/layouts/Layout';
import Category from './components/category/Category';

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Main />} />
                <Route path="/category" element={<Category />} />
            </Route>
        </Routes>
    );
}

export default App;
