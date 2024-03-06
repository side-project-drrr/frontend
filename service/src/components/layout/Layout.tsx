import Header from '@monorepo/component/src/stories/header/Header';
import { getAuthStorage } from '../../repository/AuthRepository';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    const TOKEN_KEY = 'accessToken';
    const token = getAuthStorage(TOKEN_KEY);
    return (
        <div className="flex flex-col items-center">
            <Header authToken={token} />
            <div className="w-full h-px dark:bg-[#444444] bg-[#f0f0f0]" />
            <div className="max-w-screen-xl flex">{children}</div>
        </div>
    );
}
