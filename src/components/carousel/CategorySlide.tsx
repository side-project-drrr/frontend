import { useRef, useState, SetStateAction, useEffect } from 'react';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { Button } from '@mui/base/Button';
import AddIcon from '@mui/icons-material/Add';
import UserCategoryModal from '../../components/modal/UserCategoryModal';
import { getAuthStorage } from '../../repository/AuthRepository';
import { AuthCategoryService } from '../../service/CategoryService';
import { useRecoilState } from 'recoil';
import { userCategoryState } from '../../recoil/atom/userCategoryState';

interface CarouselProps {
    onModalOpen: boolean;
    onClose: () => void;
    onHandleModalOpen?: () => void;
    onUserFilterTechBlogRender: any;
    onSetCategoryId: React.Dispatch<SetStateAction<number>>;
    onCategoryId: number;
    onUserTechBlogRender: () => void;
    onSetPage: React.Dispatch<SetStateAction<number>>;
    onSetObservationTarget: any;
    onSetFilterTechBlogData: any;
}

export default function CategorySlide({
    onHandleModalOpen,
    onModalOpen,
    onClose,
    onUserFilterTechBlogRender,
    onSetCategoryId,
    onCategoryId,
    onUserTechBlogRender,
    onSetPage,
    onSetFilterTechBlogData,
}: CarouselProps) {
    const [current, setCurrent] = useState<number>(0);
    const [userCategoryItems, setUserCategoryItems] = useRecoilState(userCategoryState); //선호 카테고리
    const TOKEN_KEY = 'accessToken';
    const getToken = getAuthStorage(TOKEN_KEY);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const prevSlider = () => {
        setCurrent(current === 0 ? 0 : current - 1);
        if (current === 0) {
            setCurrent(0);
        } else {
            setCurrent(current - 1);
        }
    };
    const nextSlider = () => {
        setCurrent(current === userCategoryItems.length - 1 ? 0 : current + 1);
    };

    async function userGetCategoryRender() {
        const userCategoryData = await AuthCategoryService();
        setUserCategoryItems(userCategoryData);
    }

    useEffect(() => {
        if (getToken) {
            userGetCategoryRender();
        }
    }, []);

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
                <RiArrowDropLeftLine onClick={prevSlider} size={40} aria-label="왼쪽으로 넘기기" />
            </div>
            <div
                className={`relative flex w-full overflow-hidden justify-between items-center`}
                ref={scrollRef}
                aria-label="선호 카테고리"
                id="categorySlider-container"
            >
                <div
                    className={` transition ease-out duration-400 absolute flex justify-center items-center h-[29px]`}
                    style={{ transform: `translate3d(-${current * 80}px,0px,0px)` }}
                    id="categorySlider-wapper"
                >
                    <div className="flex items-center w-full">
                        <Button
                            className="h-[29px] w-8 text-center text-xs flex justify-center items-center rounded-[20px] dark:bg-[#444444] bg-[#f0f0f0]"
                            onClick={onHandleModalOpen}
                            role="Button"
                            aria-label="카테고리추가 버튼"
                        >
                            <AddIcon />
                        </Button>
                        <div className={`relative flex dark-box-bg pl-2 pr-2 text-center `}>
                            <p
                                id={ALLCATEGORYNUM}
                                className={`flex p-1 rounded-[20px] px-4  h-[29px] items-center w-22 text-center justify-center  whitespace-nowrap ${
                                    Number(ALLCATEGORYNUM) === onCategoryId
                                        ? 'bg-[#D16E37] dark:bg-[#D16E37]  text-white'
                                        : 'dark:bg-[#444444] bg-[#f0f0f0]'
                                } `}
                                aria-label="카테고리추가 버튼"
                                onClick={(e: any) => handleUserCategoryId(e.target.id)}
                            >
                                전체 게시글
                            </p>
                        </div>

                        {userCategoryItems?.map((item: any) => (
                            <div
                                key={item.id}
                                className={`flex dark-box-bg pl-2 pr-2 text-center transition ease-out duration-400 justify-center items-center w-full`}
                                aria-label="선호 카테고리 영역"
                            >
                                <p
                                    className={`flex  h-[29px] p-1 rounded-[20px] text-center items-center flex-1 whitespace-nowrap px-4 ${
                                        item.id === onCategoryId
                                            ? 'bg-[#D16E37] dark:bg-[#D16E37] dark:text-white text-white'
                                            : 'dark:bg-[#444444] bg-[#f0f0f0]'
                                    } `}
                                    id={item.id}
                                    aria-label="카테고리"
                                    onClick={() => handleUserCategoryId(item.id)}
                                >
                                    {item.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <RiArrowDropRightLine onClick={nextSlider} size={40} aria-label="오른쪽으로 넘기기" />
            {onModalOpen && (
                <UserCategoryModal
                    onClose={onClose}
                    onModalOpen={onModalOpen}
                    userGetCategoryRender={userGetCategoryRender}
                />
            )}
        </>
    );
}
