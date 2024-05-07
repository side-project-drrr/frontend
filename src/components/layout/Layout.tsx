import Header from '../../stories/header/Header';
import { Box } from '@mui/material';
import { UserProfileProvider } from '../../context/UserProfile';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <UserProfileProvider>
            <div className="flex flex-col items-center">
                <Header />
                <Box bgcolor="background.paper" className="w-full h-px" />
                <div className="flex w-full max-w-screen-xl">{children}</div>
            </div>
        </UserProfileProvider>
    );
}
