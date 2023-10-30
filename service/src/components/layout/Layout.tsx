import { Outlet } from 'react-router-dom';

import Header from '@monorepo/component/src/stories/header/Header';
import Aside from '../aside/Aside';

export default function Layout() {
    return (
        <>
            <div className="flex">
                <Header />
            </div>
            <div className="block m-auto max-w-7xl mt-5">
                <main className="flex justify-evenly box-border">
                    <section aria-label="메인 콘텐츠" className="max-w-screen-md  block flex-auto">
                        <Outlet />
                    </section>
                    <aside className="max-w-sm block ">
                        <Aside />
                    </aside>
                </main>
            </div>
        </>
    );
}
