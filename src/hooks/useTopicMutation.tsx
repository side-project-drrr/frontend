import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { topicState } from '../recoil/atom/topicsState';
import {
    getEtcIndexTopicsApi,
    getIndexTopicsApi,
    getRangeEngApi,
    getRangeEtcApi,
    getRangeKorApi,
    getSearchTopicsApi,
} from '../service/TopicService';
import { allTopicsType } from 'components/topics/type';

// index가 all인 경우
export const useAllIndexTopicQuery = () => {
    const [allTopics, setAllTopics] = useState<allTopicsType[]>([]);
    const [err, setErr] = useState<string>('');

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

    if (koError || enError || etcError) setErr('에러가 발생했습니다.');

    return { allTopics, err };
};

// index를 선택한 경우 (all 제외), observer 설정, topic 설정
export const useIndexTopicInfinite = ({
    topicIndex,
    observationTarget,
}: {
    topicIndex: string;
    observationTarget: RefObject<HTMLDivElement> | null;
}) => {
    const [, setTopics] = useRecoilState(topicState);
    const observerIndex = useRef<IntersectionObserver | null>(null);

    const { data, error, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['indexTopic', topicIndex],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await getIndexTopicsApi(pageParam!, topicIndex!);
            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.last) return undefined;
            return pages.length;
        },
        enabled: false,
    });

    const indexUnobserve = () => {
        if (!observationTarget?.current) return;
        observerIndex?.current?.unobserve(observationTarget.current);
    };

    useEffect(() => {
        let list = data?.pages;

        if (list) {
            // 리스트에 더해줘야함
            const newTopic = list.flatMap(page => page.content);
            setTopics(newTopic);
        }
    }, [data]);

    useEffect(() => {
        if (!observationTarget?.current) return;

        observerIndex.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 },
        );

        observerIndex.current.observe(observationTarget.current);

        return () => observerIndex.current?.disconnect();
    }, [fetchNextPage, hasNextPage, observationTarget]);

    return { error, refetch, indexUnobserve };
};

// 기타 index를 선택한 경우
export const useEtcIndexTopicInfinite = ({
    observationTarget,
}: {
    observationTarget: RefObject<HTMLDivElement> | null;
}) => {
    const [, setTopics] = useRecoilState(topicState);
    const observerEtcIndex = useRef<IntersectionObserver | null>(null);

    const { data, error, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['etcIndexTopic'],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await getEtcIndexTopicsApi(pageParam!);
            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.last) return undefined;
            return pages.length;
        },
        enabled: false,
    });

    const indexEtcUnobserve = () => {
        if (!observationTarget?.current) return;
        observerEtcIndex?.current?.unobserve(observationTarget.current);
    };

    useEffect(() => {
        let list = data?.pages;

        if (list) {
            // 리스트에 더해줘야함
            const newTopic = list.flatMap(page => page.content);
            setTopics(newTopic);
        }
    }, [data]);

    useEffect(() => {
        if (!observationTarget?.current) return;

        observerEtcIndex.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 },
        );

        observerEtcIndex.current.observe(observationTarget.current);

        return () => observerEtcIndex.current?.disconnect();
    }, [fetchNextPage, hasNextPage, observationTarget]);

    return { error, refetch, indexEtcUnobserve };
};

// 검색으로 topic 검색
export const useSearchTopicInfinite = ({
    searchVal,
    observationTarget,
}: {
    searchVal: string;
    observationTarget: RefObject<HTMLDivElement> | null;
}) => {
    const [, setTopics] = useRecoilState(topicState);
    const observerSearchIndex = useRef<IntersectionObserver | null>(null);

    const { data, error, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
        queryKey: ['searchTopic', searchVal],
        queryFn: async ({ pageParam = 0 }) => {
            const data = await getSearchTopicsApi(pageParam!, searchVal);
            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.last) return undefined;
            return pages.length;
        },
        enabled: false,
    });

    const searchUnobserve = () => {
        if (!observationTarget?.current) return;
        observerSearchIndex?.current?.unobserve(observationTarget.current);
    };

    useEffect(() => {
        let list = data?.pages;

        if (list) {
            // 리스트에 더해줘야함
            const newTopic = list.flatMap(page => page.content);
            setTopics(newTopic);
        }
    }, [data]);

    useEffect(() => {
        if (!observationTarget?.current) return;

        observerSearchIndex.current = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 },
        );

        observerSearchIndex.current.observe(observationTarget.current);

        return () => observerSearchIndex.current?.disconnect();
    }, [fetchNextPage, hasNextPage, observationTarget]);

    return { error, refetch, searchUnobserve };
};
