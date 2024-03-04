import { useRef, useState, SetStateAction } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { Button } from '@mui/base/Button';
import AddIcon from '@mui/icons-material/Add';
import UserCategoryModal from '../modal/UserCategoryModal';

interface CarouselProps {
    items: {
        id: string;
        name: string;
    }[];
    onModalOpen: boolean;
    onClose: () => void;
    onHandleModalOpen?: () => void;
    userGetCategoryRender: () => void;
    onUserFilterTechBlogRender: any;
    onSetCategoryId: React.Dispatch<SetStateAction<number>>;
    onCategoryId: number;
    onUserTechBlogRender: () => void;
    onSetPage: React.Dispatch<SetStateAction<number>>;
    onSetObservationTarget: any;
    onSetFilterTechBlogData: any;
}

export default function CategorySlide({
    items,
    onHandleModalOpen,
    onModalOpen,
    onClose,
    userGetCategoryRender,
    onUserFilterTechBlogRender,
    onSetCategoryId,
    onCategoryId,
    onUserTechBlogRender,
    onSetPage,

    onSetFilterTechBlogData,
}: CarouselProps) {
    const [current, setCurrent] = useState(0);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const prevSlider = () => {
        setCurrent(current === 0 ? items.length - 1 : current - 1);
    };
    const nextSlider = () => {
        setCurrent(current === items.length - 1 ? 0 : current + 1);
    };

    const handleUserCategoryId = (id: string) => {
        const numberId = parseInt(id, 10);
        if (Number(numberId !== 0)) {
            onUserFilterTechBlogRender(id);
            onSetCategoryId(numberId);
            onSetPage(0);
            onSetFilterTechBlogData([]);
        } else {
            onUserTechBlogRender();
            onSetCategoryId(numberId);
            onSetPage(0);
            onSetFilterTechBlogData([]);
        }
    };

    const ALLCATEGORYNUM = '0';
    return (
        <>
            <div>
                {current !== 0 && (
                    <RiArrowDropLeftLine
                        onClick={prevSlider}
                        size={40}
                        aria-label="왼쪽으로 넘기기"
                    />
                )}
            </div>
            <div
                className={`relative flex w-full overflow-hidden justify-between items-center`}
                ref={scrollRef}
                aria-label="선호 카테고리"
            >
                <div
                    className={` transition ease-out duration-400 absolute flex justify-center items-center`}
                    style={{ transform: `translate3d(-${current * 30}px,0px,0px)` }}
                >
                    <div className="flex items-center w-full">
                        <Button
                            className="text-[#006FEE] w-14 h-7 text-center text-xs flex items-center justify-start"
                            onClick={onHandleModalOpen}
                            role="Button"
                            aria-label="카테고리추가 버튼"
                        >
                            <AddIcon />
                        </Button>
                        <div className={`relative flex dark-box-bg pl-2 pr-2 text-center `}>
                            <Button
                                id={ALLCATEGORYNUM}
                                className={`flex bg-[#E6F1FE] text-[#006FEE] p-1 rounded-lg  items-center w-20 text-center justify-center ${
                                    Number(ALLCATEGORYNUM) === onCategoryId
                                        ? 'bg-[#005FEE] text-white'
                                        : 'bg-[#E6F1FE]'
                                } `}
                                role="Button"
                                aria-label="카테고리추가 버튼"
                                onClick={(e: any) => handleUserCategoryId(e.target.id)}
                            >
                                For You
                            </Button>
                        </div>
                        {items?.map((item: any) => (
                            <div
                                key={item.id}
                                className={`flex dark-box-bg pl-2 pr-2 text-center transition ease-out duration-400 justify-center items-center`}
                                aria-label="선호 카테고리 영역"
                            >
                                <Button
                                    className={`flex bg-[#E6F1FE] text-[#006FEE] p-1 rounded-lg text-center items-center flex-1 ${
                                        item.id === onCategoryId
                                            ? 'bg-[#005FEE] text-white'
                                            : 'bg-[#E6F1FE]'
                                    } `}
                                    id={item.id}
                                    role="Button"
                                    aria-label="카테고리"
                                    onClick={(e: any) => handleUserCategoryId(e.target.id)}
                                >
                                    {item.name}
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <RiArrowDropRightLine onClick={nextSlider} size={40} aria-label="오른쪽으로 넘기기" />
            <UserCategoryModal
                onClose={onClose}
                onModalOpen={onModalOpen}
                userGetCategoryRender={userGetCategoryRender}
            />
        </>
    );
}
