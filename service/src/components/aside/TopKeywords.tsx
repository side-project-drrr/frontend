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
        <div>
            <h3 aria-label="top keyword">Top Keywords</h3>
            <div className="flex justify-center">
                <ul className="flex flex-wrap justify-around w-4/5 gap-4 mt-3 ">
                    {topkeywordsData.map(topkeyword => (
                        <li
                            key={topkeyword.id}
                            className="gap-4 bg-[#E6F1FE] text-[#006FEE] px-4 py-1.5 rounded-2xl flex-1 text-center"
                            aria-label="top keyword item"
                        >
                            {topkeyword.categoryName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
