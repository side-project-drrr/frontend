import Aside from '../components/aside/Aside';
import CategoryList from '../components/category/CategoryList';
import ListBox from '@monorepo/component/src/stories/listbox/Listbox';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalOpenState } from '../recoil/atom/modalOpenState';
import SignUpModal from '../components/signup/SignUpModal';

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
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
    },
    {
        id: 1,
        title: '우아한형제들 PM의 이야기- “배민 기획자의 일”',
        content:
            '우아한형제들 PM(Product Manager)는 어떻게 일할까? 실제 이야기를 담은 책 "배민 기획자의 일"  PM들과 함께 나눈 이야기를 담았습니다.',
        bookmark: 1000,
        views: 50000,
    },
];

export default function MainPage() {
    const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);
    const handleModalOpen = useSetRecoilState(modalOpenState);
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

    return (
        <div className="flex justify-between">
            <div className="flex w-9/12 gap-6">
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

                    <SignUpModal onSignupNext={handleSignupNext} />
                </div>
                <aside className="block max-w-md pl-2 border-l-2 border-solid border-zinc-500">
                    <div className="w-[100%]">
                        <Aside />
                    </div>
                </aside>
            </div>
        </div>
    );
}
