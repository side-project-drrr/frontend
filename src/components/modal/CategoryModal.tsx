import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import CategoryItem from '../../components/category/CategoryItem';
import { CategoryProps } from './type';
import { categorySearchService } from '../../service/CategoryService';
import { userInformationState } from '../../recoil/atom/userInformationState';
import { providerIdState } from '../../recoil/atom/providerIdState';
import { SignUpService } from '../../service/auth/SocialService';
import { setAccessTokenStorage, setRefreshTokenStorage } from '../../repository/AuthRepository';
import { getProvider } from '../../repository/ProviderRepository';
import { getProfileImgStorage } from '../../repository/ProfileimgRepository';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import ModalTitle from '../../stories/modalTitle/ModalTitle';
import { InputTextField } from '../../style/inputText';

import { categorySearchValueState } from '../../recoil/atom/categorySearchValueState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import SelectedCategoryDisplay from '../category/SelectedCategoryDisplay';
import { snackbarOpenState } from '../../recoil/atom/snackbarOpenState';
import { loginSuccessState } from '../../recoil/atom/loginSuccessState';
import { useProfileState } from '../../context/UserProfile';
import { msg } from '../../constants/message';
import { subscribeUser } from '../../webpush/main';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

function CategoryModal({ onModalOpen, onClose }: CategoryProps) {
    const [categoryItems, setCategoryItems] = useRecoilState(categoryItemsState); //전체 카테고리 리스트
    const userCategoryItems = useRecoilValue(userCategoryState); // 카테고리 선택
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

    const setSnackbarOpen = useSetRecoilState(snackbarOpenState);
    const size = 10;
    const setIsLogged = useSetRecoilState(isLoggedInState);
    const setLoginSucess = useSetRecoilState(loginSuccessState);
    const { login } = useProfileState();
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const debouncedSearch = useRef(
        debounce(async (value: string) => {
            setPage(0);
            await getCategorySearchRender(value, 0);
        }, 500),
    ).current;
    const buttonStyle = {
        backgroundImage: `linear-gradient(to right, #FFA471 ${userCategoryItems.length}0%, #F0F0F0 20%)`,
        color: 'black', // Set the text color if needed
        borderRadius: '10px 5px 5px 10px', // Specify border radius for each corner
    };

    async function getCategorySearchRender(value: string, page: number) {
        setIsFetching(true);
        const categorySearchData = await categorySearchService({
            keyword: value,
            page,
            size,
        });
        if (page === 0) {
            setCategoryItems(categorySearchData.content);
        } else {
            setCategoryItems(prev => [...prev, ...categorySearchData.content]);
        }
        setHasMore(!categorySearchData.last);

        setIsFetching(false);
    }

    async function signupRender() {
        const tokenData = await SignUpService({
            email: profileValue.email,
            categoryIds: userCategoryItems.map(item => +item.id),
            nickName: profileValue.nickname,
            provider: stringConvert,
            providerId,
            profileImageUrl,
        });
        if (tokenData.accessToken.length > 0) {
            setLoginSucess(true);
            login(tokenData.accessToken);
            setAccessTokenStorage(ACCESSTOKEN_KEY, tokenData.accessToken);
            setRefreshTokenStorage(REFRESHTOKEN_KEY, tokenData.refreshToken);
            subscribeUser();
        }
    }

    async function handleCategory() {
        if (userCategoryItems.length === 0) {
            setSnackbarOpen({ open: true, vertical: 'top', horizontal: 'center', text: msg.under });
            return;
        } else {
            await signupRender();
            subscribeUser();
            onClose();
            setIsLogged(true);
        }
    }

    const handleSearch = useCallback(
        (searchQuery: string) => {
            setCategorySearchValue(searchQuery);
            debouncedSearch(searchQuery);
        },
        [debouncedSearch],
    );

    useEffect(() => {
        if (onModalOpen) {
            getCategorySearchRender(categorySearchValue, page);
        }
    }, [onModalOpen, page]);

    const loaderRef = useIntersectionObserver(entries => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
            setPage(prevPage => prevPage + 1);
        }
    });

    return (
        <>
            <Modal onClose={onClose} open={onModalOpen}>
                <Box
                    sx={theme => ({
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '620px',
                        bgcolor: '#FFFFFF',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '10px',

                        [theme.breakpoints.down('sm')]: { width: '350px' },
                    })}
                    className="flex flex-col items-center justify-around"
                >
                    <ModalTitle onHangleCloseClick={onClose} state="signup" />
                    <div className="flex items-center justify-center w-[80%]">
                        <InputTextField
                            placeholder="검색"
                            variant="outlined"
                            onChange={e => handleSearch(e.target.value)}
                            aria-label="검색창"
                            sx={theme => ({
                                width: '50%',
                                [theme.breakpoints.down('sm')]: { width: '100%' },
                            })}
                            autoComplete="off"
                        />
                    </div>
                    <ul
                        className="flex w-[65%] gap-2 justify-start flex-wrap overflow-y-scroll mt-2 max-[600px]:w-full "
                        id="CategoryModal-Scroll"
                    >
                        {categoryItems?.map((categoryitem, index) => (
                            <CategoryItem
                                key={index}
                                categoryId={categoryitem.id}
                                title={categoryitem.name}
                                onIndex={index}
                            />
                        ))}

                        <div ref={loaderRef} style={{ height: '50px' }}>
                            {isFetching && 'Loading more items...'}
                            {!hasMore && 'No more items to load'}
                        </div>
                    </ul>

                    <SelectedCategoryDisplay />
                    <Button
                        className="w-[65%]"
                        onClick={handleCategory}
                        style={buttonStyle}
                        role="Button"
                        aria-label="카테고리 선택 완료"
                        sx={theme => ({ [theme.breakpoints.down('sm')]: { width: '100%' } })}
                    >
                        <p>선택({userCategoryItems.length}/10)</p>
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default CategoryModal;
