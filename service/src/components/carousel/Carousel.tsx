/* eslint-disable react/prop-types */
import { useState } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

type CarouselProps = {
    data: {
        id: number;
        url: string;
        title: string;
        content: string;
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

    return (
        <div className="relative overflow-hidden bg-red-500 h-80 w-96">
            {data.map(item => (
                <div
                    key={item.id}
                    className={`flex transition ease-out duration-400 w-full h-full`}
                    style={{ transform: `translateX(-${current * 100}%)` }}
                >
                    <img src={item.url} alt="추천 게시글" className="w-[10%] h-[10%]" />
                    <h3 aria-label="추천 게시글 제목">{item.title}</h3>
                    <p aria-label="추천 게시글 메인 컨텐츠">{item.content}</p>
                </div>
            ))}
            <div className="absolute top-0 flex items-center justify-between w-full h-full text-white">
                <button onClick={prevSlider}>
                    <RiArrowDropLeftLine />
                </button>
                <button onClick={nextSlider}>
                    <RiArrowDropRightLine />
                </button>
            </div>

            <div className="absolute bottom-0 flex justify-center w-full gap-4 py-1">
                {data.map((data, index) => (
                    <div
                        className={`w-2 h-2 cursor-pointer rounded-full ${
                            index === current ? 'bg-white' : 'bg-gray-500'
                        }`}
                        key={data.id}
                        onClick={() => {
                            setCurrent(data.id);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
