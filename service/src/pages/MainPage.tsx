import { useLocation } from 'react-router-dom';
import Aside from '../components/aside/Aside';
import CategoryList from '../components/category/CategoryList';
import ListBox from '@monorepo/component/src/stories/listbox/Listbox';

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
    // 백엔드에서 받아온 providerId 받아온 값
    const { state } = useLocation();
    console.log(state);

    return (
        <div className="flex justify-between">
            <div className="flex flex-col w-9/12 gap-6">
                <CategoryList />
                <ListBox items={items} />
            </div>
            <aside className="block max-w-md pl-2 border-l-2 border-solid border-zinc-500">
                <div className="w-[100%]">
                    <Aside />
                </div>
            </aside>
        </div>
    );
}
