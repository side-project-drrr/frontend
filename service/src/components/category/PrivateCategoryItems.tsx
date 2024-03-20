import { useState, useEffect, memo } from 'react';
import { CategoryItemsProps } from './type';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';

function PrivateCategoryItems({
    categoryId,
    title,
    setActiveCategoriesData,
    activeCategoriesData,

    onSetObservationTarget,
}: CategoryItemsProps) {
    const [categoriesItemClicked, setCategoriesItemClicked] = useState<boolean>(false);
    const [userCategoryItems, setUserCategoryItems] = useRecoilState(userCategoryState); //선호 카테고리
    const categoryItems = useRecoilValue(categoryItemsState);
    const someUserSelectedCategories = () => {
        if (userCategoryItems.length > 0) {
            const userCategory = userCategoryItems.some(item => item.name === title);

            //여기서는 사용자가 선택한 선호카테고리가 같은 전체 리스트의 값과 같은 id를 boolean 표시
            if (userCategory) {
                const updatedCategoriesId = userCategoryItems.map((category: any) =>
                    String(category.id),
                );
                const updatedCategories = userCategoryItems;
                setUserCategoryItems([...updatedCategories]);
                setActiveCategoriesData([...updatedCategoriesId]);
                setCategoriesItemClicked(true);
            }
        }
    };

    const handleActiveCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        const clickedCategoryId = e.currentTarget.id;
        const set = new Set(activeCategoriesData);

        if (set.has(clickedCategoryId)) {
            const filterActiveCategoiesData = activeCategoriesData.filter(
                categoryitem => categoryitem !== clickedCategoryId,
            );
            const test = categoryItems.find((item: any) => String(item.id) === clickedCategoryId);

            setUserCategoryItems(prev => [...prev, ...test]);
            setActiveCategoriesData(filterActiveCategoiesData);
            setCategoriesItemClicked(false);
        } else {
            if (activeCategoriesData.length < 10) {
                setActiveCategoriesData(prev => [...prev, clickedCategoryId]);
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
                onClick={e => handleActiveCategoryItem(e)}
                aria-label="카테고리"
            >
                {title}
            </li>
            <div ref={onSetObservationTarget}></div>
        </>
    );
}

export default memo(PrivateCategoryItems);
