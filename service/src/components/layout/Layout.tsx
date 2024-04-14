import Header from '@monorepo/component/src/stories/header/Header';
import { Box } from '@mui/material';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col items-center">
            <Header />
            <Box bgcolor="background.paper" className="w-full h-px" />
            <div className="flex w-full max-w-screen-xl">{children}</div>
        </div>
    );
}
