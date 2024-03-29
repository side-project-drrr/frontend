import { Outlet } from 'react-router-dom';
import Layout from './Layout';

export default function LayoutWithOutAside() {
    return (
        <Layout>
            <main className="w-[100%]">
                <section aria-label="메인 콘텐츠" className="p-3">
                    <Outlet />
                </section>
            </main>
        </Layout>
    );
}
