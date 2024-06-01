import { Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { topicIndexState, topicState } from '../../recoil/atom/topicsState';
import { getRangeEngApi, getRangeEtcApi, getRangeKorApi } from '../../apis/topics';
import { allTopicsType } from './type';

export const ListComponent = ({ onHandleIndex }: { onHandleIndex: (index: string) => void }) => {
    const [topicIndex] = useRecoilState(topicIndexState);
    const [topics] = useRecoilState(topicState);
    const [allTopics, setAllTopics] = useState<allTopicsType[]>([]);

    useEffect(() => {
        // 전체 카테고리 호출
        async function getAllTopics() {
            const resKo = await getRangeKorApi();
            const resEn = await getRangeEngApi();
            const resEtc = await getRangeEtcApi();

            if (resKo.status === 200 && resEn.status === 200 && resEtc.status === 200) {
                const resKoData = resKo.data.content;
                const resEnData = resEn.data.content;
                const resEtcData = resEtc.data.content;
                const res = resEnData.concat(resKoData).concat(resEtcData);

                setAllTopics(res);
            }
        }

        getAllTopics();
    }, []);

    return (
        <>
            {topicIndex === 'all' ? (
                <div className="grid grid-cols-3 gap-10">
                    {allTopics.map((data, index) => (
                        <div className="relative" key={index}>
                            <span
                                onClick={() => onHandleIndex(data.keyIndex)}
                                className="absolute top-0 right-0 text-xs cursor-pointer"
                            >
                                더보기
                            </span>
                            <h2 className="border-b-[1px] text-xl font-bold mb-3">
                                {data.keyIndex}
                            </h2>
                            <ul className="flex flex-col gap-1">
                                {data.category.map((item, idx) => (
                                    <li className="truncate ..." key={idx}>
                                        <span className="hover:underline">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <Stack spacing={{ sm: 1 }} direction="row" useFlexGap flexWrap="wrap">
                    {topics.map((data, index) => (
                        <Chip key={index} label={data.name} />
                    ))}
                </Stack>
            )}
        </>
    );
};
