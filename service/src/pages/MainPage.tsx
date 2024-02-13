import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { modalOpenState } from '../recoil/atom/modalOpenState';
import Aside from '../components/aside/Aside';
import ListBox from '@monorepo/component/src/stories/listbox/Listbox';
import SignUpModal from '../components/signup/SignUpModal';
import CardList from '../components/card/CardList';
import { profileModalOpen } from '../recoil/atom/profileModalOpen';

import { getAuthStorage } from '../repository/AuthRepository';
// import CategoryList from '../components/category/CategoryList';
import CategorySlide from '../components/carousel/CategorySlide';
import { userCategoryState } from '../recoil/atom/userCategoryState';
import { useTokenDecode } from '../hooks/useTokenDecode';
import { AuthCategoryService } from '../service/CategoryService';

const items = [
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
        thumbnailUrl: '',
    },
];

export default function MainPage() {
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const [displayMode, setDisplayMode] = useState(true);
    const handleModalOpen = useSetRecoilState(modalOpenState);
    const setProfileOpen = useSetRecoilState(profileModalOpen);
    const TOKEN_KEY = 'accessToken';
    const getToken = getAuthStorage(TOKEN_KEY);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };
    const [userCategoryItems, setUserCategoryItems] = useRecoilState(userCategoryState); //선호 카테고리
    const [didMount, setDidmount] = useState(false);
    const tokenDecode = useTokenDecode();

    async function userGetCategoryRender() {
        const userCategoryData = await AuthCategoryService(tokenDecode);
        setUserCategoryItems(userCategoryData);
    }

    const handleSignupNext = () => {
        setCategoryModalOpen(true);
        handleModalOpen(false);
    };
    const handleProfileOpen = () => {
        setProfileOpen(false);
    };
    const handleCategoryModalClose = () => {
        setCategoryModalOpen(false);
    };

    useEffect(() => {
        setDidmount(true);
    }, []);

    useEffect(() => {
        if (didMount) {
            //카테고리리스트 api 호출
            userGetCategoryRender();
        }
    }, [didMount]);

    useEffect(() => {
        userGetCategoryRender();
    }, [isCategoryModalOpen]);

    return (
        <div className="flex justify-between" onClick={handleProfileOpen}>
            <div className="flex w-10/12 gap-6">

        <div className="flex justify-between">
            <div className="flex flex-col w-10/12 gap-6">
                <div className="flex items-center justify-around w-1/2 mt-5 ">
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
                    {displayMode ? <ListBox items={items} /> : <CardList />}
                </div>
            </div>
            <SignUpModal onSignupNext={handleSignupNext} />
            <aside className="block max-w-md pl-2 border-l-2 border-solid border-zinc-500">
                <div className="w-[100%]">
                    <Aside />
                </div>
            </aside>
        </div>
    );
}
