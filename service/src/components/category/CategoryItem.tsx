import { memo } from 'react';
import { CategoryItemsProps } from './type';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';
import { snackbarOpenState } from '../../recoil/atom/snackbarOpenState';
import { msg } from '../../constants/message';

function CategoryItem({ categoryId, title, onSetObservationTarget }: CategoryItemsProps) {
    const [userCategoryItems, setUserCategoryItems] = useRecoilState(userCategoryState); //선호 카테고리
    const categoryItem = useRecoilValue(categoryItemsState);
    const setSnackbarOpen = useSetRecoilState(snackbarOpenState);

    const handleActiveCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        const clickedCategoryId = e.currentTarget.id;

        const set = new Set(userCategoryItems.map(v => String(v.id)));
        if (set.has(clickedCategoryId)) {
            const filterActiveCateogiesData = userCategoryItems.filter(
                categoryitem => String(categoryitem.id) !== clickedCategoryId,
            );

            setUserCategoryItems(filterActiveCateogiesData);
        } else {
            if (userCategoryItems.length < 10) {
                const someCategoryItem = categoryItem.filter(
                    item => String(item.id) === clickedCategoryId,
                );
                setUserCategoryItems(prev => [...prev, ...someCategoryItem]);
            } else {
                setSnackbarOpen({
                    open: true,
                    vertical: 'top',
                    horizontal: 'center',
                    text: msg.under,
                });
                return;
            }
        }
    };

    return (
        <>
            <li
                key={categoryId}
                id={String(categoryId)}
                className={` h-10 p-5 whitespace-nowrap text-center flex justify-center items-center rounded-lg  flex-1 ${
                    userCategoryItems.some(categoryItem => categoryItem.id === categoryId)
                        ? 'bg-[#2C2C2C] text-white'
                        : 'bg-[#F2F2F2]  text-black '
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
