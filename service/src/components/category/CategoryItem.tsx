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
                className={`bg-[#E6F1FE] h-10 p-5 text-[#006FEE] text-center flex justify-center items-center rounded-lg ${
                    categoriesItemClicked ? 'bg-black' : 'bg-[#E6F1FE]'
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
