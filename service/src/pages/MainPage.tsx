import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { modalOpenState } from '../recoil/atom/modalOpenState';
import ListBox from '@monorepo/component/src/stories/listbox/Listbox';
import SignUpModal from '../components/signup/SignUpModal';
import CardList from '../components/card/CardList';
import { getAuthStorage } from '../repository/AuthRepository';

import CategorySlide from '../components/carousel/CategorySlide';
import { userCategoryState } from '../recoil/atom/userCategoryState';
import { useTokenDecode } from '../hooks/useTokenDecode';
import { AuthCategoryService } from '../service/CategoryService';
import { getTechBlogService } from '../service/TechBlogService';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export default function MainPage() {
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [techBlogData, setTechBlogData] = useState<any[]>([]);
    const [displayMode, setDisplayMode] = useState(true);
    const [page, setPage] = useState(0);
    const [userCategoryItems, setUserCategoryItems] = useRecoilState(userCategoryState); //선호 카테고리
    const [didMount, setDidmount] = useState(false);

    const size = 3;

    const sort = 'createdAt';

    const direction = 'DESC';

    const handleModalOpen = useSetRecoilState(modalOpenState);
    const TOKEN_KEY = 'accessToken';
    const getToken = getAuthStorage(TOKEN_KEY);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    const tokenDecode = useTokenDecode(getToken);

    async function userTechBlogRender() {
        const userCategoryData = await getTechBlogService({ page, size, sort, direction });
        setTechBlogData(prev => [...prev, ...userCategoryData.content]);
    }

    async function userGetCategoryRender() {
        const userCategoryData = await AuthCategoryService(tokenDecode);
        setUserCategoryItems(userCategoryData);
    }

    const handleSignupNext = () => {
        setCategoryModalOpen(true);
        handleModalOpen(false);
    };

    const handleCategoryModalClose = () => {
        setCategoryModalOpen(false);
    };

    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [techBlogData]);

    useEffect(() => {
        userTechBlogRender();
    }, [page]);

    useEffect(() => {
        setDidmount(true);
    }, []);

    useEffect(() => {
        if (didMount) {
            userGetCategoryRender();
            userTechBlogRender();
        }
    }, [didMount]);

    useEffect(() => {
        userGetCategoryRender();
    }, [isCategoryModalOpen]);

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);
    return (
        <div className="flex justify-between">
            <div className="flex flex-col w-10/12 gap-6">
                <div className="flex items-center justify-around w-3/4 mt-5 ">
                    {getToken && (
                        <CategorySlide
                            items={userCategoryItems}
                            onClose={handleCategoryModalClose}
                            onModalOpen={isCategoryModalOpen}
                            onHandleModalOpen={handleSignupNext}
                            userGetCategoryRender={userGetCategoryRender}
                        />
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
                            onSetObservationTarget={setObservationTarget}
                        />
                    ) : (
                        <CardList
                            items={techBlogData}
                            onSetObservationTarget={setObservationTarget}
                        />
                    )}
                </div>
            </div>
            <SignUpModal onSignupNext={handleSignupNext} />
        </div>
    );
}
