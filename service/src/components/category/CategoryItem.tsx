import { useState, memo } from 'react';
import { CategoryItemsProps } from './type';

function CategoryItem({
    id,
    title,
    setActiveCategoriesData,
    activeCategoriesData,
}: CategoryItemsProps) {
    const [categoriesItemClicked, setCategoriesItemClicked] = useState<boolean>(false);
    const handleActiveCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        const { id } = e.target as HTMLButtonElement;
        const set = new Set(activeCategoriesData);
        if (set.has(id)) {
            const filterActiveCateogiesData = activeCategoriesData.filter(
                categoryitem => categoryitem !== id,
            );
            setActiveCategoriesData(filterActiveCateogiesData);
            setCategoriesItemClicked(false);
        } else {
            setActiveCategoriesData(prev => [...prev, id]);
            setCategoriesItemClicked(true);
        }
    };
    const abc = () => {
        if (activeCategoriesData.length < 11) {
            return categoriesItemClicked ? 'bg-black' : 'bg-[#E6F1FE]';
        } else {
            activeCategoriesData.pop();
            setCategoriesItemClicked(false);
            return 'bg-[#E6F1FE]';
        }
    };
    return (
        <li
            key={id}
            id={id}
            className={`bg-[#E6F1FE] h-10 p-5 text-[#006FEE] text-center flex justify-center items-center rounded-lg ${abc()}`}
            onClick={handleActiveCategoryItem}
        >
            {title}
        </li>
    );
}

export default memo(CategoryItem);
