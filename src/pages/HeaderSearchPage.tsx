import { useRecoilValue, useSetRecoilState } from 'recoil';
import { HeaderSearchDataState } from '../recoil/atom/HeaderSearchDataState';
import { DisplayModeState } from '../recoil/atom/DisplayModeState';

import { useEffect, useState } from 'react';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useLocation } from 'react-router-dom';
import { getSearchListStorage, saveSearchListStorage } from '../repository/SearchListRepository';
import DisplayModeSwitch from '../components/displaymodeswitch/DisplayModeSwitch';
import { getHeaderKeywordSearch } from '../service/HeaderSearchService';
import SearchListBox from '../stories/listbox/SearchListBox';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

export default function HeaderSearchPage() {
    const techBlogSearchData = useRecoilValue(HeaderSearchDataState);
    const displayMode = useRecoilValue(DisplayModeState);
    const [page, setPage] = useState(0);
    const KEY = 'search';
    const size = 10;
    const setTechBlogSearchData = useSetRecoilState(HeaderSearchDataState);
    const { state } = useLocation();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    async function getKeywordSearchRender() {
        setIsFetching(true);
        const keywordSearchData = await getHeaderKeywordSearch({
            page,
            size,
            searchValue: state,
        });
        setTechBlogSearchData(prev => [...prev, ...keywordSearchData.content]);
        setHasMore(!keywordSearchData.last);

        setIsFetching(false);
    }

    useEffect(() => {
        let searchItem = getSearchListStorage(KEY);
        searchItem.push(state);
        const uniqueSearch = Array.from(new Set(searchItem));
        saveSearchListStorage(KEY, uniqueSearch);
    }, [state]);

    useEffect(() => {
        if (state.length > 0) getKeywordSearchRender();
    }, [page, state]);

    const loaderRef = useIntersectionObserver(entries => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    });

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

                <div ref={loaderRef}>
                    {isFetching && 'Loading more items...'}
                    {!hasMore && 'No more items to load'}
                </div>
            </div>
        </div>
    );
}
