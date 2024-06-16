import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Chip, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchValueState, topicIndexState } from '../../recoil/atom/topicsState';

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

const IndexingComponent = ({ onHandleIndex }: { onHandleIndex: (index: string) => void }) => {
    const [topicIndex, setTopicIndex] = useRecoilState(topicIndexState);
    const [, setSearchVal] = useRecoilState(searchValueState);

    const [tabContWidth, setTabContWidth] = useState<number>(0);
    const [tabWidth, setTabWidth] = useState<number>(0);
    const [tabPosition, setTabPosition] = useState<number>(0);

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

    useEffect(() => {
        // 카테고리 탭과 탭 컨테이너 너비 구하기
        function getTabAndTabContWidth() {
            const tab = document.getElementById('category-tab')?.offsetWidth;
            tab && setTabWidth(tab);

            getTabContainerWidth();
        }

        // 반응형으로 인해 너비가 달라지는 탭 컨테이너 너비 구하기
        function getTabContainerWidth() {
            const tabContWidth = document.getElementById('category-tab-container')?.offsetWidth;
            tabContWidth && setTabContWidth(tabContWidth);
        }

        getTabAndTabContWidth();

        window.addEventListener('resize', getTabContainerWidth);

        return () => {
            window.removeEventListener('resize', getTabContainerWidth);
        };
    }, []);

    return (
        <>
            <MdKeyboardArrowLeft onClick={handleOnClickLeft} className="cursor-pointer" size={30} />
            <div id="category-tab-container" className="relative w-full h-full overflow-hidden">
                <Stack
                    id="category-tab"
                    className="absolute z-0 t-0"
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
                            onClick={() => onHandleIndex(data)}
                            key={index}
                            label={data}
                            sx={{ cursor: 'pointer' }}
                            color={topicIndex === data ? 'secondary' : 'primary'}
                        />
                    ))}
                    <Chip
                        onClick={() => onHandleIndex('기타')}
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

export default IndexingComponent;
