import { memo, useState } from 'react';
import { CategoryItemsProps } from './type';

function CategoryItem({
    categoryId,
    title,
    onSetObservationTarget,
    setActiveCategoriesData,
    activeCategoriesData,
}: CategoryItemsProps) {
    const [categoriesItemClicked, setCategoriesItemClicked] = useState<boolean>(false);
    const handleActiveCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        const clickedCategoryId = e.currentTarget.id;

        const set = new Set(activeCategoriesData);
        if (set.has(clickedCategoryId)) {
            const filterActiveCateogiesData = activeCategoriesData.filter(
                categoryitem => categoryitem !== String(categoryId),
            );

            setActiveCategoriesData(filterActiveCateogiesData);
            setCategoriesItemClicked(false);
        } else {
            if (activeCategoriesData.length < 10) {
                setActiveCategoriesData(prev => [...prev, clickedCategoryId]);
                setCategoriesItemClicked(true);
            }
        }
    };

    return (
        <>
            <li
                key={categoryId}
                id={String(categoryId)}
                className={` h-10 p-5 whitespace-nowrap text-center flex justify-center items-center rounded-lg  flex-1 ${
                    categoriesItemClicked ? 'bg-[#2C2C2C] text-white' : 'bg-[#F2F2F2]  text-black '
                } hover:bg-red-500 cursor-pointer `}
                onClick={handleActiveCategoryItem}
            >
                {title}
            </li>
            <div ref={onSetObservationTarget}></div>
        </>
    );
}

export default memo(CategoryItem);
