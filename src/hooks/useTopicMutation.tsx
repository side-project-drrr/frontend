import { useMutation } from '@tanstack/react-query';
import { RefObject } from 'react';
import { useRecoilState } from 'recoil';
import { topicState } from '../recoil/atom/topicsState';
import {
    getEtcIndexTopicsApi,
    getIndexTopicsApi,
    getSearchTopicsApi,
} from '../service/TopicService';

export const useIndexTopicMutation = ({
    page,
    topicIndex,
    observationTarget,
    observer,
}: {
    page: number;
    topicIndex: string;
    observationTarget: RefObject<HTMLDivElement> | null;
    observer: IntersectionObserver;
}) => {
    const [, setTopics] = useRecoilState(topicState);

    const { mutate: indexMutate, isError: indexError } = useMutation({
        mutationFn: () => getIndexTopicsApi(page, topicIndex),
        onSuccess: res => {
            if (res.first) {
                setTopics(res.content);
            } else {
                setTopics(prev => [...prev, ...res.content]);
            }

            if (observationTarget?.current) {
                if (!res.last) {
                    observer.observe(observationTarget.current);
                }
            }
        },
    });

    return { indexMutate, indexError };
};

export const useEtcIndexTopicMutation = ({
    page,
    observationTarget,
    observer,
}: {
    page: number;
    observationTarget: RefObject<HTMLDivElement> | null;
    observer: IntersectionObserver;
}) => {
    const [, setTopics] = useRecoilState(topicState);

    const { mutate: etcIndexMutate, isError: etcIndexError } = useMutation({
        mutationFn: () => getEtcIndexTopicsApi(page),
        onSuccess: res => {
            if (res.first) {
                setTopics(res.content);
            } else {
                setTopics(prev => [...prev, ...res.content]);
            }

            if (observationTarget?.current) {
                if (!res.last) {
                    observer.observe(observationTarget.current);
                }
            }
        },
    });

    return { etcIndexMutate, etcIndexError };
};

export const useSearchTopicMutation = ({
    page,
    searchVal,
    observationTarget,
    observer,
}: {
    page: number;
    searchVal: string;
    observationTarget: RefObject<HTMLDivElement> | null;
    observer: IntersectionObserver;
}) => {
    const [, setTopics] = useRecoilState(topicState);

    const { mutate: searchMutate, isError: searchError } = useMutation({
        mutationFn: () => getSearchTopicsApi(page, searchVal),
        onSuccess: res => {
            if (res.first) {
                setTopics(res.content);
            } else {
                setTopics(prev => [...prev, ...res.content]);
            }

            if (observationTarget?.current) {
                if (!res.last) {
                    observer.observe(observationTarget.current);
                }
            }
        },
    });
    return { searchMutate, searchError };
};
