import { useEffect, useState, useMemo, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';

import CategoryItem from '../category/CategoryItem';
import { CategoryProps } from './type';
import { getCategoryItem } from '../../service/CategoryService';
import { userInformationState } from '../../recoil/atom/userInformationState';
import { providerIdState } from '../../recoil/atom/providerIdState';
import { SignUpService } from '../../service/auth/SocialService';
import { setAuthStorage } from '../../repository/AuthRepository';
import { getProvider } from '../../repository/ProviderRepository';
import { getProfileImgStorage } from '../../repository/ProfileimgRepository';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';

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

const InputTextField = styled(TextField)({
    '& label': {
        color: 'black',
    },

    '& .MuiOutlinedInput-root': {
        color: 'black',
        '& fieldset': {
            borderRadius: 10,
            width: '24rem',
            backgroundColor: 'transparent',
            borderColor: '#E4E4E7',
            height: '3rem',
            textAlign: 'center',
            marginTop: '0.5rem',
            //maxWidth: '24rem',
            minWidth: '10rem',
        },
    },
});

const buttonStyle = {
    backgroundImage: 'linear-gradient(to right, #47F938 20%, #006FEE 20%)',
    color: 'white', // Set the text color if needed
    borderRadius: '10px 5px 5px 10px', // Specify border radius for each corner
};

function CategoryModal({ onModalOpen, onClose }: CategoryProps) {
    const [didMount, setDidmount] = useState(false);
    const [categoryItems, setCategoryItems] = useState<any[]>([]); //전체 카테고리 리스트
    const [activeCategoriesData, setActiveCategoriesData] = useState<any[]>([]); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useState(''); // 검색value
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

    async function getCategoryList() {
        const categoryData = await getCategoryItem({ page, size });

        setCategoryItems(categoryData.content);
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

    const categorySearchItemList = useMemo(() => {
        if (categorySearchValue) {
            return categoryItems.filter(item =>
                item.name.toLocaleUpperCase().startsWith(categorySearchValue.toLocaleUpperCase()),
            );
        }
        return categoryItems;
    }, [categoryItems, categorySearchValue]);

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);

    useEffect(() => {
        getCategoryList();
    }, [page]);

    useEffect(() => {
        setDidmount(true);
    }, []);

    useEffect(() => {
        if (didMount) {
            //카테고리리스트 api 호출

            getCategoryList();
        }
    }, [didMount]);

    return (
        <>
            <Modal onClose={onClose} open={onModalOpen}>
                <Box sx={style} className="flex flex-col items-center justify-around">
                    <div className="flex justify-start w-full pb-2 text-black border-b-2 border-solid">
                        <h1 className="text-base">선호 카테고리 등록</h1>
                    </div>
                    <div className="flex items-center w-full ml-6">
                        <InputTextField
                            placeholder="검색"
                            variant="outlined"
                            onChange={handleCategorySearchItem}
                            aria-label="검색창"
                        />
                    </div>
                    <ul className="flex flex-wrap justify-around w-full h-[25vh] gap-4 overflow-y-scroll">
                        {categorySearchItemList?.map(categoryitem => (
                            <CategoryItem
                                key={categoryitem.id}
                                id={categoryitem.id}
                                title={categoryitem.name}
                                setActiveCategoriesData={setActiveCategoriesData}
                                activeCategoriesData={activeCategoriesData}
                                onSetObservationTarget={setObservationTarget}
                            />
                        ))}
                    </ul>
                    <Button
                        className="w-10/12"
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
