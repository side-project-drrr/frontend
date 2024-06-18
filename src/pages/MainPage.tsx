import { useRef, useState } from 'react';
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

import { useTechBlogQuery, useUserTechBlogQuery } from '../hooks/useTechBlogQuery';
import { userFilterTechBlogState } from '../recoil/atom/userFilterTechBlogState';
export default function MainPage() {
    const [isCategoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
    const [userIsCategoryModalOpen, setUserIsCategoryModalOpen] = useState<boolean>(false);
    const [filterTechBlogData, setFilterTechBlogData] = useRecoilState(userFilterTechBlogState);
    const displayMode = useRecoilValue(DisplayModeState);

    const [categoryId, setCategoryId] = useState<number>(0);
    const loggedIn = useRecoilValue(isLoggedInState);
    const setCategorySearchValue = useSetRecoilState(categorySearchValueState);
    const setCategoryItems = useSetRecoilState(categoryItemsState);
    const [handleModalOpen, setHandleModalOpen] = useRecoilState(modalOpenState);
    const setLoginModalOpen = useSetRecoilState(loginModalState);
    const setProfileHeaderMenu = useSetRecoilState(profileHeaderMenu);
    const singupSuccessModal = useRecoilValue(loginSuccessState);
    const snackbarOpen = useRecoilValue(snackbarOpenState);
    const observerElem = useRef<HTMLDivElement | null>(null);
    const { error } = useTechBlogQuery({ observerElem, categoryId });
    const { error: userError } = useUserTechBlogQuery({ observerElem, categoryId });

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

    const handleUserCategoryId = (id: string) => {
        const numberId = parseInt(id, 10);
        setCategoryId(numberId);
        setFilterTechBlogData([]);
    };

    if (error || userError) <div>error</div>;

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
                            onCategoryId={categoryId}
                            onHandleUserCategoryId={handleUserCategoryId}
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
                    <ConditionalRenderer
                        onCategoryId={categoryId}
                        onFilterItems={filterTechBlogData}
                    />
                </div>

                <div ref={observerElem} />
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
