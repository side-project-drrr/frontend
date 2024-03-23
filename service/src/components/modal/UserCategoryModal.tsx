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

import PrivateCategoryItems from '../category/PrivateCategoryItems';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

import SignupTitle from '@monorepo/component/src/stories/singupTitle/SignupTitle';
import { InputTextField } from '../../style/inputText';
import { IconButton } from '@mui/material';
import { BsSend } from 'react-icons/bs';
import useDebounce from '../../hooks/useDebounce';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categorySearchValueState } from '../../recoil/atom/categorySearchValueState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';

import SelectedCategoryDisplay from '../category/SelectedCategoryDisplay';
import { userCategoryState } from '../../recoil/atom/userCategoryState';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '40%',
    height: '70%',
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};

export interface IActiveDataProps {
    id: number;
    name: string;
}

function UserCategoryModal({ onModalOpen, onClose, userGetCategoryRender }: UserCategoryProps) {
    const [categoryItems, setCategoryItems] = useRecoilState(categoryItemsState); //전체 카테고리 리스트
    const [didMount, setDidMount] = useState(false); //전체 카테고리 리스트
    const userCategoryItems = useRecoilValue(userCategoryState); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useRecoilState(categorySearchValueState); // 검색value
    const [isSearching, setIsSearching] = useState(false); // 검색value
    const [page, setPage] = useState(0);
    const buttonStyle = {
        backgroundImage: `linear-gradient(to right, #FFA471 ${userCategoryItems.length}0%, #F0F0F0 20%)`,
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

    async function userUpdateCategoryRender(activeCategoriesData: { id: number; name: string }[]) {
        const stringConvertNumberActiveData = activeCategoriesData.map(data => +data.id);
        return await putUserCategoryItem(stringConvertNumberActiveData);
    }

    const handleCategorySearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategorySearchValue(value);
    };

    const handleUserCreateCategory = async (
        activeCategoriesData: { id: number; name: string }[],
    ) => {
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
        if (onModalOpen && !isSearching && didMount) {
            getCategoryListRender();
        }
    }, [page, onModalOpen, didMount]);

    useEffect(() => {
        setDidMount(true);
    }, []);

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
                                <PrivateCategoryItems
                                    key={categoryitem.id}
                                    categoryId={categoryitem.id}
                                    title={categoryitem.name}
                                    onSetObservationTarget={setObservationTarget}
                                />
                            </>
                        ))}
                    </ul>

                    <SelectedCategoryDisplay />
                    <Button
                        className="w-[65%]"
                        style={buttonStyle}
                        onClick={() => handleUserCreateCategory(userCategoryItems)}
                        role="Button"
                        aria-label="카테고리 선택 완료"
                    >
                        <p>선택({userCategoryItems.length}/10)</p>
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default memo(UserCategoryModal);
