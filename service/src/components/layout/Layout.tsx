import Header from '@monorepo/component/src/stories/header/Header';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <div className="w-full h-px dark:bg-[#444444] bg-[#f0f0f0]" />
            <div className="max-w-screen-xl flex">{children}</div>
        </div>
    );
}
