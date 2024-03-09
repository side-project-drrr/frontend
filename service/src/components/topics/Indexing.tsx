import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Chip, Stack } from '@mui/material';
import { useContext } from 'react';
import { topicContext } from '../../pages/TopicPage';

const indexKr = [
    '가',
    '나',
    '다',
    '라',
    '마',
    '바',
    '사',
    '아',
    '자',
    '차',
    '카',
    '타',
    '파',
    '하',
];
const indexEn = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];

const indexText = indexEn.concat(indexKr);

export const IndexingComponent = () => {
    const {
        tabContWidth,
        tabWidth,
        tabPosition,
        setTabPosition,
        topicIndex,
        setTopicIndex,
        setSearchVal,
        handleIndex,
        handleEtcIndex,
    } = useContext(topicContext);

    // 탭 오른쪽 왼쪽 클릭시
    function handleOnClickLeft() {
        if (tabPosition + 200 > 0) {
            setTabPosition(0);
        } else {
            setTabPosition(tabPosition + 200);
        }
    }

    // 탭 오른쪽 화살표 클릭시
    function handleOnClickRight() {
        if (tabPosition - 200 < tabContWidth - tabWidth) {
            setTabPosition(tabContWidth - tabWidth);
        } else {
            setTabPosition(tabPosition - 200);
        }
    }

    // 전체 topic 노출
    function getAllTopics() {
        setTopicIndex('all');
        setSearchVal('');
    }

    return (
        <>
            <MdKeyboardArrowLeft onClick={handleOnClickLeft} className="cursor-pointer" size={30} />
            <div id="category-tab-container" className="relative h-full w-full overflow-hidden">
                <Stack
                    id="category-tab"
                    className="absolute t-0 z-0"
                    style={{ left: `${tabPosition}px`, transition: 'all .5s ease' }}
                    direction="row"
                    spacing={1}
                >
                    <Chip
                        onClick={getAllTopics}
                        label="All"
                        style={{
                            cursor: 'pointer',
                        }}
                        color={topicIndex === 'all' ? 'secondary' : 'primary'}
                    />
                    {indexText.map((data, index) => (
                        <Chip
                            onClick={() => handleIndex(data)}
                            key={index}
                            label={data}
                            sx={{ cursor: 'pointer' }}
                            color={topicIndex === data ? 'secondary' : 'primary'}
                        />
                    ))}
                    <Chip
                        onClick={handleEtcIndex}
                        label="기타"
                        sx={{ cursor: 'pointer' }}
                        color={topicIndex === '기타' ? 'secondary' : 'primary'}
                    />
                </Stack>
            </div>
            <MdKeyboardArrowRight
                onClick={handleOnClickRight}
                className="cursor-pointer"
                size={30}
            />
        </>
    );
};
