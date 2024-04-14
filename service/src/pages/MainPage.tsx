import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import DisplayModeSwitch from '../components/displaymodeswitch/DisplayModeSwitch';
import { modalOpenState } from '../recoil/atom/modalOpenState';
import SignUpModal from '../components/signup/SignUpModal';
import { profileHeaderMenu } from '../recoil/atom/profileHeaderMenu';
import CategorySlide from '../components/carousel/CategorySlide';
import { getTechBlogService, getUserTechBlogService } from '../service/TechBlogService';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
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

export default function MainPage() {
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [userIsCategoryModalOpen, setUserIsCategoryModalOpen] = useState(false);
    const [techBlogData, setTechBlogData] = useState<any[]>([]);
    const [filterTechBlogData, setFilterTechBlogData] = useState<any[]>([]);
    const [didMount, setDidMount] = useState(false);
    const displayMode = useRecoilValue(DisplayModeState);
    const [page, setPage] = useState(0);
    const [categoryId, setCategoryId] = useState(0);

    const loggedIn = useRecoilValue(isLoggedInState);
    const setCategorySearchValue = useSetRecoilState(categorySearchValueState);
    const size = 10;
    const setCategoryItems = useSetRecoilState(categoryItemsState);
    const setHandleModalOpen = useSetRecoilState(modalOpenState);
    const setLoginModalOpen = useSetRecoilState(loginModalState);
    const setProfileHeaderMenu = useSetRecoilState(profileHeaderMenu);

    async function userTechBlogRender() {
        const userTechBlogData = await getTechBlogService({ page, size });

        setTechBlogData(prev => [...prev, ...userTechBlogData.content]);
    }

    async function userFilterTechBlogRender(id: number) {
        const userFilterTechBlogData = await getUserTechBlogService({
            page,
            size,
            id,
        });

        setFilterTechBlogData(prev => [...prev, ...userFilterTechBlogData.content]);
    }

    const handleUserCategoryModal = () => {
        setUserIsCategoryModalOpen(true);
    };

    const handleSignupNext = () => {
        setCategoryModalOpen(true);

        setHandleModalOpen(false);

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
    const handleLoginModal = () => {
        setLoginModalOpen(true);
        setUserIsCategoryModalOpen(false);
    };

    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [techBlogData]);

    useEffect(() => {
        setDidMount(true);
    }, []);

    useEffect(() => {
        if (categoryId === 0 && didMount) {
            userTechBlogRender();
        }
        userFilterTechBlogRender(categoryId);
    }, [page, didMount]);

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);

    return (
        <div className="flex justify-between" onClick={handleProfileOpen}>
            <div className="flex flex-col w-full gap-6">
                <div className="mt-14">
                    <DisplayModeSwitch />
                </div>

                <div className="flex w-full pr-4 mt-8">
                    {loggedIn ? (
                        <CategorySlide
                            onClose={handleCategoryModalClose}
                            onModalOpen={userIsCategoryModalOpen}
                            onHandleModalOpen={handleUserCategoryModal}
                            onUserFilterTechBlogRender={userFilterTechBlogRender}
                            onSetCategoryId={setCategoryId}
                            onCategoryId={categoryId}
                            onUserTechBlogRender={userTechBlogRender}
                            onSetPage={setPage}
                            onSetObservationTarget={setObservationTarget}
                            onSetFilterTechBlogData={setFilterTechBlogData}
                        />
                    ) : (
                        <Box bgcolor="background.paper" className="flex justify-center w-full p-4 ">
                            더 많은 정보를 원한다면{' '}
                            <span className="mx-2 border-b" onClick={handleLoginModal}>
                                로그인
                            </span>
                            해주세요.
                        </Box>
                    )}
                </div>
                <div
                    className={`${
                        displayMode ? 'flex w-full gap-6 flex-col' : 'flex w-full gap-6 flex-wrap'
                    }`}
                >
                    <ConditionalRenderer
                        items={techBlogData}
                        onCategoryId={categoryId}
                        onFilterItems={filterTechBlogData}
                    />
                </div>
                <div ref={setObservationTarget}></div>
            </div>
            <SignUpModal onSignupNext={handleSignupNext} />
            {isCategoryModalOpen && (
                <CategoryModal
                    onModalOpen={isCategoryModalOpen}
                    onClose={handleCategoryModalClose}
                />
            )}
            <UserSnackbar />;
            <LoginSuccess />
        </div>
    );
}
