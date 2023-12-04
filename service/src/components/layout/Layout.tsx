import { Outlet } from 'react-router-dom';

import NoAuthHeader from '@monorepo/component/src/stories/header/NoAuthHeader';

export default function Layout() {
    return (
        <>
            <NoAuthHeader />
            <div className="block m-auto mx-10 mt-5">
                <main>
                    <section aria-label="메인 콘텐츠">
                        <Outlet />
                    </section>
                </main>
            </div>
        </>
    );
}
