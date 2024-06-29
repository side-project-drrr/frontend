import { Chip, Stack } from '@mui/material';
import { useRecoilState } from 'recoil';
import { topicIndexState, topicState } from '../../recoil/atom/topicsState';
import { allTopicsType } from './type';

const ListComponent = ({
    onHandleIndex,
    allTopics,
}: {
    onHandleIndex: (index: string) => void;
    allTopics: allTopicsType[];
}) => {
    const [topicIndex] = useRecoilState(topicIndexState);
    const [topics] = useRecoilState(topicState);

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
                                        <span>{item.name}</span>
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

export default ListComponent;
