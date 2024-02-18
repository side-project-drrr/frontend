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
            <div className='w-full h-[1px] bg-zinc-500'/>
            <div className="flex lg:w-[1280px] md:w-screen ">
                <main className='w-[80%] overflow-hidden'>
                    <section aria-label="메인 콘텐츠" className="w-full">
                        <Outlet />
                    </section>
                </main>
                <aside className="w-[400px] overflow-hidden pl-2 mr-20 border-l border-solid border-zinc-500">
                    <div className="w-[100%] inline-block sticky right-0 top-10">
                        <Aside />
                    </div>
                </aside>
            </div>
        </div>
    );
}
