import { Outlet } from 'react-router-dom';
import Aside from '../aside/Aside';
import Layout from './Layout';

export default function LayoutWithAside() {
    return (
        <Layout>
            <main className="w-[70%]">
                <section className="w-full" aria-label="메인 콘텐츠">
                    <Outlet />
                </section>
            </main>
            <aside className="w-[30%] border-l border-solid dark:border-[#444444] border-[#f0f0f0]">
                <div className="inline-block right-0 top-10">
                    {/* sticky */}
                    <Aside />
                </div>
            </aside>
        </Layout>
    );
}
