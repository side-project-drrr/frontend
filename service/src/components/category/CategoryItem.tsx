import { useState, memo, useEffect } from 'react';
import { CategoryItemsProps } from './type';

function CategoryItem({
    id,
    title,
    setActiveCategoriesData,
    activeCategoriesData,
    onSetObservationTarget,
}: CategoryItemsProps) {
    const [categoriesItemClicked, setCategoriesItemClicked] = useState<boolean>(false);

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
    const getCategoryClickedItem = () => {
        const set = new Set(activeCategoriesData);
        if (set.has(id.toString())) {
            setCategoriesItemClicked(true);
        }
    };

    useEffect(() => {
        getCategoryClickedItem();
    }, []);

    return (
        <>
            <li
                key={id}
                id={String(id)}
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
