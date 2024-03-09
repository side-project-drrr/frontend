import { Chip, Stack } from '@mui/material';
import { useContext } from 'react';
import { listContext } from '../../pages/TopicPage';

export const ListComponent = () => {
    const { allTopics, topics, topicIndex, handleIndex, handleEtcIndex } = useContext(listContext);

    return (
        <>
            {topicIndex === 'all' ? (
                <div className="grid grid-cols-3 gap-10">
                    {allTopics.map((data, index) => (
                        <div className="relative" key={index}>
                            <span
                                onClick={() =>
                                    data.keyIndex === '기타'
                                        ? handleEtcIndex()
                                        : handleIndex(data.keyIndex)
                                }
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
