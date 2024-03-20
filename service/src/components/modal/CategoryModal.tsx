import { useEffect, useState, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import CategoryItem from '../category/CategoryItem';
import { CategoryProps } from './type';
import { categorySearchService, getCategoryItem } from '../../service/CategoryService';
import { userInformationState } from '../../recoil/atom/userInformationState';
import { providerIdState } from '../../recoil/atom/providerIdState';
import { SignUpService } from '../../service/auth/SocialService';
import { setAuthStorage } from '../../repository/AuthRepository';
import { getProvider } from '../../repository/ProviderRepository';
import { getProfileImgStorage } from '../../repository/ProfileimgRepository';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import SignupTitle from '@monorepo/component/src/stories/singupTitle/SignupTitle';
import { InputTextField } from '../../style/inputText';
import { IconButton } from '@mui/material';
import { BsSend } from 'react-icons/bs';
import { categorySearchValueState } from '../../recoil/atom/categorySearchValueState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    height: '53%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};

function CategoryModal({ onModalOpen, onClose }: CategoryProps) {
    const [categoryItems, setCategoryItems] = useRecoilState(categoryItemsState); //전체 카테고리 리스트
    const [activeCategoriesData, setActiveCategoriesData] = useState<any[]>([]); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useRecoilState(categorySearchValueState); // 검색value
    const [page, setPage] = useState(0);
    const profileValue = useRecoilValue(userInformationState);
    const providerId = useRecoilValue(providerIdState);
    const provider = getProvider('provider');
    const ACCESSTOKEN_KEY = 'accessToken';
    const REFRESHTOKEN_KEY = 'refreshToken';
    const stringConvert = provider?.toString();
    const KEY = 'imgUrl';
    const profileImageUrl = getProfileImgStorage(KEY);

    const size = 20;
    const setIsLogged = useSetRecoilState(isLoggedInState);

    const buttonStyle = {
        backgroundImage: `linear-gradient(to right, #FFA471 ${activeCategoriesData.length}0%, #F0F0F0 20%)`,
        color: 'black', // Set the text color if needed
        borderRadius: '10px 5px 5px 10px', // Specify border radius for each corner
    };

    async function getCategoryList() {
        const categoryData = await getCategoryItem({ page, size });

        setCategoryItems(prev => [...prev, ...categoryData.content]);
    }
    async function getCategorySearchRender() {
        const categorySearchData = await categorySearchService({
            keyword: categorySearchValue,
            page,
            size,
        });

        setCategoryItems(categorySearchData);
    }

    async function signupRender() {
        const tokenData = await SignUpService({
            email: profileValue.email,
            categoryIds: activeCategoriesData,
            nickName: profileValue.nickname,
            provider: stringConvert,
            providerId,
            profileImageUrl,
        });
        setAuthStorage(
            ACCESSTOKEN_KEY,
            tokenData.accessToken,
            REFRESHTOKEN_KEY,
            tokenData.refreshToken,
        );
    }

    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [categoryItems]);

    async function handleCategory() {
        signupRender();
        onClose();
        setIsLogged(true);
        alert('drrr에 오신것을 환영합니다.');
    }

    const handleCategorySearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategorySearchValue(value);
    };

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);

    useEffect(() => {
        if (onModalOpen) {
            getCategoryList();
        }
    }, [page, onModalOpen]);

    return (
        <>
            <Modal onClose={onClose} open={onModalOpen}>
                <Box sx={style} className="flex flex-col items-center justify-around ">
                    <SignupTitle onHangleCloseClick={onClose} />
                    <div className="flex items-center justify-center w-full">
                        <InputTextField
                            placeholder="검색"
                            variant="outlined"
                            onChange={handleCategorySearchItem}
                            aria-label="검색창"
                            sx={{ width: '67%' }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        color="primary"
                                        component="span"
                                        className="w-10 h-10"
                                        onClick={getCategorySearchRender}
                                    >
                                        <BsSend className="hover:text-[#E6783A]" />
                                    </IconButton>
                                ),
                            }}
                        />
                    </div>
                    <ul className="flex w-[65%] gap-2 justify-start flex-wrap overflow-y-scroll mt-2">
                        {categoryItems?.map(categoryitem => (
                            <CategoryItem
                                key={categoryitem.id}
                                categoryId={categoryitem.id}
                                title={categoryitem.name}
                                setActiveCategoriesData={setActiveCategoriesData}
                                activeCategoriesData={activeCategoriesData}
                                onSetObservationTarget={setObservationTarget}
                            />
                        ))}
                    </ul>
                    <Button
                        className="w-[65%]"
                        onClick={handleCategory}
                        style={buttonStyle}
                        role="Button"
                        aria-label="카테고리 선택 완료"
                    >
                        <p>선택({activeCategoriesData.length}/10)</p>
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default CategoryModal;
