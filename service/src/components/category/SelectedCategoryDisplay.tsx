import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { activeCategoryState } from '../../recoil/atom/activeCategoryState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';
//import { categoriesItemClickedState } from '../../recoil/atom/categoriesItemClickedState';

export default function SelectedCategoryDisplay() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(''); // 선택된 카테고리의 ID
    const [activeCategory, setActiveCategory] = useRecoilState(activeCategoryState);
    //const [filteredUserCategoryItems, setFilterdUserCategoryItems] = useState<IProps[]>([]);
    const categoryItems = useRecoilValue(categoryItemsState);
    //const setCategoriesItemClicked = useSetRecoilState(categoriesItemClickedState);
    // 선택된 카테고리를 제외한 모든 카테고리 아이템을 필터링
    const handleFilteredUserCategoryItems = () => {
        const abc = activeCategory.filter(item => String(item.id) !== selectedCategoryId);
        setActiveCategory([...abc]);
    };

    // 카테고리 아이템을 클릭했을 때 해당 아이템의 ID를 state에 설정
    const handleUserCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        const selectedCategoryId = e.currentTarget.id;
        console.log(33333);

        setSelectedCategoryId(selectedCategoryId);
        const set = new Set(activeCategory.map(v => String(v.id)));

        if (set.has(selectedCategoryId)) {
            const filterActiveCategoiesData = activeCategory.filter(
                categoryitem => String(categoryitem.id) !== selectedCategoryId,
            );
            setActiveCategory([...filterActiveCategoiesData]);
            //setCategoriesItemClicked(false);
        } else {
            if (activeCategory.length < 10) {
                const someActiveCategoiesData = categoryItems.filter(
                    item => String(item.id) === selectedCategoryId,
                );
                setActiveCategory(prev => [...prev, ...someActiveCategoiesData]);
                //  setCategoriesItemClicked(true);
            }
        }
    };

    console.log(activeCategory);

    useEffect(() => {
        handleFilteredUserCategoryItems();
    }, []);

    return (
        <ul className="flex whitespace-nowrap p-5 gap-2 items-center flex-wrap w-[75%]">
            {activeCategory &&
                activeCategory.map(categoryItem => (
                    <li
                        key={categoryItem.id}
                        id={String(categoryItem.id)}
                        className="flex bg-[#f0f0f0] text-black gap-2 text-sm pr-2 pl-2 rounded-lg items-center justify-center"
                        onClick={e => handleUserCategoryItem(e)}
                    >
                        <CloseIcon sx={{ width: '20px' }} />
                        {categoryItem.name}
                    </li>
                ))}
        </ul>
    );
}
