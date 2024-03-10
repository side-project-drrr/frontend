import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { modalOpenState } from '../recoil/atom/modalOpenState';
import ListBox from '@monorepo/component/src/stories/listbox/Listbox';
import SignUpModal from '../components/signup/SignUpModal';
import CardList from '../components/card/CardList';
import { profileModalOpen } from '../recoil/atom/profileModalOpen';

import { getAuthStorage } from '../repository/AuthRepository';

import CategorySlide from '../components/carousel/CategorySlide';
import { userCategoryState } from '../recoil/atom/userCategoryState';
import { useTokenDecode } from '../hooks/useTokenDecode';
import { AuthCategoryService } from '../service/CategoryService';
import { getTechBlogService, getUserTechBlogService } from '../service/TechBlogService';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { isLoggedInState } from '../recoil/atom/isLoggedInState';
import CategoryModal from '../components/modal/CategoryModal';
import { loginModalState } from '../recoil/atom/loginModalState';

export default function MainPage() {
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [userIsCategoryModalOpen, setUserIsCategoryModalOpen] = useState(false);
    const [techBlogData, setTechBlogData] = useState<any[]>([]);
    const [filterTechBlogData, setFilterTechBlogData] = useState<any[]>([]);
    const [displayMode, setDisplayMode] = useState(true);
    const [page, setPage] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [userCategoryItems, setUserCategoryItems] = useRecoilState(userCategoryState); //선호 카테고리
    const loggedIn = useRecoilValue(isLoggedInState);
    const size = 10;

    const setHandleModalOpen = useSetRecoilState(modalOpenState);
    const setLoginModalOpen = useSetRecoilState(loginModalState);
    const setProfileOpen = useSetRecoilState(profileModalOpen);

    const TOKEN_KEY = 'accessToken';
    const getToken = getAuthStorage(TOKEN_KEY);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const tokenDecode = useTokenDecode(getToken);

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

    async function userGetCategoryRender() {
        const userCategoryData = await AuthCategoryService(tokenDecode);
        setUserCategoryItems(userCategoryData);
    }
    const handleUserCategoryModal = () => {
        setUserIsCategoryModalOpen(true);
    };
    const handleSignupNext = () => {
        setCategoryModalOpen(true);

        setHandleModalOpen(false);
    };
    const handleProfileOpen = () => {
        setProfileOpen(false);
    };
    const handleCategoryModalClose = () => {
        setCategoryModalOpen(false);
        setUserIsCategoryModalOpen(false);
    };
    const handleLoginModal = () => {
        setLoginModalOpen(true);
    };

    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [techBlogData]);

    useEffect(() => {
        if (categoryId === 0) {
            userTechBlogRender();
        }
        userFilterTechBlogRender(categoryId);
    }, [page]);

    useEffect(() => {
        if (getToken) {
            userGetCategoryRender();
        }
    }, [isCategoryModalOpen]);

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);
    return (
        <div className="flex justify-between" onClick={handleProfileOpen}>
            <div className="flex flex-col w-full gap-6">
                <div className="flex w-full pr-4 mt-8">
                    {loggedIn ? (
                        <CategorySlide
                            items={userCategoryItems}
                            onClose={handleCategoryModalClose}
                            onModalOpen={userIsCategoryModalOpen}
                            onHandleModalOpen={handleUserCategoryModal}
                            userGetCategoryRender={userGetCategoryRender}
                            onUserFilterTechBlogRender={userFilterTechBlogRender}
                            onSetCategoryId={setCategoryId}
                            onCategoryId={categoryId}
                            onUserTechBlogRender={userTechBlogRender}
                            onSetPage={setPage}
                            onSetObservationTarget={setObservationTarget}
                            onSetFilterTechBlogData={setFilterTechBlogData}
                        />
                    ) : (
                        <div className="flex w-full justify-center dark:bg-[#444444] bg-[#f0f0f0] p-4 ">
                            더 많은 정보를 원한다면{' '}
                            <span className="mx-2 border-b" onClick={handleLoginModal}>
                                로그인
                            </span>
                            해주세요.
                        </div>
                    )}
                </div>
                <div
                    className={`${
                        displayMode ? 'flex w-full gap-6 flex-col' : 'flex w-full gap-6 flex-wrap'
                    }`}
                >
                    <div className="flex justify-end w-10/12">
                        <FormGroup>
                            <Switch
                                {...label}
                                defaultChecked
                                onChange={e => setDisplayMode(e.target.checked)}
                                aria-label="DisplayMode Switch"
                            />
                        </FormGroup>
                    </div>
                    {displayMode ? (
                        <ListBox
                            items={techBlogData}
                            onCategoryId={categoryId}
                            onFilterItems={filterTechBlogData}
                        />
                    ) : (
                        <CardList
                            items={techBlogData}
                            onCategoryId={categoryId}
                            onFilterItems={filterTechBlogData}
                        />
                    )}
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
        </div>
    );
}
