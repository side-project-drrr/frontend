import { useRecoilState, useRecoilValue } from 'recoil';
import { HeaderSearchDataState } from '../recoil/atom/HeaderSearchDataState';
import { DisplayModeState } from '../recoil/atom/DisplayModeState';

import { useEffect, useRef } from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useLocation } from 'react-router-dom';
import { getSearchListStorage, saveSearchListStorage } from '../repository/SearchListRepository';
import DisplayModeSwitch from '../components/displaymodeswitch/DisplayModeSwitch';
import SearchListBox from '../stories/listbox/SearchListBox';
import { useHeaderSearchQuery } from '../hooks/useHeaderSearchQuery';

export default function HeaderSearchPage() {
    const displayMode = useRecoilValue(DisplayModeState);
    const KEY = 'search';

    const { state } = useLocation();
    const [techBlogSearchData, setTechBlogSearchData] = useRecoilState(HeaderSearchDataState);

    const observerElem = useRef<HTMLDivElement | null>(null);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useHeaderSearchQuery(state);

    useEffect(() => {
        let searchItem = getSearchListStorage(KEY);
        searchItem.push(state);
        const uniqueSearch = Array.from(new Set(searchItem));
        saveSearchListStorage(KEY, uniqueSearch);
    }, [state]);

    useEffect(() => {
        if (state.length > 0 && data) {
            const allposts = data.pages.flatMap(value => value.content);
            setTechBlogSearchData(allposts);
        }
    }, [state, data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                threshold: 1.0,
            },
        );

        if (observerElem.current) {
            observer.observe(observerElem.current);
        }

        return () => {
            if (observerElem.current) {
                observer.unobserve(observerElem.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
        <div className="flex justify-between w-full">
            <div className="flex flex-col w-full gap-6">
                <div className="flex w-full">
                    <div className="flex justify-around w-full mt-5">
                        <h1 className="w-full max-[600px]:text-2xl overflow-hidden text-ellipsis whitespace-nowrap ml-8 h-[70px] ">
                            Results for {state}
                        </h1>
                        <DisplayModeSwitch />
                    </div>
                </div>
                <div
                    className={`${
                        displayMode ? 'flex w-full gap-6 flex-col' : 'flex w-full gap-6 flex-wrap'
                    } `}
                >
                    {techBlogSearchData.length !== 0 ? (
                        <SearchListBox />
                    ) : (
                        <div className="flex justify-center w-full h-[80vh] items-center flex-col">
                            <QuestionMarkIcon sx={{ fontSize: '100px' }} />
                            <p>검색된 결과가 없습니다.</p>
                        </div>
                    )}
                </div>
                <div ref={observerElem}>
                    {isFetchingNextPage && hasNextPage ? 'Loading more...' : 'Data does not exist'}
                </div>
            </div>
        </div>
    );
}
