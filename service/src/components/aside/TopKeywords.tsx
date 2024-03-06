import { useEffect, useState } from 'react';
import { TopKeywordProps } from './type';
import { getTopkeyword } from '../../service/TopKeyword';

export default function TopKeywords() {
    const [topkeywordsData, setTopkeywordsData] = useState<TopKeywordProps[]>([]);
    const [didMount, setDidMount] = useState<boolean>(false);

    async function getTopkeyDatas() {
        const topKeywordData = await getTopkeyword();
        setTopkeywordsData(topKeywordData);
    }

    useEffect(() => {
        setDidMount(true);
    }, []);
    useEffect(() => {
        if (didMount) {
            getTopkeyDatas();
        }
    }, [didMount]);

    return (
        <div className="flex flex-col mt-5 w-full border-b border-[#F0F0F0] dark:border-[#444444] ">
            <h1 aria-label="가장 많이 검색된 기술" className="text-base">
                가장 많이 검색된 기술
            </h1>
            <div className="flex items-center w-full pb-10 pt-2">
                <ul className="flex justify-around mt-3 gap-2 flex-wrap">
                    {topkeywordsData?.map(topkeyword => (
                        <li
                            key={topkeyword.id}
                            aria-label="top keyword item"
                            className=" whitespace-nowrap bg-[#F0F0F0] text-black dark:bg-[#444444] dark:text-white py-2 px-4 rounded-xl text-sm"
                        >
                            {topkeyword.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
