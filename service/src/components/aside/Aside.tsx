import TopPost from './TopPost';
import Carousel from '../carousel/Carousel';
import TopKeywords from './TopKeywords';
import { recommendState } from '../../recoil/atom/recommendState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { useTokenDecode } from '../../hooks/useTokenDecode';
import { getAuthStorage } from '../../repository/AuthRepository';
import { getRecommendTechBlogService } from '../../service/TechBlogService';
import { useEffect } from 'react';

export default function Aside() {
    const [recommendData, setRecommendData] = useRecoilState(recommendState);
    const TOKEN_KEY = 'accessToken';

    const loggedIn = useRecoilValue(isLoggedInState);
    const token = getAuthStorage(TOKEN_KEY);
    const memberId = useTokenDecode(token);

    async function getRecommenedDataRender() {
        if (memberId !== undefined) {
            const recommendBlogData = await getRecommendTechBlogService();
            setRecommendData(recommendBlogData);
        }
    }
    useEffect(() => {
        getRecommenedDataRender();
    }, [loggedIn]);

    return (
        <div className="flex flex-col justify-around w-full p-4 my-10">
            {loggedIn && (
                <>
                    <div className="mb-4">
                        <h2 className="my-2 text-lg font-bold">추천 게시글</h2>
                        <Carousel data={recommendData} />
                    </div>
                    <hr />
                </>
            )}
            <TopKeywords />

            <TopPost />
            <hr />
        </div>
    );
}
