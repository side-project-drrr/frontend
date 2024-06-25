import { useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import CategoryItem from '../../components/category/CategoryItem';
import { CategoryProps } from './type';
import { userInformationState } from '../../recoil/atom/userInformationState';
import { providerIdState } from '../../recoil/atom/providerIdState';
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
import { msg } from '../../constants/message';
import { subscribeUser } from '../../webpush/main';
import { useSignUpMutation } from '../../hooks/useSignupMutation';
import { useCategoryQuery } from '../../hooks/useCategoryQuery';

const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

function CategoryModal({ onModalOpen, onClose }: CategoryProps) {
    const [categoryItems, setCategoryItems] = useRecoilState(categoryItemsState);
    const userCategoryItems = useRecoilValue(userCategoryState);
    const [categorySearchValue, setCategorySearchValue] = useRecoilState(categorySearchValueState);

    const profileValue = useRecoilValue(userInformationState);
    const providerId = useRecoilValue(providerIdState);
    const provider = getProvider('provider');
    const stringConvert = provider?.toString();
    const KEY = 'imgUrl';
    const profileImageUrl = getProfileImgStorage(KEY);

    const setSnackbarOpen = useSetRecoilState(snackbarOpenState);
    const setIsLogged = useSetRecoilState(isLoggedInState);
    const observerElem = useRef<HTMLDivElement | null>(null);

    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useCategoryQuery(categorySearchValue);

    const debouncedSearch = useRef(
        debounce(async (value: string) => {
            setCategoryItems([]);
            setCategorySearchValue(value);
        }, 1000),
    ).current;

    const buttonStyle = {
        backgroundImage: `linear-gradient(to right, #FFA471 ${userCategoryItems.length}0%, #F0F0F0 20%)`,
        color: 'black',
        borderRadius: '10px 5px 5px 10px',
    };

    const signUpData = useSignUpMutation();
    async function handleCategory() {
        if (userCategoryItems.length === 0) {
            setSnackbarOpen({ open: true, vertical: 'top', horizontal: 'center', text: msg.under });
            return;
        } else {
            signUpData.mutate({
                email: profileValue.email,
                categoryIds: userCategoryItems.map(item => +item.id),
                nickName: profileValue.nickname,
                provider: stringConvert,
                providerId,
                profileImageUrl,
            });
            subscribeUser();
            onClose();
            setIsLogged(true);
        }
    }

    const handleSearch = useCallback(
        (searchQuery: string) => {
            debouncedSearch(searchQuery);
        },
        [debouncedSearch],
    );

    useEffect(() => {
        if (onModalOpen && data) {
            const allPosts = data.pages.flatMap(value => value.content);
            setCategoryItems(prevItems => [...prevItems, ...allPosts]);
        }
    }, [onModalOpen, data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                threshold: 1.0,
            },
        );

        if (observerElem.current) {
            observer.observe(observerElem.current);
        }

        return () => {
            if (observerElem.current) {
                observer.unobserve(observerElem.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
                        className="flex w-[65%] gap-2 justify-start flex-wrap overflow-y-scroll mt-2 max-[600px]:w-full h-[300px]"
                        id="CategoryModal-Scroll"
                    >
                        {categoryItems?.map((categoryItem, index) => (
                            <CategoryItem
                                key={index}
                                categoryId={categoryItem.id}
                                title={categoryItem.name}
                                onIndex={index}
                            />
                        ))}
                        <div ref={observerElem} style={{ width: '100%' }}>
                            {isFetchingNextPage && hasNextPage
                                ? 'Loading more...'
                                : 'Data does not exist'}
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
