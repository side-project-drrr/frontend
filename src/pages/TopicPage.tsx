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
import { Input } from '@mui/base';
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
            setTimeout(() => {
                observer.observe(entry.target);
            }, 800);
        }
    };

    const observer = new IntersectionObserver(onIntersect, { threshold: 0 });

    const { mutate: indexMutate, isError: indexError } = useMutation({
        mutationFn: ({ page, index }: { page: number; index: string }) =>
            getIndexTopicsApi(page, index),
        onSuccess: res => {
            if (res.first) {
                setTopics(res.content);
            } else {
                setTopics(prev => [...prev, ...res.content]);
            }

            if (!res.last) {
                if (observationTarget.current) observer.observe(observationTarget.current);
            }
        },
    });

    const { mutate: etcIndexMutate, isError: etcIndexError } = useMutation({
        mutationFn: (page: number) => getEtcIndexTopicsApi(page),
        onSuccess: res => {
            if (res.first) {
                setTopics(res.content);
            } else {
                setTopics(prev => [...prev, ...res.content]);
            }

            if (!res.last) {
                if (observationTarget.current) observer.observe(observationTarget.current);
            }
        },
    });

    // 검색 topic 무한 스크롤
    async function infiniteSearchTopics(value: string) {
        const res = await getSearchTopicsApi(page, value);

        if (res.status === 200) {
            setTopics(prev => [...prev, ...res.data.content]);
        }
    }

    // 검색 기능 디바운스를 사용하여 함수 실행 지연
    function handleSearch(value: string) {
        if (timer) {
            clearTimeout(timer);
        }

        setSearchVal(value);
        const newTimer = setTimeout(() => {
            setPage(0);
            setTopicIndex('');

            callApi(value);
        }, 500);

        setTimer(newTimer);
    }
    async function callApi(value: string) {
        const res = await getSearchTopicsApi(page, value);

        if (res.status === 200) {
            setTopics(res.data.content);
        }
    }

    // 인덱스 topic 무한 스크롤
    async function infiniteIndexTopics(index: string) {
        if (index === '기타') {
            etcIndexMutate(0);
        } else {
            indexMutate({ page: 0, index: index });
        }
    }

    // 인덱스별 topic 호출
    async function handleIndex(index: string) {
        setSearchVal('');
        setPage(0);

        if (index === '기타') {
            setTopicIndex('기타');
            etcIndexMutate(0);
        } else {
            setTopicIndex(index);
            indexMutate({ page: 0, index: index });
        }
    }

    useEffect(() => {
        if (page > 0) {
            searchVal && infiniteSearchTopics(searchVal);
            topicIndex !== 'all' && topicIndex !== '' && infiniteIndexTopics(topicIndex);
        }
    }, [page]);

    return (
        <div className="w-full p-10">
            <div className="flex flex-col mb-10 item-center">
                <h1 className="mb-8 text-center">Explore topics</h1>
                <Input
                    type="text"
                    value={searchVal}
                    placeholder="Enter topic..."
                    onChange={e => handleSearch(e.target.value)}
                    style={{ width: '100%' }}
                    slots={{ input: inputEl }}
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
