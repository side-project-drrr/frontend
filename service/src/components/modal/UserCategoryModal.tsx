import { useEffect, useState, useMemo, useCallback } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';

import { UserCategoryProps } from './type';
import { getCategoryItem, putUserCategoryItem } from '../../service/CategoryService';

import UserCategoryItem from '../category/UserCategoryItem';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import { useRecoilValue } from 'recoil';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '25%',
    height: '53%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};

const InputTextField = styled(TextField)({
    '& label': {
        color: 'black',
    },

    '& .MuiOutlinedInput-root': {
        color: 'black',
        '& fieldset': {
            borderRadius: 10,
            width: '24rem',
            backgroundColor: 'transparent',
            borderColor: '#E4E4E7',
            height: '3rem',
            textAlign: 'center',
            marginTop: '0.5rem',
            minWidth: '10rem',
        },
    },
});

const buttonStyle = {
    backgroundImage: 'linear-gradient(to right, #47F938 20%, #006FEE 20%)',
    color: 'white', // Set the text color if needed
    borderRadius: '10px 5px 5px 10px', // Specify border radius for each corner
};

function UserCategoryModal({ onModalOpen, onClose, userGetCategoryRender }: UserCategoryProps) {
    const [categoryItems, setCategoryItems] = useState<any[]>([]); //전체 카테고리 리스트
    const userCategoryItems = useRecoilValue(userCategoryState); //선호 카테고리
    const [activeCategoriesData, setActiveCategoriesData] = useState<any[]>([]); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useState(''); // 검색value
    const [page, setPage] = useState(0);

    const size = 20;

    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [categoryItems]);

    async function getCategoryList() {
        const categoryData = await getCategoryItem({ page, size });
        setCategoryItems(categoryData.content);
    }

    async function userUpdateCategoryRender(activeCategoriesData: string[]) {
        const stringConvertNumberActiveData = activeCategoriesData.map(data => +data);
        return await putUserCategoryItem(stringConvertNumberActiveData);
    }

    const handleCategorySearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategorySearchValue(value);
    };

    const handleUserCreateCategory = async (activeCategoriesData: string[]) => {
        const data = await userUpdateCategoryRender(activeCategoriesData);
        if (data === undefined) {
            await userGetCategoryRender();
        }
        onClose();
    };

    const categorySearchItemList = useMemo(() => {
        if (categorySearchValue) {
            return categoryItems.filter(item =>
                item.name.toLocaleUpperCase().startsWith(categorySearchValue.toLocaleUpperCase()),
            );
        }
        return categoryItems;
    }, [categoryItems, categorySearchValue]);

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);

    useEffect(() => {
        getCategoryList();
    }, [page]);
    return (
        <>
            <Modal onClose={onClose} open={onModalOpen}>
                <Box sx={style} className="flex flex-col items-center justify-around">
                    <div className="flex justify-start w-full pb-2 text-black border-b-2 border-solid">
                        <h1 className="text-base" aria-label="제목">
                            선호 카테고리 등록
                        </h1>
                    </div>
                    <div className="flex items-center w-full ml-6">
                        <InputTextField
                            placeholder="검색"
                            variant="outlined"
                            onChange={handleCategorySearchItem}
                            aria-label="검색창"
                        />
                    </div>
                    <ul className="flex flex-wrap justify-around w-full h-[25vh] gap-4 overflow-y-scroll">
                        {categorySearchItemList?.map(categoryitem => (
                            <UserCategoryItem
                                key={categoryitem.id}
                                id={categoryitem.id}
                                title={categoryitem.name}
                                setActiveCategoriesData={setActiveCategoriesData}
                                activeCategoriesData={activeCategoriesData}
                                onUserCategoryItems={userCategoryItems}
                                onSetObservationTarget={setObservationTarget}
                            />
                        ))}
                    </ul>
                    <Button
                        className="w-10/12 "
                        style={buttonStyle}
                        onClick={() => handleUserCreateCategory(activeCategoriesData)}
                        role="Button"
                        aria-label="카테고리 선택 완료"
                    >
                        <p>선택({activeCategoriesData.length}/10)</p>
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default UserCategoryModal;
