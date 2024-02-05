import { useState, useEffect } from 'react';
import { CategoryItemsProps } from './type';

function UserCategoryItem({
    id,
    title,
    setActiveCategoriesData,
    activeCategoriesData,
    onUserCategoryItems,
    onSetObservationTarget,
}: CategoryItemsProps) {
    const [categoriesItemClicked, setCategoriesItemClicked] = useState<boolean>(false);

    const someUserSelectedCategories = () => {
        if (onUserCategoryItems !== undefined) {
            const userCategory = onUserCategoryItems.some(item => item.id === id);
            //여기서는 사용자가 선택한 선호카테고리가 같은 전체 리스트의 값과 같은 id를 boolean 표시
            if (userCategory) {
                const updatedCategories = onUserCategoryItems.map((category: any) =>
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
                key={id}
                id={id}
                className={`bg-[#E6F1FE] h-10 p-5 text-[#006FEE] text-center flex justify-center items-center rounded-lg  flex-1 ${
                    categoriesItemClicked ? 'bg-black' : 'bg-[#E6F1FE]'
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

export default UserCategoryItem;
