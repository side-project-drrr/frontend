import { useEffect, useState, useCallback, memo } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { UserCategoryProps } from './type';
import {
    categorySearchService,
    getCategoryItem,
    putUserCategoryItem,
} from '../../service/CategoryService';

import UserCategoryItem from '../category/UserCategoryItem';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import SignupTitle from '@monorepo/component/src/stories/singupTitle/SignupTitle';
import { InputTextField } from '../../style/inputText';
import { IconButton } from '@mui/material';
import { BsSend } from 'react-icons/bs';
import useDebounce from '../../hooks/useDebounce';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    height: '58%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};

function UserCategoryModal({ onModalOpen, onClose, userGetCategoryRender }: UserCategoryProps) {
    const [categoryItems, setCategoryItems] = useState<any[]>([]); //전체 카테고리 리스트
    const [activeCategoriesData, setActiveCategoriesData] = useState<any[]>([]); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useState(''); // 검색value
    const [isSearching, setIsSearching] = useState(false); // 검색value
    const [page, setPage] = useState(0);

    const buttonStyle = {
        backgroundImage: `linear-gradient(to right, #FFA471 ${activeCategoriesData.length}0%, #F0F0F0 20%)`,
        color: 'black', // Set the text color if needed
        borderRadius: '10px 5px 5px 10px', // Specify border radius for each corner
    };

    const size = 20;

    async function getCategorySearchRender() {
        const categorySearchData = await categorySearchService({
            keyword: categorySearchValue,
            page,
            size,
        });

        setCategoryItems(prev => [...prev, ...categorySearchData.content]);
        setIsSearching(true);
    }

    async function getCategoryListRender() {
        const categoryData = await getCategoryItem({ page, size });

        setCategoryItems(prev => [...prev, ...categoryData.content]);
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
        if (data !== undefined) {
            await userGetCategoryRender();
        }
        onClose();
    };

    const fetchMoreIssue = useCallback(() => {
        setPage(prev => prev + 1);
    }, [categoryItems]);

    const setObservationTarget = useIntersectionObserver(fetchMoreIssue);

    const searchValueDebounce = useDebounce(categorySearchValue, { delay: 500 });

    useEffect(() => {
        if (onModalOpen && !isSearching) {
            getCategoryListRender();
        }
    }, [page, onModalOpen]);

    useEffect(() => {
        if (categorySearchValue.length > 0) {
            getCategorySearchRender();
            setCategoryItems([]);
            setPage(0);
        } else {
            setIsSearching(false);
        }
    }, [categorySearchValue, searchValueDebounce]);

    return (
        <>
            <Modal onClose={onClose} open={onModalOpen}>
                <Box sx={style} className="flex flex-col items-center justify-around w-full">
                    <SignupTitle onHangleCloseClick={onClose} />

                    <div className="flex items-center justify-center w-full mt-5">
                        <InputTextField
                            placeholder="검색"
                            variant="outlined"
                            onChange={handleCategorySearchItem}
                            aria-label="검색창"
                            sx={{ width: '67%' }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        color="primary"
                                        component="span"
                                        className="w-10 h-10"
                                        onClick={getCategorySearchRender}
                                    >
                                        <BsSend className="hover:text-[#E6783A]" />
                                    </IconButton>
                                ),
                            }}
                            autoComplete="off"
                        />
                    </div>
                    <ul className="flex w-[65%] gap-2 justify-start flex-wrap overflow-y-scroll mt-2">
                        {categoryItems?.map(categoryitem => (
                            <>
                                <UserCategoryItem
                                    key={categoryitem.id}
                                    categoryId={categoryitem.id}
                                    title={categoryitem.name}
                                    setActiveCategoriesData={setActiveCategoriesData}
                                    activeCategoriesData={activeCategoriesData}
                                    onSetObservationTarget={setObservationTarget}
                                />
                            </>
                        ))}
                    </ul>
                    <Button
                        className="w-[65%]"
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

export default memo(UserCategoryModal);
