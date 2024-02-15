import { Outlet } from 'react-router-dom';

import Header from '@monorepo/component/src/stories/header/Header';
import Aside from '../aside/Aside';
import { getAuthStorage } from '../../repository/AuthRepository';

export default function Layout() {
    const TOKEN_KEY = 'accessToken';
    const token = getAuthStorage(TOKEN_KEY);
    return (
        <>
            <Header authToken={token} />
            <div className="flex w-full justify-evenly">
                <main className="flex justify-end w-10/12">
                    <section aria-label="메인 콘텐츠" className="w-10/12">
                        <Outlet />
                    </section>
                </main>
                <aside className="max-w-md pl-2 mr-20 border-l-2 border-solid border-zinc-500">
                    <div className="w-[100%] inline-block sticky right-0 top-10">
                        <Aside />
                    </div>
                </aside>
            </div>
        </>
    );
}
