import { useRecoilValue, useSetRecoilState } from 'recoil';
import { HeaderSearchDataState } from '../recoil/atom/HeaderSearchDataState';
import { DisplayModeState } from '../recoil/atom/DisplayModeState';

import { useEffect, useRef, useState } from 'react';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { useLocation, useParams } from 'react-router-dom';
import { getSearchListStorage, saveSearchListStorage } from '../repository/SearchListRepository';
import DisplayModeSwitch from '../components/displaymodeswitch/DisplayModeSwitch';
import { getHeaderKeywordSearch } from '../service/HeaderSearchService';
import SearchListBox from '../stories/listbox/SearchListBox';

export default function HeaderSearchPage() {
    const techBlogSearchData = useRecoilValue(HeaderSearchDataState);
    const { search } = useParams();
    const displayMode = useRecoilValue(DisplayModeState);
    const [page, setPage] = useState(0);
    const KEY = 'search';
    const size = 10;
    const observationTarget = useRef(null);
    const setTechBlogSearchData = useSetRecoilState(HeaderSearchDataState);
    const { state } = useLocation();

    const onIntersect = async (entries: any, observer: any) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            setPage(prev => prev + 1);
        }
    };

    async function getKeywordSearchRender() {
        const keywordSearchData = await getHeaderKeywordSearch({
            page,
            size,
            searchValue: state,
        });
<<<<<<< HEAD
        setTechBlogSearchData(prev => [...prev, ...keywordSearchData.content]);

        if (keywordSearchData.content.length > 0) {
            if (observationTarget.current) {
                observer.observe(observationTarget.current);
            }
=======

        setTechBlogSearchData(prev => [...prev, ...keywordSearchData.content]);
        if (observationTarget.current) {
            observer.observe(observationTarget.current);
>>>>>>> 188e022 ( voc-18: intersection observer 무한 스크롤 관련 버그 해결)
        }
    }

    useEffect(() => {
        let searchItem = getSearchListStorage(KEY);
        searchItem.push(search);
        const uniqueSearch = Array.from(new Set(searchItem));
        saveSearchListStorage(KEY, uniqueSearch);
    }, [search]);

    const observer = new IntersectionObserver(onIntersect, { threshold: 0 });

    useEffect(() => {
        if (state.length > 0) getKeywordSearchRender();
    }, [page, state]);

    return (
        <div className="flex justify-between w-full">
            <div className="flex flex-col w-full gap-6">
                <div className="flex w-full">
                    <div className="flex justify-around w-full mt-5 ">
                        <h1 className="w-full max-[600px]:text-2xl overflow-hidden text-ellipsis whitespace-nowrap ml-8">
                            Results for {search}
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
<<<<<<< HEAD

                <div ref={observationTarget}>Loading...</div>
=======
                <div ref={observationTarget}>123</div>
>>>>>>> 188e022 ( voc-18: intersection observer 무한 스크롤 관련 버그 해결)
            </div>
        </div>
    );
}
