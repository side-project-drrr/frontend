import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import DisplayModeSwitch from '../components/displaymodeswitch/DisplayModeSwitch';
import { modalOpenState } from '../recoil/atom/modalOpenState';
import SignUpModal from '../components/signup/SignUpModal';
import { profileHeaderMenu } from '../recoil/atom/profileHeaderMenu';
import CategorySlide from '../components/carousel/CategorySlide';
import { loginModalState } from '../recoil/atom/loginModalState';
import { DisplayModeState } from '../recoil/atom/DisplayModeState';
import ConditionalRenderer from '../components/conditionalrenderer/ConditionalRenderer';
import { categorySearchValueState } from '../recoil/atom/categorySearchValueState';
import { categoryItemsState } from '../recoil/atom/categoryItemsState';
import { isLoggedInState } from '../recoil/atom/isLoggedInState';
import CategoryModal from '../components/modal/CategoryModal';
import UserSnackbar from '../components/snackbar/UserSnackbar';
import { LoginSuccess } from '../components/modal/LoginSuccess';
import { Box } from '@mui/material';
import { loginSuccessState } from '../recoil/atom/loginSuccessState';
import { snackbarOpenState } from '../recoil/atom/snackbarOpenState';
import { techBlogDataState } from '../recoil/atom/techBlogDataState';
import { useTechBlogQuery } from '../hooks/useTechBlogQuery';
import { categoryIdState } from '../recoil/atom/categoryIdState';

export default function MainPage() {
    const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [userIsCategoryModalOpen, setUserIsCategoryModalOpen] = useState<boolean>(false);
    const displayMode = useRecoilValue(DisplayModeState);
    const loggedIn = useRecoilValue(isLoggedInState);
    const setCategorySearchValue = useSetRecoilState(categorySearchValueState);
    const setCategoryItems = useSetRecoilState(categoryItemsState);
    const [handleModalOpen, setHandleModalOpen] = useRecoilState(modalOpenState);
    const setLoginModalOpen = useSetRecoilState(loginModalState);
    const setProfileHeaderMenu = useSetRecoilState(profileHeaderMenu);
    const singupSuccessModal = useRecoilValue(loginSuccessState);
    const snackbarOpen = useRecoilValue(snackbarOpenState);
    const observerElem = useRef<HTMLDivElement | null>(null);
    const setTechBlogData = useSetRecoilState(techBlogDataState);
    const categoryId = useRecoilValue(categoryIdState);
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage, error } = useTechBlogQuery({
        categoryId,
    });

    const handleUserCategoryModal = () => {
        setUserIsCategoryModalOpen(true);
    };

    const handleSignupNext = () => {
        setCategoryModalOpen(true);
        setHandleModalOpen(false);
    };

    const handleProfileOpen = () => {
        setProfileHeaderMenu(false);
    };

    const handleCategoryModalClose = () => {
        setCategoryModalOpen(false);
        setUserIsCategoryModalOpen(false);
        setCategorySearchValue('');
        setCategoryItems([]);
    };

    const userHandleCategoryModalClose = () => {
        setCategoryModalOpen(false);
        setUserIsCategoryModalOpen(false);
        setCategorySearchValue('');
        setCategoryItems([]);
    };

    const handleLoginModal = () => {
        setLoginModalOpen(true);
        setUserIsCategoryModalOpen(false);
    };

    useEffect(() => {
        if (data) {
            const allPosts = data.pages.flatMap(page => page.content);
            setTechBlogData(allPosts);
        }
    }, [data, setTechBlogData]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                threshold: 0.5,
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

    if (error) <div>에러가 발생했습니다</div>;

    return (
        <div className="flex justify-between" onClick={handleProfileOpen}>
            <div className="flex flex-col w-full gap-6">
                <div>
                    <DisplayModeSwitch />
                </div>
                <div className="flex w-full pr-4">
                    {loggedIn ? (
                        <CategorySlide
                            onClose={userHandleCategoryModalClose}
                            onModalOpen={userIsCategoryModalOpen}
                            onHandleModalOpen={handleUserCategoryModal}
                        />
                    ) : (
                        <Box bgcolor="background.paper" className="flex justify-center w-full p-4 ">
                            <span className="mx-2 border-b" onClick={handleLoginModal}>
                                더 많은 정보를 원한다면 로그인 해주세요.
                            </span>
                        </Box>
                    )}
                </div>
                <div
                    className={`${
                        displayMode ? 'flex w-full gap-6 flex-col' : 'flex w-full gap-6 flex-wrap'
                    }`}
                >
                    <ConditionalRenderer />
                </div>
                <div ref={observerElem}>
                    {isFetchingNextPage && !hasNextPage ? 'Loading more...' : 'Data does not exist'}
                </div>
            </div>
            {handleModalOpen && <SignUpModal onSignupNext={handleSignupNext} />}
            {isCategoryModalOpen && (
                <CategoryModal
                    onModalOpen={isCategoryModalOpen}
                    onClose={handleCategoryModalClose}
                />
            )}
            {snackbarOpen && <UserSnackbar />}
            {singupSuccessModal && <LoginSuccess />}
        </div>
    );
}
