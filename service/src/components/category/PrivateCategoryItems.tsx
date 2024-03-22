import { useEffect, memo } from 'react';
import { CategoryItemsProps } from './type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';
import { selectedCategoryState } from '../../recoil/atom/selectedCategoryState';
//import { categoriesItemClickedState } from '../../recoil/atom/categoriesItemClickedState';
//import { CheckBox } from '@mui/icons-material';

function PrivateCategoryItems({
    categoryId,
    title,
    setActiveCategoriesData,
    activeCategoriesData,
    onSetCategoriesItemClicked,
    onCategoriesItemClicked,
    onSetObservationTarget,
}: CategoryItemsProps) {
    const userCategoryItems = useRecoilValue(userCategoryState); //선호 카테고리
    const categoryItems = useRecoilValue(categoryItemsState);
    const setSelectedCategoryState = useSetRecoilState(selectedCategoryState);
    const someUserSelectedCategories = () => {
        if (userCategoryItems.length > 0) {
            const userCategory = userCategoryItems.some(item => item.name === title);
            console.log(userCategory);

            //여기서는 사용자가 선택한 선호카테고리가 같은 전체 리스트의 값과 같은 id를 boolean 표시
            if (userCategory) {
                // const updatedCategoriesId = userCategoryItems.map((category: any) =>
                //     String(category.id),
                // );
                // const updatedCategories = userCategoryItems;
                // setUserCategoryItems([...updatedCategories]);
                setActiveCategoriesData([...userCategoryItems]);
                //onSetCategoriesItemClicked(true);
            }
        }
    };

    const handleActiveCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        const clickedCategoryId = e.currentTarget.id;
        console.log(333333333333);

        setSelectedCategoryState(true);
        const set = new Set(activeCategoriesData.map(v => String(v.id)));

        if (set.has(clickedCategoryId)) {
            const filterActiveCategoiesData = activeCategoriesData.filter(
                categoryitem => String(categoryitem.id) !== clickedCategoryId,
            );

            setActiveCategoriesData(filterActiveCategoiesData);
            //onSetCategoriesItemClicked(false);
        } else {
            if (activeCategoriesData.length < 10) {
                const someActiveCategoiesData = categoryItems.filter(
                    item => String(item.id) === clickedCategoryId,
                );
                setActiveCategoriesData(prev => [...prev, ...someActiveCategoiesData]);
                //setUserCategoryItems(prev => [...prev, ...someActiveCategoiesData]);
                //onSetCategoriesItemClicked(true);
            }
        }
    };

    useEffect(() => {
        someUserSelectedCategories();
    }, []);
    console.log(onCategoriesItemClicked);

    return (
        <>
            <li
                key={categoryId}
                id={String(categoryId)}
                className={`p-2 whitespace-nowrap text-center flex justify-center items-center rounded-lg flex-warp overflow-x-hidden ${
                    onCategoriesItemClicked
                        ? 'bg-[#2C2C2C] text-white'
                        : 'bg-[#F2F2F2]  text-black '
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
