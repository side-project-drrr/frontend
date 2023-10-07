import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '@monorepo/component/src/stories/navbar/NavbarComponent';
import { useState } from 'react';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
    const navigate = useNavigate();
    const handleCategoryMove = () => {
        navigate('/category');
    };
    const handleMainMove = () => {
        navigate('/');
    };
    return (
        <div className="flex items-center w-screen">
            {sidebarOpen ? (
                <aside className="w-48">
                    <Navbar
                        handleCategoryMove={handleCategoryMove}
                        handleMainMove={handleMainMove}
                        setSidebarOpen={setSidebarOpen}
                    />
                </aside>
            ) : (
                <>
                    <div className="z-50 flex flex-col justify-start h-screen w-10">
                        <p onClick={() => setSidebarOpen(true)}>열기</p>
                    </div>
                </>
            )}
            <section className="flex h-screen w-screen justify-center grow items-center">
                <Outlet />
            </section>
        </div>
    );
}
