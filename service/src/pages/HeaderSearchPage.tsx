import { useSetRecoilState, useRecoilValue } from 'recoil';
import { HeaderSearchDataState } from '../recoil/atom/HeaderSearchDataState';
import { DisplayModeState } from '../recoil/atom/DisplayModeState';

import { useCallback, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { PageState } from '../recoil/atom/PageState';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useParams } from 'react-router-dom';
import { getSearchListStorage, saveSearchListStorage } from '../repository/SearchListRepository';
import DisplayModeSwitch from '../components/displaymodeswitch/DisplayModeSwitch';
import ConditionalRenderer from '../components/conditionalrenderer/ConditionalRenderer';

export default function HeaderSearchPage() {
    const techBlogSearchData = useRecoilValue(HeaderSearchDataState);
    const { search } = useParams();
    const displayMode = useRecoilValue(DisplayModeState);

    const setPage = useSetRecoilState(PageState);
    const KEY = 'search';
    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [techBlogSearchData]);

    useEffect(() => {
        let searchItem = getSearchListStorage(KEY);
        searchItem.push(search);
        const uniqueSearch = Array.from(new Set(searchItem));
        saveSearchListStorage(KEY, uniqueSearch);
    }, [search]);

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);

    return (
        <div className="flex justify-between w-full">
            <div className="flex flex-col w-full gap-6">
                <div className="flex w-full">
                    <div className="flex justify-around w-full mt-5 ">
                        <h1 className="w-full">Results for {search}</h1>
                        <DisplayModeSwitch />
                    </div>
                </div>
                <div
                    className={`${
                        displayMode ? 'flex w-full gap-6 flex-col' : 'flex w-full gap-6 flex-wrap'
                    } `}
                >
                    {techBlogSearchData.length !== 0 ? (
                        <ConditionalRenderer items={techBlogSearchData} />
                    ) : (
                        <div className="flex justify-center w-full h-[80vh] items-center flex-col">
                            <QuestionMarkIcon sx={{ fontSize: '100px' }} />
                            <p className="">검색된 결과가 없습니다.</p>
                        </div>
                    )}
                </div>
                <div ref={setObservationTarget} />
            </div>
        </div>
    );
}
