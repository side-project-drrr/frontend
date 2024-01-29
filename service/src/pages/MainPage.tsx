import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';
import { modalOpenState } from '../recoil/atom/modalOpenState';
import Aside from '../components/aside/Aside';
import CategoryList from '../components/category/CategoryList';
import ListBox from '@monorepo/component/src/stories/listbox/Listbox';
import SignUpModal from '../components/signup/SignUpModal';
import { getAuthStorage } from '../repository/AuthRepository';
import CardList from '../components/card/CardList';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalOpenState } from '../recoil/atom/modalOpenState';
import SignUpModal from '../components/signup/SignUpModal';


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
    const TOKEN_KEY = 'accessToken';
    const getToken = getAuthStorage(TOKEN_KEY);
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

    console.log(getToken);
    const handleSignupNext = () => {
        // 회원가입 모달에서 다음 버튼을 클릭했을 때 실행되는 로직
        // 여기서는 카테고리 모달을 열도록 함
        setCategoryModalOpen(true);
        handleModalOpen(false);
    };

    const handleCategoryModalClose = () => {
        // 카테고리 모달에서 닫기 버튼을 클릭했을 때 실행되는 로직
        // 여기서는 카테고리 모달을 닫음
        setCategoryModalOpen(false);
    };
    console.log(displayMode);
    return (
        <div className="flex justify-between">
            <div className="flex w-9/12 gap-6">
                <div
                    className={`${
                        displayMode ? 'flex flex-col w-full gap-6' : 'flex w-full gap-6 flex-wrap'
                    }`}
                >
                <ListBox items={items} />
                <div className="flex flex-col">
                    <div>
                        {isCategoryModalOpen && (
                            <CategoryList
                                onClose={handleCategoryModalClose}
                                onModalOpen={isCategoryModalOpen}
                                onHandleModalOpen={handleSignupNext}
                            />
                        )}
                    </div>
                    <div className="flex justify-end w-10/12">
                        <FormGroup>
                            <Switch
                                {...label}
                                defaultChecked
                                onChange={e => setDisplayMode(e.target.checked)}
                            />
                        </FormGroup>
                    </div>
                    {displayMode ? <ListBox items={items} /> : <CardList />}
                </div>
                    <SignUpModal onSignupNext={handleSignupNext} />
                <aside className="block max-w-md pl-2 border-l-2 border-solid border-zinc-500">
                    <div className="w-[100%]">
                        <Aside />
                    </div>
                </aside>
            </div>
        </div>
    );
}
