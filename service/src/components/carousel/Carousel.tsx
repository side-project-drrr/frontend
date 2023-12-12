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
            className="relative flex overflow-hidden rounded-md w-[100%] will-change-transform"
            ref={scrollRef}
            onMouseDown={onDragStart}
            onMouseMove={handleOnMouseMove}
            onMouseUp={onDragEnd}
            onMouseLeave={onDragEnd}
            aria-label="추천 게시글"
        >
            <div className={`transition ease-out duration-400 flex`}>
                {data.map(item => (
                    <div
                        key={item.id}
                        style={{ transform: `translateX(-${current * 100}%)` }}
                        className="w-[23vw] h-[200px] relative flex flex-col dark-box-bg bg-white pl-2 pr-2 justify-around text-center overflow-x-scroll"
                    >
                        <h3 aria-label="추천 게시글 제목" className="w-full text-sm text-black ">
                            {item.title}
                        </h3>
                        <div className="flex justify-between">
                            <div className="w-[50%]">
                                <p
                                    aria-label="추천 게시글 메인 컨텐츠"
                                    className="w-full text-xs text-left text-black"
                                >
                                    {item.content}
                                </p>
                            </div>
                            <div className="w-[50%]">
                                <img
                                    src={item.url}
                                    alt="추천 게시글"
                                    className="w-full h-[100%] text-black"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <p className="text-xs text-black" aria-label="좋아요">
                                좋아요: {item.bookmark}
                            </p>
                            <p className="text-xs text-black" aria-label="조회수">
                                조회 수: {item.views}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-0 flex items-center justify-between w-full h-full text-black">
                <RiArrowDropLeftLine onClick={prevSlider} />
                <RiArrowDropRightLine onClick={nextSlider} />
            </div>
            <div className="absolute bottom-0 flex justify-center w-full gap-4 py-1">
                {data.map((data, index) => (
                    <div
                        className={`w-2 h-2 cursor-pointer rounded-full ${
                            index === current ? 'bg-black' : 'bg-gray-500'
                        }`}
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
