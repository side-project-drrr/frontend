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
import { setAccessTokenStorage, setRefreshTokenStorage } from '../../repository/AuthRepository';
import { getProvider } from '../../repository/ProviderRepository';
import { getProfileImgStorage } from '../../repository/ProfileimgRepository';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { isLoggedInState } from '../../recoil/atom/isLoggedInState';
import ModalTitle from '@monorepo/component/src/stories/modalTitle/ModalTitle';
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

function CategoryModal({ onModalOpen, onClose }: CategoryProps) {
    const [categoryItems, setCategoryItems] = useRecoilState(categoryItemsState); //전체 카테고리 리스트
    const [didMount, setDidMount] = useState(false); //전체 카테고리 리스트
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
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const [isSearching, setIsSearching] = useState(false); // 검색value
    const setSnackbarOpen = useSetRecoilState(snackbarOpenState);
    const size = 20;
    const setIsLogged = useSetRecoilState(isLoggedInState);
    const setLoginSucess = useSetRecoilState(loginSuccessState);
    const { login } = useProfileState();
    const buttonStyle = {
        backgroundImage: `linear-gradient(to right, #FFA471 ${userCategoryItems.length}0%, #F0F0F0 20%)`,
        color: 'black', // Set the text color if needed
        borderRadius: '10px 5px 5px 10px', // Specify border radius for each corner
    };

    async function getCategoryList() {
        const categoryData = await getCategoryItem({ page, size });

        setCategoryItems(prev => [...prev, ...categoryData.content]);
    }
    async function getCategorySearchRender(value: string) {
        const categorySearchData = await categorySearchService({
            keyword: value,
            page,
            size,
        });

        setCategoryItems(prev => [...prev, ...categorySearchData.content]);
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
            subscribeUser();
            setAccessTokenStorage(ACCESSTOKEN_KEY, tokenData.accessToken);
            setRefreshTokenStorage(REFRESHTOKEN_KEY, tokenData.refreshToken);
        }
    }

    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [categoryItems]);

    async function handleCategory() {
        if (userCategoryItems.length === 0) {
            setSnackbarOpen({ open: true, vertical: 'top', horizontal: 'center', text: msg.under });
            return;
        } else {
            await signupRender();
            onClose();
            setIsLogged(true);
        }
    }

    const searchDataDebouce = (value: string) => {
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(async () => {
            setPage(0);
            setCategoryItems([]);

            await getCategorySearchRender(value);
        }, 1000);

        setTimer(newTimer);
    };

    const handleCategorySearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 0) {
            searchDataDebouce(value);
        }
        setCategorySearchValue(value);
    };

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);

    useEffect(() => {
        if (onModalOpen && didMount && !isSearching) {
            getCategoryList();
        }
    }, [page, onModalOpen, didMount]);

    useEffect(() => {
        if (onModalOpen && isSearching && didMount) {
            getCategorySearchRender(categorySearchValue);
        }
    }, [page, onModalOpen, didMount]);

    useEffect(() => {
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (categorySearchValue.length > 0) {
            setCategoryItems([]);
            setIsSearching(true);
        } else {
            setIsSearching(false);
        }
    }, [categorySearchValue]);

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
                        height: '70%',
                        bgcolor: '#FFFFFF',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '10px',

                        [theme.breakpoints.down('sm')]: { width: '350px' },
                    })}
                    className="flex flex-col items-center justify-around "
                >
                    <ModalTitle onHangleCloseClick={onClose} state="signup" />
                    <div className="flex items-center justify-center w-full">
                        <InputTextField
                            placeholder="검색"
                            variant="outlined"
                            onChange={handleCategorySearchItem}
                            aria-label="검색창"
                            sx={theme => ({
                                width: '67%',
                                [theme.breakpoints.down('sm')]: { width: '100%' },
                            })}
                        />
                    </div>
                    <ul
                        className="flex w-[65%] gap-2 justify-start flex-wrap overflow-y-scroll mt-2 max-[600px]:w-full "
                        id="CategoryModal-Scroll"
                    >
                        {categoryItems?.map(categoryitem => (
                            <CategoryItem
                                key={categoryitem.id}
                                categoryId={categoryitem.id}
                                title={categoryitem.name}
                                onSetObservationTarget={setObservationTarget}
                            />
                        ))}
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
