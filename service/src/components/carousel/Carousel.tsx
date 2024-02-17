import { useState, useRef, MouseEvent, useCallback } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { CarouselProps } from './type';

export default function Carousel({ data }: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const [isDrag, setIsDrag] = useState(false);
    const [startX, setStartX] = useState<number>(0);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const delay = 50;

    const prevSlider = () => {
        setCurrent(current === 0 ? data.length - 1 : current - 1);
    };
    const nextSlider = () => {
        setCurrent(current === data.length - 1 ? 0 : current + 1);
    };

    const onDragStart = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setIsDrag(true);
        if (scrollRef.current) {
            setStartX(e.pageX + scrollRef.current.scrollLeft);
        }
    };
    const onDragEnd = () => {
        setIsDrag(false);
    };

    const onDragMove = useCallback(
        (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            if (isDrag) {
                const { scrollWidth, clientWidth, scrollLeft }: any = scrollRef.current;
                if (scrollRef.current) {
                    scrollRef.current.scrollLeft = startX - e.pageX;
                }

                if (scrollLeft === 0) {
                    setStartX(e.pageX); //가장 왼쪽일 때, 움직이고 있는 마우스의 x좌표가 곧 startX로 설정.
                } else if (scrollWidth <= clientWidth + scrollLeft) {
                    setStartX(e.pageX + scrollLeft); //가장 오른쪽일 때, 움직이고 있는 마우스의 x좌표에 현재 스크롤된 길이 scrollLeft의 합으로 설정
                }
            }
        },
        [isDrag, startX],
    );

    const handleOnMouseMove = () => {
        return isDrag ? onThrottleDragMove : undefined;
    };
    // 쓰로틀 구현
    const throttle = (func: any, ms: number) => {
        let throttled = false;
        return (...args: any[]) => {
            if (!throttled) {
                throttled = true;
                setTimeout(() => {
                    func(...args);
                    throttled = false;
                }, ms);
            }
        };
    };

    const onThrottleDragMove = throttle(onDragMove, delay);
    return (
        <div
            className={`relative flex  overflow-hidden rounded-md w-full will-change-transform dark:bg-[#363D4B] bg-[#363D4B] h-60 m-0 p-0 `}
            onMouseDown={onDragStart}
            onMouseMove={handleOnMouseMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            aria-label="추천 게시글"
            ref={scrollRef}
        >
            <div
                className={`transition ease-out duration-400 absolute flex w-screen`}
                style={{ transform: `translateX(-${current * 25}%)` }}
            >
                {data.map((item: any) => (
                    <div key={item.techBlogPostBasicInfoDto.id} className="flex flex-col h-[25vh] ">
                        <h3
                            aria-label="추천 게시글 제목"
                            className="justify-center w-full text-base  inline-flex"
                        >
                            {item.techBlogPostBasicInfoDto.title.slice(0, 30)}...
                        </h3>
                        <div className="flex justify-around flex-1 w-[480px]">
                            <div className="w-full  flex flex-wrap">
                                <p
                                    aria-label="추천 게시글 메인 컨텐츠"
                                    className="flex flex-wrap w-full mt-5 ml-10 text-sm "
                                >
                                    {item.techBlogPostBasicInfoDto.summary.slice(0, 60)}...
                                </p>
                            </div>

                            <div className="flex w-full items-center">
                                <img
                                    src={item.techBlogPostBasicInfoDto.thumbnailUrl}
                                    alt="추천 게시글"
                                    className="w-full rounded-lg h-[100px] "
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 ml-10 dark:text-white mb-5 flex-col">
                            <div>
                                <ul className="flex gap-4 overflow-hidden flex-1">
                                    {item.categoryDto?.map((item: any, index: number) =>
                                        index < 3 ? (
                                            <li
                                                key={item.id}
                                                id={item.id}
                                                className="text-sm flex-1 flex"
                                            >
                                                #{item.name}
                                            </li>
                                        ) : (
                                            <></>
                                        ),
                                    )}
                                </ul>
                            </div>
                            <div className="flex">
                                <p
                                    className="text-xs text-black dark:text-white"
                                    aria-label="좋아요"
                                >
                                    좋아요: {item.techBlogPostBasicInfoDto.viewCount}
                                </p>
                                <p
                                    className="text-xs text-black dark:text-white"
                                    aria-label="조회수"
                                >
                                    조회 수: {item.techBlogPostBasicInfoDto.viewCount}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={`absolute bottom-0 flex items-center justify-between  h-full text-black dark:text-white w-full`}
            >
                <RiArrowDropLeftLine onClick={prevSlider} size={30} />
                <RiArrowDropRightLine onClick={nextSlider} size={30} />
            </div>
            <div className={`absolute bottom-0 flex justify-center gap-4 py-1 w-full `}>
                {data.map((data, index) => (
                    <div
                        className={`w-2 h-2 cursor-pointer rounded-full ${
                            index === current ? 'bg-white' : 'bg-[#005FEE]'
                        } `}
                        key={data.id}
                        onClick={() => {
                            setCurrent(index);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
