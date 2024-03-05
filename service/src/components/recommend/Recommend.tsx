import { useEffect, useState } from 'react';

import { recommendState } from '../../recoil/atom/recommendState';

import { getRecommendTechBlogService } from '../../service/TechBlogService';
import { useRecoilState } from 'recoil';
import kakao from '../../assets/kakao.webp';
import { IRandomDataProps } from './type';

export default function Recommend() {
    const [recommendData, setRecommendData] = useRecoilState(recommendState);

    const [randomRecommendData, setRandomRecommendData] = useState<IRandomDataProps[]>([]);

    async function getRecommenedDataRender() {
        const recommendBlogData = await getRecommendTechBlogService();
        setRecommendData(recommendBlogData);
    }
    const randomItem = () => {
        const randomIndex = Math.floor(Math.random() * recommendData.length);
        setRandomRecommendData([recommendData[randomIndex]]);
    };

    useEffect(() => {
        const timeInterval = setInterval(randomItem, 30000);
        return () => clearInterval(timeInterval);
    }, [recommendData]);

    useEffect(() => {
        getRecommenedDataRender();
    }, []);

    return (
        <div className="flex flex-col justify-around gap-2 pb-8 border-b">
            <div className="flex items-center justify-between w-full mb-4">
                <h1 className="text-base font-bold">추천 게시글</h1>
                <p className="text-xs bg-transparent">더 보기</p>
            </div>
            {randomRecommendData &&
                randomRecommendData.map(data => (
                    <div key={data.techBlogPostBasicInfoDto.id}>
                        <div className="relative flex items-center w-full">
                            <img src={kakao} alt="썸네일" className="block w-20 h-20 rounded-xl" />
                            <div className="flex flex-col gap-2 pl-4">
                                <h1 className="text-sm">{data.techBlogPostBasicInfoDto.title}</h1>
                                <ul className="flex gap-2">
                                    <li className="text-sm">
                                        좋아요 : {data.techBlogPostBasicInfoDto.postLike}
                                    </li>
                                    <li className="text-sm">
                                        조회수 : {data.techBlogPostBasicInfoDto.viewCount}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
