import { Outlet } from 'react-router-dom';

import Header from '@monorepo/component/src/stories/header/Header';

export default function Layout() {
    return (
        <>
            <Header />
            <div className="block m-auto max-w-7xl mt-5">
                <main>
                    <section aria-label="메인 콘텐츠">
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    );
}
