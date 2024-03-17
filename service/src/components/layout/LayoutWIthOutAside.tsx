import { Outlet } from 'react-router-dom';
import Layout from './Layout';

export default function LayoutWithOutAside() {
    return (
        <Layout>
            <main className="w-full">
                <section aria-label="메인 콘텐츠" className="w-full pt-10 px-[10px]">
                    <Outlet />
                </section>
            </main>
        </Layout>
    );
}
