import TopPost from './TopPost';
import TopKeywords from './TopKeywords';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import { useRecoilValue } from 'recoil';

import Recommend from '../recommend/Recommend';
import { useEffect, useState } from 'react';
import { getTopPostItemService } from '../../service/TopPostService';

export default function Aside() {
    const [topContent, setTopContent] = useState([]);

    const loggedIn = useRecoilValue(isLoggedInState);
    async function getTopContentRender() {
        const topContentData = await getTopPostItemService();

        setTopContent(topContentData);
    }
    useEffect(() => {
        getTopContentRender();
    }, []);

    return (
        <div className="flex flex-col justify-around w-full p-4 my-10">
            {loggedIn && <Recommend />}
            <TopKeywords />
            <h1 className="text-lg font-bold mt-6 mb-2">가장 많이 읽는 글</h1>
            <div className="flex flex-col w-full dark:border-[#444444]  border-b border-[#F0F0F0] mb-4">
                {topContent.map((value: any) => (
                    <TopPost item={value} key={value.techBlogPostBasicInfoDto.id} />
                ))}
            </div>
        </div>
    );
}
