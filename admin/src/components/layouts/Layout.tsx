import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '@monorepo/component/src/stories/navbar/NavbarComponent';

export default function Layout() {
    const navigate = useNavigate();
    const handleCategoryMove = () => {
        navigate('/category');
    };
    const handleMainMove = () => {
        navigate('/');
    };
    return (
        <div className="flex items-center w-screen">
            <aside className="w-48">
                <Navbar handleCategoryMove={handleCategoryMove} handleMainMove={handleMainMove} />
            </aside>
            <section className="flex h-screen w-screen justify-center grow items-center">
                <Outlet />
            </section>
        </div>
    );
}
