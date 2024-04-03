import { Outlet } from 'react-router-dom';
import Aside from '../aside/Aside';
import Layout from './Layout';
import { Box } from '@mui/material';

export default function LayoutWithAside() {
    return (
        <Layout>
            <main className="lg:w-[70%] w-full">
                <section className="w-full pt-10 px-[10px] lg:pr-10" aria-label="메인 콘텐츠">
                    <Outlet />
                </section>
            </main>
            <Box width="30%" borderLeft={1} borderColor="primary.main" className="hidden lg:block">
                <div className="pl-10 pt-10 pr-[10px]">
                    <Aside />
                </div>
            </Box>
        </Layout>
    );
}
