import { Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { topicIndexState, topicState } from '../../recoil/atom/topicsState';
import { getRangeEngApi, getRangeEtcApi, getRangeKorApi } from '../../apis/topics';
import { allTopicsType } from './type';
import { useQuery } from '@tanstack/react-query';

const ListComponent = ({ onHandleIndex }: { onHandleIndex: (index: string) => void }) => {
    const [topicIndex] = useRecoilState(topicIndexState);
    const [topics] = useRecoilState(topicState);
    const [allTopics, setAllTopics] = useState<allTopicsType[]>([]);

    const { data: koData, isError: koError } = useQuery({
        queryKey: ['koData'],
        queryFn: getRangeKorApi,
    });
    const { data: enData, isError: enError } = useQuery({
        queryKey: ['enData'],
        queryFn: getRangeEngApi,
    });
    const { data: etcData, isError: etcError } = useQuery({
        queryKey: ['etcData'],
        queryFn: getRangeEtcApi,
    });

    if (koError || enError || etcError) return '에러가 발생했습니다.';

    useEffect(() => {
        async function getAllTopics() {
            if (koData && enData && etcData) {
                const resKoData = koData.content;
                const resEnData = enData.content;
                const resEtcData = etcData.content;
                const res = resEnData.concat(resKoData).concat(resEtcData);
                setAllTopics(res);
            }
        }
        getAllTopics();
    }, [koData, enData, etcData]);

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
                                    <li className="cursor-pointer truncate ..." key={idx}>
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
                        <Chip key={index} label={data.name} sx={{ cursor: 'pointer' }} />
                    ))}
                </Stack>
            )}
        </>
    );
};

export default ListComponent;
