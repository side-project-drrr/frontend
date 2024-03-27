import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import { activeCategoryState } from '../../recoil/atom/activeCategoryState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';

export default function SelectedCategoryDisplay() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(''); // 선택된 카테고리의 ID
    const [userCategoryItems, setUserCategoryItems] = useRecoilState(userCategoryState); //선호 카테고리
    const [activeCategory, setActiveCategory] = useRecoilState(activeCategoryState);
    const categoryItems = useRecoilValue(categoryItemsState);
    const handleFilteredUserCategoryItems = () => {
        const filterUserCategoryItem = activeCategory.filter(
            item => String(item.id) !== selectedCategoryId,
        );
        setUserCategoryItems([...filterUserCategoryItem]);
    };

    // 카테고리 아이템을 클릭했을 때 해당 아이템의 ID를 state에 설정
    const handleUserCategoryItem = (id: string) => {
        const selectedCategoryId = id;

        setSelectedCategoryId(selectedCategoryId);
        const set = new Set(activeCategory.map(v => String(v.id)));

        if (set.has(selectedCategoryId)) {
            const filterActiveCategoiesData = activeCategory.filter(
                categoryitem => String(categoryitem.id) !== selectedCategoryId,
            );
            setUserCategoryItems([...filterActiveCategoiesData]);
        } else {
            if (userCategoryItems.length < 10) {
                const someActiveCategoiesData = categoryItems.filter(
                    item => String(item.id) === selectedCategoryId,
                );
                setActiveCategory(prev => [...prev, ...someActiveCategoiesData]);
            }
        }
    };

    useEffect(() => {
        handleFilteredUserCategoryItems();
    }, []);

    return (
        <ul className="flex whitespace-nowrap pt-4 pb-4 gap-2 items-center flex-wrap w-[65%]">
            {userCategoryItems &&
                userCategoryItems.map(categoryItem => (
                    <li
                        key={categoryItem.id}
                        id={String(categoryItem.id)}
                        className="flex bg-[#f0f0f0] text-black gap-2 text-sm pr-2 pl-2 rounded-lg items-center justify-center"
                        onClick={() => handleUserCategoryItem(String(categoryItem.id))}
                    >
                        <CloseIcon sx={{ width: '20px' }} />
                        {categoryItem.name}
                    </li>
                ))}
        </ul>
    );
}
