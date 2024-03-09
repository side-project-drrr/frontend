import { Dispatch, SetStateAction, createContext, useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { IndexingComponent } from '../components/topics/Indexing';
import { ListComponent } from '../components/topics/List';
import {
    getEtcIndexTopicsApi,
    getIndexTopicsApi,
    getRangeEngApi,
    getRangeEtcApi,
    getRangeKorApi,
    getSearchTopicsApi,
} from '../apis/topics';

type allTopicsType = {
    category: topicsType[];
    keyIndex: string;
};

type topicsType = {
    id: number;
    name: string;
};

type topicContextType = {
    tabContWidth: number;
    tabWidth: number;
    tabPosition: number;
    setTabPosition: Dispatch<SetStateAction<number>>;
    topicIndex: string;
    setTopicIndex: Dispatch<SetStateAction<string>>;
    setSearchVal: Dispatch<SetStateAction<string>>;
    handleIndex: (index: string) => void;
    handleEtcIndex: () => void;
};

type listContextType = {
    allTopics: allTopicsType[];
    topics: topicsType[];
    topicIndex: string;
    handleIndex: (index: string) => void;
    handleEtcIndex: () => void;
};

export const topicContext = createContext<topicContextType>({} as topicContextType);
export const listContext = createContext<listContextType>({} as listContextType);

export default function TopicPage() {
    const obsRef = useRef(null);
    const preventRef = useRef(true);
    const [tabContWidth, setTabContWidth] = useState<number>(0);
    const [tabWidth, setTabWidth] = useState<number>(0);
    const [tabPosition, setTabPosition] = useState<number>(0);
    const [allTopics, setAllTopics] = useState<allTopicsType[]>([]);
    const [topics, setTopics] = useState<topicsType[]>([]);
    const [page, setPage] = useState<number>(0);
    const [topicIndex, setTopicIndex] = useState<string>('all');
    const [searchVal, setSearchVal] = useState<string>('');
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    // 검색 topic 무한 스크롤
    async function infiniteSearchTopics(value: string) {
        const res = await getSearchTopicsApi(page, value);

        if (res.status === 200) {
            setTopics(prev => [...prev, ...res.data.content]);
            preventRef.current = true;
        }
    }

    // 검색 기능 디바운스를 사용하여 함수 실행 지연
    function handleSearch(value: string) {
        if (timer) {
            clearTimeout(timer);
        }

        const newTimer = setTimeout(async () => {
            setSearchVal(value);
            setPage(0);
            setTopicIndex('');

            const res = await getSearchTopicsApi(page, value);

            if (res.status === 200) {
                setTopics(res.data.content);
            }
        }, 1000);

        setTimer(newTimer);
    }

    // 인덱스 topic 무한 스크롤
    async function infiniteIndexTopics(index: string) {
        const res = await getIndexTopicsApi(page, index);

        if (res.status === 200) {
            setTopics(prev => [...prev, ...res.data.content]);
            preventRef.current = true;
        }
    }

    // 기타 topic 무한 스크롤
    async function infiniteEtcIndexTopics() {
        const res = await getEtcIndexTopicsApi(page);

        if (res.status === 200) {
            setTopics(prev => [...prev, ...res.data.content]);
            preventRef.current = true;
        }
    }

    // 인덱스별 topic 호출
    async function handleIndex(index: string) {
        setTopicIndex(index);
        setSearchVal('');
        setPage(0);

        const res = await getIndexTopicsApi(0, index);

        if (res.status === 200) {
            setTopics(res.data.content);
        }
    }

    // 기타 topic 호출
    async function handleEtcIndex() {
        setTopicIndex('기타');
        setSearchVal('');
        setPage(0);

        const res = await getEtcIndexTopicsApi(0);

        if (res.status === 200) {
            setTopics(res.data.content);
        }
    }

    // 옵저버 핸들러
    function obsHandler(entries: IntersectionObserverEntry[]) {
        const target = entries[0];

        if (preventRef.current && target.isIntersecting) {
            preventRef.current = false;
            setPage(prev => prev + 1);
        }
    }

    useEffect(() => {
        // 옵저버 생성
        const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
        if (obsRef.current) observer.observe(obsRef.current);

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
        getTabAndTabContWidth();

        window.addEventListener('resize', getTabContainerWidth);

        return () => {
            window.removeEventListener('resize', getTabContainerWidth);
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (page > 0) {
            searchVal && infiniteSearchTopics(searchVal);
            topicIndex !== 'all' && topicIndex !== 'etc' && infiniteIndexTopics(topicIndex);
            topicIndex === 'etc' && infiniteEtcIndexTopics();
        }
    }, [page]);

    return (
        <div className="w-full p-10">
            <div className="flex flex-col item-center mb-10">
                <h1 className="text-center mb-8">Explore topics</h1>
                <TextField
                    id="filled-basic"
                    value={searchVal}
                    onChange={e => handleSearch(e.target.value)}
                    placeholder="Enter topic..."
                    variant="filled"
                    sx={{
                        '& .MuiFilledInput-root': {
                            borderRadius: '30px',
                        },
                        '.MuiFilledInput-root::before': {
                            display: 'none',
                        },
                        '.MuiFilledInput-root::after': {
                            display: 'none',
                        },
                        '& .MuiFormLabel-root': {
                            left: '10px',
                        },
                        '.MuiInputBase-input': {
                            padding: '15px 0 15px 20px',
                        },
                    }}
                />
            </div>
            <div className="flex justify-between items-center w-full h-[32px]">
                <topicContext.Provider
                    value={{
                        tabContWidth,
                        tabWidth,
                        tabPosition,
                        setTabPosition,
                        topicIndex,
                        setTopicIndex,
                        setSearchVal,
                        handleIndex,
                        handleEtcIndex,
                    }}
                >
                    <IndexingComponent />
                </topicContext.Provider>
            </div>
            <div className="w-full mt-10">
                <listContext.Provider
                    value={{ allTopics, topics, topicIndex, handleIndex, handleEtcIndex }}
                >
                    <ListComponent />
                </listContext.Provider>
            </div>
            <div ref={obsRef} />
        </div>
    );
}
