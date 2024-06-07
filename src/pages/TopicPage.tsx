import { useEffect, useRef, useState } from 'react';
import IndexingComponent from '../components/topics/Indexing';
import ListComponent from '../components/topics/List';
import {
    getEtcIndexTopicsApi,
    getIndexTopicsApi,
    getSearchTopicsApi,
} from '../service/TopicService';
import { useRecoilState } from 'recoil';
import { searchValueState, topicIndexState, topicState } from '../recoil/atom/topicsState';
import { inputEl } from '../style/style';
import { useMutation } from '@tanstack/react-query';

export default function TopicPage() {
    const [, setTopics] = useRecoilState(topicState);
    const [page, setPage] = useState<number>(0);
    const [topicIndex, setTopicIndex] = useRecoilState(topicIndexState);
    const [searchVal, setSearchVal] = useRecoilState(searchValueState);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const observationTarget = useRef(null);

    const onIntersect = async (entries: any, observer: any) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            setPage(prev => prev + 1);
        }
    };

    const observer = new IntersectionObserver(onIntersect, { threshold: 0 });

    const { mutate: indexMutate, isError: indexError } = useMutation({
        mutationFn: () => getIndexTopicsApi(page, topicIndex),
        onSuccess: res => {
            if (res.first) {
                setTopics(res.content);
            } else {
                setTopics(prev => [...prev, ...res.content]);
            }

            if (observationTarget.current) {
                if (!res.last) {
                    observer.observe(observationTarget.current);
                }
            }
        },
    });

    const { mutate: etcIndexMutate, isError: etcIndexError } = useMutation({
        mutationFn: () => getEtcIndexTopicsApi(page),
        onSuccess: res => {
            if (res.first) {
                setTopics(res.content);
            } else {
                setTopics(prev => [...prev, ...res.content]);
            }

            if (observationTarget.current) {
                if (!res.last) {
                    observer.observe(observationTarget.current);
                }
            }
        },
    });

    const { mutate: searchMutate, isError: searchError } = useMutation({
        mutationFn: () => getSearchTopicsApi(page, searchVal),
        onSuccess: res => {
            if (res.first) {
                setTopics(res.content);
            } else {
                setTopics(prev => [...prev, ...res.content]);
            }

            if (observationTarget.current) {
                if (!res.last) {
                    observer.observe(observationTarget.current);
                }
            }
        },
    });

    // 검색 기능 디바운스를 사용하여 함수 실행 지연
    function handleSearch(value: string) {
        setSearchVal(value);
        setPage(0);
        setTopicIndex('');
    }

    // 인덱스 topic 무한 스크롤
    async function infiniteIndexTopics() {
        if (topicIndex === '기타') {
            etcIndexMutate();
        } else {
            indexMutate();
        }
    }

    // 인덱스별 topic 호출
    async function handleIndex(index: string) {
        setSearchVal('');
        setPage(0);

        if (index === '기타') {
            setTopicIndex('기타');
        } else {
            setTopicIndex(index);
        }
    }

    useEffect(() => {
        if (topicIndex !== 'all' && topicIndex !== '') {
            infiniteIndexTopics();
        }
    }, [page, topicIndex]);

    useEffect(() => {
        if (searchVal) {
            if (page === 0) {
                if (timer) {
                    clearTimeout(timer);
                }

                const newTimer = setTimeout(() => {
                    searchMutate();
                }, 800);

                setTimer(newTimer);
            } else {
                searchMutate();
            }
        }
    }, [page, searchVal]);

    if (indexError || etcIndexError || searchError) return '에러가 발생했습니다.';

    return (
        <div className="w-full p-10">
            <div className="flex flex-col mb-10 item-center">
                <h1 className="mb-8 text-center">Explore topics</h1>
                <InputBase
                    type="text"
                    value={searchVal}
                    placeholder="Enter topic..."
                    onChange={e => handleSearch(e.target.value)}
                    style={{ width: '100%' }}
                    slots={{ input: inputEl }}
                    inputProps={{ maxLength: 50 }}
                />
            </div>
            <div className="flex justify-between items-center w-full h-[32px]">
                <IndexingComponent onHandleIndex={handleIndex} />
            </div>
            <div className="w-full mt-10">
                <ListComponent onHandleIndex={handleIndex} />
            </div>
            <div ref={observationTarget} />
        </div>
    );
}
