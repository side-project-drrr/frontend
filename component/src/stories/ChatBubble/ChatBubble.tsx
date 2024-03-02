import LanguageIcon from '@mui/icons-material/Language';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { isSearchClickedState } from '@monorepo/service/src/recoil/atom/isSearchClickedState';
import { useSetRecoilState } from 'recoil';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {
    getSearchListStorage,
    saveSearchListStorage,
} from '@monorepo/service/src/repository/SearchListRepository';

interface ISearchProps {
    onSearchResult: any;
    onSetSearchResult: React.Dispatch<React.SetStateAction<string[]>>;

    onSetSearchValue: React.Dispatch<React.SetStateAction<string>>;
    onSelectedSearchIndex: number;
}

const ChatBubble = ({
    onSearchResult,
    onSetSearchResult,
    onSelectedSearchIndex,
    onSetSearchValue,
}: ISearchProps) => {
    const setIsSearchClicked = useSetRecoilState(isSearchClickedState);

    const searchBoxRef = useRef<HTMLDivElement>(null);
    const KEY = 'search';

    const handleCloseSearchResult = (num: number) => {
        const getRecentSearchesData = getSearchListStorage(KEY);
        const filterRecentSearchesData = getRecentSearchesData.filter(
            (e: string, index: number) => index !== num,
        );
        onSetSearchResult(filterRecentSearchesData);
        saveSearchListStorage(KEY, filterRecentSearchesData);
    };

    useEffect(() => {
        // 검색 상자가 표시되면 외부 클릭을 감지하여 상자를 숨깁니다.
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchBoxRef.current &&
                !searchBoxRef.current.contains(event.target as HTMLElement)
            ) {
                setIsSearchClicked(false);
            }
        };

        // 페이지가 로드될 때 이벤트 리스너를 추가합니다.
        document.addEventListener('mousedown', handleClickOutside);

        // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    console.log(onSearchResult.length + 1);

    return (
        <div className="absolute z-10 mt-2 w-80" ref={searchBoxRef}>
            <div className="relative flex-1 p-2 mb-2 text-black bg-white rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col w-full p-2">
                        <h1 className="p-2 text-sm text-[#6B6B6B]">RECENT SEARCHES</h1>
                        <hr />
                        {onSearchResult.length !== 0 &&
                            onSearchResult?.map((value: string, index: number) => (
                                <div
                                    key={index}
                                    tabIndex={0}
                                    className={`flex items-center w-full gap-4 bg-opacity-20 
                                        ${index === onSelectedSearchIndex ? 'bg-gray-400' : ''}`}
                                    onClick={() => onSetSearchValue(value)}
                                >
                                    <Link
                                        to={`/search/${value}`}
                                        className="flex items-center w-full gap-2 p-4 text-black border-b-2 hover:text-black"
                                    >
                                        <p className="flex items-center w-full gap-4">
                                            <SearchIcon />
                                            {value}
                                        </p>
                                        <div className="flex justify-end w-full ">
                                            <CloseIcon
                                                sx={{ opacity: '50%' }}
                                                key={index}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    handleCloseSearchResult(index);
                                                }}
                                            />
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        <Link
                            to="/Exploretopics"
                            className={`flex items-center gap-2 p-4 text-black hover:text-black  ${
                                onSearchResult.length === onSelectedSearchIndex ? 'bg-gray-400' : ''
                            }`}
                            key={onSearchResult.length + 1}
                        >
                            <p className="flex items-center w-full gap-4 text-sm">
                                <LanguageIcon />
                                Explore topics
                            </p>
                            <CallMadeIcon />
                        </Link>
                    </div>
                </div>
                <div className="absolute left-5 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-white top-[-5px]"></div>
            </div>
        </div>
    );
};

export default ChatBubble;
