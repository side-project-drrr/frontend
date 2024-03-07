import { useEffect, useState } from 'react';

import { getRecommendTechBlogService } from '../../service/TechBlogService';
import { IRandomDataProps } from './type';
import { BiSolidLike } from 'react-icons/bi';
import { FaEye } from 'react-icons/fa';
import darkLogo from '@monorepo/service/src/assets/darkLogo.webp';

export default function Recommend() {
    const [recommendData, setRecommendData] = useState([]);

    const [randomRecommendData, setRandomRecommendData] = useState<IRandomDataProps[]>([]);

    async function getRecommenedDataRender() {
        const recommendBlogData = await getRecommendTechBlogService();
        setRecommendData(recommendBlogData);
    }

    useEffect(() => {
        if (recommendData.length > 0) {
            const randomIndex = Math.floor(Math.random() * recommendData.length);
            setRandomRecommendData([recommendData[randomIndex]]);
        }
    }, [recommendData]);

    useEffect(() => {
        getRecommenedDataRender();
    }, []);

    return (
        <div className="flex flex-col justify-around gap-2 pb-8 border-b dark:border-[#444444] border-[#f0f0f0]">
            <div className="flex items-center justify-between w-full mb-4">
                <h1 className="text-base font-bold">추천 게시글</h1>
                <p className="text-xs bg-transparent">더 보기</p>
            </div>
            {randomRecommendData &&
                randomRecommendData.map(data => (
                    <div key={data.techBlogPostBasicInfoDto.id}>
                        <div className="relative flex items-center w-full">
                            <div className="w-[100px] h-[100px] flex justify-center items-center rounded-[20px]  bg-slate-300">
                                {data.techBlogPostBasicInfoDto.thumbnailUrl ? (
                                    <img
                                        src={data.techBlogPostBasicInfoDto.thumbnailUrl}
                                        alt="썸네일"
                                        className="block w-20 h-20 rounded-xl"
                                    />
                                ) : (
                                    <img
                                        src={darkLogo}
                                        alt="썸네일"
                                        className="block w-15 h-15 rounded-xl "
                                    />
                                )}
                            </div>
                            <div className="flex flex-col gap-2 pl-4">
                                <h1 className="text-sm">{data.techBlogPostBasicInfoDto.title}</h1>
                                <ul className="flex gap-2">
                                    <li className="text-sm flex gap-2 items-center">
                                        <BiSolidLike />
                                        {data.techBlogPostBasicInfoDto.postLike}
                                    </li>
                                    <li className="text-sm flex gap-2 items-center">
                                        <FaEye /> {data.techBlogPostBasicInfoDto.viewCount}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
}
