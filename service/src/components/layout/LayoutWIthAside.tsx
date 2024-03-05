import { Outlet } from 'react-router-dom';
import Aside from '../aside/Aside';
import Layout from './Layout';

export default function LayoutWithAside() {
    return (
        <Layout>
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
        </Layout>
    );
}
