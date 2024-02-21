import LanguageIcon from '@mui/icons-material/Language';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { isSearchClickedState } from '@monorepo/service/src/recoil/atom/isSearchClickedState';
import { useSetRecoilState } from 'recoil';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

export default function ChatBubble({ onSearchValue }: any) {
    console.log(onSearchValue);
    const setIsSearchClicked = useSetRecoilState(isSearchClickedState);
    const searchBoxRef = useRef<HTMLDivElement>(null);

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
        <div className="absolute z-10 flex mt-2" ref={searchBoxRef}>
            <div className="relative flex-1 p-2 mb-2 text-black bg-white rounded-lg w-96">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center justify-around w-full gap-2 p-4 flex-col">
                        <div>
                            {onSearchValue.length !== 1 &&
                                onSearchValue?.map((value: string, index: number) => (
                                    <p key={index}>{value}</p>
                                ))}
                        </div>
                        <hr />
                        <Link
                            to="/Exploretopics"
                            className="flex items-center gap-2 text-black hover:text-black"
                        >
                            <p className="flex items-center gap-2 ">
                                <LanguageIcon />
                                Explore topics
                            </p>
                            <div>
                                <CallMadeIcon />
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="absolute left-5 w-3 h-3 transform rotate-45 -translate-x-1/2 bg-white top-[-5px]"></div>
            </div>
        </div>
    );
}
