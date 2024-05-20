import { useEffect, useState, useRef } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { UserCategoryProps } from './type';
import {
    categorySearchService,
    getCategoryItem,
    putUserCategoryItem,
} from '../../service/CategoryService';

import PrivateCategoryItems from '../../components/category/PrivateCategoryItems';

import ModalTitle from '../../stories/modalTitle/ModalTitle';
import { InputTextField } from '../../style/inputText';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categorySearchValueState } from '../../recoil/atom/categorySearchValueState';
import { categoryItemsState } from '../../recoil/atom/categoryItemsState';

import SelectedCategoryDisplay from '../../components/category/SelectedCategoryDisplay';
import { userCategoryState } from '../../recoil/atom/userCategoryState';
import { snackbarOpenState } from '../../recoil/atom/snackbarOpenState';
import { msg } from '../../constants/message';

export interface IActiveDataProps {
    id: number;
    name: string;
}

function UserCategoryModal({ onModalOpen, onClose, userGetCategoryRender }: UserCategoryProps) {
    const [categoryItems, setCategoryItems] = useRecoilState(categoryItemsState); //전체 카테고리 리스트
    const userCategoryItems = useRecoilValue(userCategoryState); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useRecoilState(categorySearchValueState); // 검색value
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    const setUserCategoryItems = useSetRecoilState(userCategoryState); //선호 카테고리

    const [isSearching, setIsSearching] = useState(false); // 검색value
    const [page, setPage] = useState(0);
    const setSnackbarOpen = useSetRecoilState(snackbarOpenState);
    const observationTarget = useRef(null);

    const buttonStyle = {
        backgroundImage: `linear-gradient(to right, #FFA471 ${userCategoryItems.length}0%, #F0F0F0 20%)`,
        color: 'black', // Set the text color if needed
        borderRadius: '10px 5px 5px 10px', // Specify border radius for each corner
    };

    const size = 20;

    const onIntersect = async (entries: any, observer: any) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            setPage(prev => prev + 1);
        }
    };

    async function getCategorySearchRender(categorySearchValue: string) {
        const categorySearchData = await categorySearchService({
            keyword: categorySearchValue,
            page,
            size,
        });

        setCategoryItems(prev => [...prev, ...categorySearchData.content]);
        if (observationTarget.current) {
            observer.observe(observationTarget.current);
        }
    }

    async function getCategoryListRender() {
        const categoryData = await getCategoryItem({ page, size });

        setCategoryItems(prev => [...prev, ...categoryData.content]);
        if (observationTarget.current) {
            observer.observe(observationTarget.current);
        }
    }

    async function userUpdateCategoryRender(activeCategoriesData: { id: number; name: string }[]) {
        const stringConvertNumberActiveData = activeCategoriesData.map(data => +data.id);
        return await putUserCategoryItem(stringConvertNumberActiveData);
    }

    const searchDataDebouce = (value: string) => {
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(async () => {
            setPage(0);
            setCategoryItems([]);
            await getCategorySearchRender(value);
        }, 1000);
        setTimer(newTimer);
    };

    const handleCategorySearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 0) {
            searchDataDebouce(value);
        }

        setCategorySearchValue(value);
    };

    const handleCategorySearchKeyborad = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.keyCode === 8 && categorySearchValue.length > 0) {
            setPage(0);
        }
    };

    const handleUserCreateCategory = async (
        activeCategoriesData: { id: number; name: string }[],
    ) => {
        if (activeCategoriesData.length === 0) {
            setSnackbarOpen({
                open: true,
                vertical: 'top',
                horizontal: 'center',
                text: msg.under,
            });
            return;
        }
        const data = await userUpdateCategoryRender(activeCategoriesData);
        if (data !== undefined) {
            await userGetCategoryRender();
        }
        onClose();
    };

    useEffect(() => {
        if (onModalOpen && !isSearching) getCategoryListRender();
    }, [onModalOpen, page]);

    useEffect(() => {
        setUserCategoryItems(prev => [...prev]);
    }, [onModalOpen]);

    useEffect(() => {
        if (categorySearchValue.length > 0) {
            setCategoryItems([]);
            setIsSearching(true);
            setPage(0);
        } else {
            setIsSearching(false);
            setPage(0);
        }
    }, [categorySearchValue]);

    const observer = new IntersectionObserver(onIntersect, { threshold: 0 });
    return (
        <>
            <Modal onClose={onClose} open={onModalOpen}>
                <Box
                    sx={(theme: any) => ({
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '600px',
                        height: '620px',
                        bgcolor: '#FFFFFF',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '10px',

                        [theme.breakpoints.down('sm')]: { width: '350px', top: '50%', left: '50%' },
                    })}
                    className="flex flex-col items-center justify-around"
                >
                    <ModalTitle onHangleCloseClick={onClose} state="signup" />
                    <div className="flex items-center justify-center w-11/12 mt-5 ">
                        <InputTextField
                            placeholder="검색"
                            variant="outlined"
                            onChange={handleCategorySearchItem}
                            aria-label="검색창"
                            sx={(theme: any) => ({
                                width: '60%',
                                [theme.breakpoints.down('sm')]: { width: '100%' },
                            })}
                            onKeyDown={(e: any) => handleCategorySearchKeyborad(e)}
                            autoComplete="off"
                        />
                    </div>
                    <ul
                        className="flex w-[65%] gap-2 justify-start flex-wrap overflow-y-scroll mt-2 max-[600px]:w-full "
                        id="CategoryModal-Scroll"
                    >
                        {categoryItems?.map((categoryitem, index) => (
                            <PrivateCategoryItems
                                key={index}
                                categoryId={categoryitem.id}
                                title={categoryitem.name}
                                onIndex={index}
                            />
                        ))}
                        <div ref={observationTarget}>Loading...</div>
                    </ul>

                    <SelectedCategoryDisplay />
                    <Button
                        className="w-[65%]"
                        style={buttonStyle}
                        onClick={() => handleUserCreateCategory(userCategoryItems)}
                        role="Button"
                        aria-label="카테고리 선택 완료"
                        sx={(theme: any) => ({ [theme.breakpoints.down('sm')]: { width: '100%' } })}
                    >
                        <p>선택({userCategoryItems.length}/10)</p>
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default UserCategoryModal;
