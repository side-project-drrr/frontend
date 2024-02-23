import { Outlet } from 'react-router-dom';

import Header from '@monorepo/component/src/stories/header/Header';
import Aside from '../aside/Aside';
import { getAuthStorage } from '../../repository/AuthRepository';

export default function Layout() {
    const TOKEN_KEY = 'accessToken';
    const token = getAuthStorage(TOKEN_KEY);
    return (
        <div className='flex w-screen flex-col items-center'>
            <Header authToken={token} />
            <div className='w-full h-px bg-[#444]'/>
            <div className="flex justify-center">
                <div className='max-w-screen-xl flex'>
                    <main className="w-[70%]">
                        <section aria-label="메인 콘텐츠">
                            <Outlet />
                        </section>
                    </main>
                    <aside className="w-[30%] border-l border-solid border-[#444]">
                        <div className="inline-block sticky right-0 top-10">
                            <Aside />
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
