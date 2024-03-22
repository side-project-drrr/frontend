import CloseIcon from '@mui/icons-material/Close';
import { useRecoilValue } from 'recoil';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import { useState } from 'react';
//import { categoriesItemClickedState } from '../../recoil/atom/categoriesItemClickedState';

export default function UserSelectedCategoryDisplay() {
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(''); // 선택된 카테고리의 ID
    const userCategoryItems = useRecoilValue(userCategoryState); // 선호 카테고리 목록
    //    const setCategoriesItemClicked = useSetRecoilState(categoriesItemClickedState);
    // 선택된 카테고리를 제외한 모든 카테고리 아이템을 필터링
    const filteredUserCategoryItems = userCategoryItems.filter(
        item => String(item.id) !== selectedCategoryId,
    );

    // 카테고리 아이템을 클릭했을 때 해당 아이템의 ID를 state에 설정
    const handleUserCategoryItem = (e: React.MouseEvent<HTMLElement>) => {
        // setCategoriesItemClicked(false);
        setSelectedCategoryId(e.currentTarget.id);
    };
    console.log(userCategoryItems);

    console.log(333333333333);
    console.log(selectedCategoryId);

    return (
        <ul className="flex whitespace-nowrap p-5 gap-2 items-center flex-wrap w-[75%]">
            {filteredUserCategoryItems &&
                filteredUserCategoryItems.map(usercategoryitem => (
                    <li
                        key={usercategoryitem.id}
                        id={String(usercategoryitem.id)}
                        className="flex bg-[#f0f0f0] text-black gap-2 text-sm pr-2 pl-2 rounded-lg items-center justify-center"
                        onClick={e => handleUserCategoryItem(e)}
                    >
                        <CloseIcon sx={{ width: '20px' }} />
                        {usercategoryitem.name}
                    </li>
                ))}
        </ul>
    );
}
