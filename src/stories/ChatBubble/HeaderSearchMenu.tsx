import LanguageIcon from '@mui/icons-material/Language';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { isSearchFocusedState } from '../../recoil/atom/isSearchFocusedState';
import { useSetRecoilState } from 'recoil';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { getSearchListStorage, saveSearchListStorage } from '../../repository/SearchListRepository';

interface ISearchProps {
    onSearchResult: any;
    onSetSearchResult: React.Dispatch<React.SetStateAction<string[]>>;

    onSetSearchValue: React.Dispatch<React.SetStateAction<string>>;
    onSelectedSearchIndex: number;
}

export default function HeaderSearchMenu({
    onSearchResult,
    onSetSearchResult,
    onSelectedSearchIndex,
    onSetSearchValue,
}: ISearchProps) {
    const setIsSearchClicked = useSetRecoilState(isSearchFocusedState);
    const searchBoxRef = useRef<HTMLDivElement>(null);
    const KEY = 'search';

    const handleCloseSearchResult = (num: number) => {
        const getRecentSearchesData = getSearchListStorage(KEY);
        onSetSearchValue('');
        const filterRecentSearchesData = getRecentSearchesData.filter(
            (_: string, index: number) => index !== num,
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

    return (
        <div className="absolute z-10 mt-2 w-80 max-[600px]:w-60" ref={searchBoxRef}>
            <div className="relative flex-1 p-2 mb-2 text-black bg-white rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col w-full p-2">
                        <h1 className="p-2 text-sm text-[#6B6B6B]">RECENT SEARCHES</h1>
                        <hr />
                        {onSearchResult.length !== 0 &&
                            onSearchResult?.map((value: string, index: number) => (
                                <div
                                    key={index}
                                    className={`flex items-center w-full gap-4 bg-opacity-20  border-b-2 
                                        ${index === onSelectedSearchIndex ? 'bg-gray-400' : ''}`}
                                >
                                    <Link
                                        to={`/search/${value}`}
                                        className="flex items-center w-full gap-2 p-4 text-black hover:text-black"
                                        onClick={() => onSetSearchValue(value)}
                                    >
                                        <p className="flex items-center w-full gap-4">
                                            <SearchIcon />
                                            {value}
                                        </p>
                                    </Link>
                                    <div className="flex justify-end w-full pr-4">
                                        <CloseIcon
                                            sx={{ opacity: '50%' }}
                                            key={index}
                                            onClick={(e: any) => {
                                                e.preventDefault();
                                                handleCloseSearchResult(index);
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}

                        <Link
                            to="/topics"
                            className={`flex items-center gap-2 p-4 text-black hover:text-black `}
                            onClick={() => setIsSearchClicked(false)}
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
}
