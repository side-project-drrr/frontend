import TopPost from './TopPost';
import Carousel from '../carousel/Carousel';
import TopKeywords from './TopKeywords';
import { recommendState } from '../../recoil/atom/recommendState';
import { useRecoilValue, useRecoilState } from 'recoil';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { useTokenDecode } from '../../hooks/useTokenDecode';
import { getAuthStorage } from '../../repository/AuthRepository';
import { getRecommendTechBlogService } from '../../service/TechBlogService';
import { useEffect, useState } from 'react';

import { getTopPostItemService } from '../../service/TopPostService';

export default function Aside() {
    const [recommendData, setRecommendData] = useRecoilState(recommendState);
    const [topContent, setTopContent] = useState([]);
    async function getTopContentRender() {
        const topContentData = await getTopPostItemService();

        setTopContent(topContentData);
    }
    useEffect(() => {
        getTopContentRender();
    }, []);
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
            <h1 className="text-lg font-bold ">가장 많이 읽는 글</h1>
            <div className="flex flex-col w-full dark:border-[#444444] border-b gap-2 border-[#F0F0F0]">
                {topContent.map((value: any) => (
                    <TopPost item={value} key={value.techBlogPostBasicInfoDto.id} />
                ))}
            </div>
            <TopKeywords />
        </div>
    );
}
