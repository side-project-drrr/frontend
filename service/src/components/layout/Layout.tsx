import { Outlet } from 'react-router-dom';

import Header from '@monorepo/component/src/stories/header/Header';
import Aside from '../aside/Aside';
import { getAuthStorage } from '../../repository/AuthRepository';
import { useEffect } from 'react';
import { useTokenDecode } from '../../hooks/useTokenDecode';
import { getRecommendTechBlogService } from '../../service/TechBlogService';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { recommendState } from '../../recoil/atom/recommendState';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';

export default function Layout() {
    const setRecommendData = useSetRecoilState(recommendState);
    const TOKEN_KEY = 'accessToken';
    const token = getAuthStorage(TOKEN_KEY);
    const memberId = useTokenDecode(token);
    const loggedIn = useRecoilValue(isLoggedInState);

    async function getRecommenedDataRender() {
        const recommendBlogData = await getRecommendTechBlogService(memberId);
        setRecommendData(recommendBlogData);
    }

    useEffect(() => {
        getRecommenedDataRender();
    }, [loggedIn]);

    return (
        <>
            <Header />
            <div className="flex w-full justify-evenly">
                <main className="flex justify-end w-10/12">
                    <section aria-label="메인 콘텐츠" className="w-10/12">
                        <Outlet />
                    </section>
                </main>
                <aside className="w-full max-w-lg pl-2 mr-28 ">
                    <div className="sticky right-0 inline-block w-full top-10">
                        <Aside />
                    </div>
                </aside>
            </div>
        </>
    );
}
