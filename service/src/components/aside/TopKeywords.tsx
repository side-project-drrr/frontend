import { useEffect, useState } from 'react';
import { TopKeywordProps } from './type';
import { getTopkeyword } from '../../service/TopKeyword';
import { Box } from '@mui/material';

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
        <Box
            borderBottom={1}
            borderColor={'primary.main'}
            flex="flex"
            flexDirection="column"
            width={'100%'}
            paddingBottom={'20px'}
            marginBottom={'20px'}
        >
            <h1 aria-label="가장 많이 검색된 기술" className="text-lg font-bold">
                가장 많이 검색된 기술
            </h1>
            <div className="flex items-center w-full">
                <ul className="flex mt-3 gap-2 flex-wrap max-h-[130px] overflow-y-hidden">
                    {topkeywordsData &&
                        topkeywordsData?.map(topkeyword => (
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
        </Box>
    );
}
