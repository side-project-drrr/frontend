/* eslint-disable react/prop-types */
import { useState } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

type CarouselProps = {
    data: {
        id: number;
        url: string;
        title: string;
        content: string;
        bookmark: number;
        views: number;
    }[];
};

export default function Carousel({ data }: CarouselProps) {
    const [current, setCurrent] = useState(0);

    const prevSlider = () => {
        if (current === 0) setCurrent(data.length - 1);
        else setCurrent(current - 1);
    };
    const nextSlider = () => {
        if (current === data.length - 1) setCurrent(0);
        else setCurrent(current + 1);
    };
    console.log(current);
    console.log(data);
    return (
        <div className="relative flex overflow-hidden rounded-md">
            <div className={`transition ease-out duration-400 flex `}>
                {data.map(item => (
                    <div
                        key={item.id}
                        style={{ transform: `translateX(-${current * 100}%)` }}
                        className="w-[370px] h-[170px] relative flex flex-col dark-box-bg bg-white pl-2 pr-2 justify-around text-center"
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
                            <p className="text-xs text-black">좋아요: {item.bookmark}</p>
                            <p className="text-xs text-black">조회 수: {item.views}</p>
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
                            index === current ? 'bg-white' : 'bg-gray-500'
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
