import { useEffect, useRef, useState } from 'react';
import IndexingComponent from '../components/topics/Indexing';
import ListComponent from '../components/topics/List';
import { useRecoilState } from 'recoil';
import { searchValueState, topicIndexState } from '../recoil/atom/topicsState';
import { inputEl } from '../style/style';
import { InputBase } from '@mui/material';
import {
    useAllIndexTopicQuery,
    useEtcIndexTopicInfinite,
    useIndexTopicInfinite,
    useSearchTopicInfinite,
} from '../hooks/useTopicMutation';
import { useQueryClient } from '@tanstack/react-query';

export default function TopicPage() {
    const [topicIndex, setTopicIndex] = useRecoilState(topicIndexState);
    const [searchVal, setSearchVal] = useRecoilState(searchValueState);
    const observationTarget = useRef<HTMLDivElement | null>(null);
    const queryClient = useQueryClient();
    const [timer, setTimer] = useState<NodeJS.Timeout>();

    // index가 all인 경우
    const { allTopics, err: allError } = useAllIndexTopicQuery();

    // index가 선택된 경우 (all 제외)
    const {
        error: indexError,
        refetch: indexRefetch,
        indexUnobserve,
    } = useIndexTopicInfinite({
        topicIndex,
        observationTarget,
    });

    const {
        error: etcIndexError,
        refetch: etcRefetch,
        indexEtcUnobserve,
    } = useEtcIndexTopicInfinite({
        observationTarget,
    });

    const {
        error: searchError,
        refetch: searchRefetch,
        searchUnobserve,
    } = useSearchTopicInfinite({
        searchVal,
        observationTarget,
    });

    const unobserveFn = () => {
        indexUnobserve();
        indexEtcUnobserve();
        searchUnobserve();
    };

    const resetAndFetchFirstPage = (key: [string, string?]) => {
        queryClient.removeQueries({ queryKey: key });
    };

    // 검색 기능 디바운스를 사용하여 함수 실행 지연
    function handleSearch(value: string) {
        setSearchVal(value);
        setTopicIndex('');
    }

    // 인덱스별 topic 호출
    async function handleIndex(index: string) {
        setSearchVal('');
        setTopicIndex(index);
    }

    useEffect(() => {
        unobserveFn();

        if (searchVal) {
            if (timer) {
                clearTimeout(timer);
            }

            const newTimer = setTimeout(() => {
                resetAndFetchFirstPage(['searchTopic', searchVal]);
                searchRefetch();
            }, 800);

            setTimer(newTimer);
        }
    }, [searchVal]);

    useEffect(() => {
        unobserveFn();

        if (topicIndex) {
            if (topicIndex !== 'all') {
                if (topicIndex === '기타') {
                    resetAndFetchFirstPage(['etcIndexTopic']);
                    etcRefetch();
                } else {
                    resetAndFetchFirstPage(['indexTopic', topicIndex]);
                    indexRefetch();
                }
            }
        }
    }, [topicIndex]);

    if (allError || indexError || etcIndexError || searchError) return '에러가 발생했습니다.';

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
                <ListComponent onHandleIndex={handleIndex} allTopics={allTopics} />
            </div>
            <div ref={observationTarget} />
        </div>
    );
}
