import { useEffect, memo } from 'react';
import { CategoryItemsProps } from './type';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import { selectedCategoryState } from '../../recoil/atom/selectedCategoryState';

function PrivateCategoryItems({
    categoryId,
    title,

    onSetObservationTarget,
}: CategoryItemsProps) {
    const [userCategoryItems, setUserCategoryItems] = useRecoilState(userCategoryState); //선호 카테고리
    const setSelectedCategoryState = useSetRecoilState(selectedCategoryState);

    const someUserSelectedCategories = () => {
        if (userCategoryItems.length > 0) {
            const userCategory = userCategoryItems.some(item => item.name === title);

            //여기서는 사용자가 선택한 선호카테고리가 같은 전체 리스트의 값과 같은 id를 boolean 표시
            if (userCategory) {
                setUserCategoryItems([...userCategoryItems]);
            }
        }
    };

    const handleActiveCategoryItem = (id: string) => {
        const clickedCategoryId = id;
        setSelectedCategoryState(true);
        const set = new Set(userCategoryItems.map(v => String(v.id)));

        if (set.has(clickedCategoryId)) {
            const filterActiveCategoiesData = userCategoryItems.filter(
                categoryitem => String(categoryitem.id) !== clickedCategoryId,
            );

            setUserCategoryItems(filterActiveCategoiesData);
        } else {
            if (userCategoryItems.length < 10) {
                setUserCategoryItems(prev => [...prev, ...userCategoryItems]);
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
                    userCategoryItems.some(categoryItem => categoryItem.id === categoryId)
                        ? 'bg-[#2C2C2C] text-white'
                        : 'bg-[#F2F2F2]  text-black '
                } hover:bg-red-500 cursor-pointer `}
                onClick={() => handleActiveCategoryItem(String(categoryId))}
                aria-label="카테고리"
            >
                {title}
            </li>
            <div ref={onSetObservationTarget}></div>
        </>
    );
}

export default memo(PrivateCategoryItems);
