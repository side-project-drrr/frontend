import { useState, useEffect, memo } from 'react';
import { CategoryItemsProps } from './type';
import { useRecoilValue } from 'recoil';
import { userCategoryState } from '../../recoil/atom/userCategoryState';

function UserCategoryItem({
    categoryId,
    title,
    setActiveCategoriesData,
    activeCategoriesData,

    onSetObservationTarget,
}: CategoryItemsProps) {
    const [categoriesItemClicked, setCategoriesItemClicked] = useState<boolean>(false);
    const userCategoryItems = useRecoilValue(userCategoryState); //선호 카테고리

    const someUserSelectedCategories = () => {
        if (userCategoryItems.length > 0) {
            const userCategory = userCategoryItems.some(item => item.name === title);

            //여기서는 사용자가 선택한 선호카테고리가 같은 전체 리스트의 값과 같은 id를 boolean 표시
            if (userCategory) {
                const updatedCategories = userCategoryItems.map((category: any) =>
                    String(category.id),
                );
                setActiveCategoriesData([...updatedCategories]);
                setCategoriesItemClicked(true);
            }
        }
    };

    const handleActiveCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        const categoryItemId = e.currentTarget.id;

        const set = new Set(activeCategoriesData);

        if (set.has(categoryItemId)) {
            const filterActiveCateogiesData = activeCategoriesData.filter(
                categoryitem => categoryitem !== categoryItemId,
            );
            setActiveCategoriesData(filterActiveCateogiesData);
            setCategoriesItemClicked(false);
        } else {
            if (activeCategoriesData.length < 10) {
                setActiveCategoriesData(prev => [...prev, categoryItemId]);
                setCategoriesItemClicked(true);
            }
        }
    };

    useEffect(() => {
        someUserSelectedCategories();
    }, []);

    return (
        <>
            <li
                key={categoryId}
                id={String(categoryId)}
                className={`p-2 whitespace-nowrap text-center flex justify-center items-center rounded-lg flex-warp overflow-x-hidden ${
                    categoriesItemClicked ? 'bg-[#2C2C2C] text-white' : 'bg-[#F2F2F2]  text-black '
                } hover:bg-red-500 cursor-pointer `}
                onClick={handleActiveCategoryItem}
                aria-label="카테고리"
            >
                {title}
            </li>
            <div ref={onSetObservationTarget}></div>
        </>
    );
}

export default memo(UserCategoryItem);
