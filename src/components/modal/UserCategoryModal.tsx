import { useEffect, memo, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { UserCategoryProps } from './type';
import { putUserCategoryItem } from '../../service/CategoryService';
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
import { useUserCategoryQuery } from '../../hooks/useUserCategoryQuery';

export interface IActiveDataProps {
    id: number;
    name: string;
}

const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

function UserCategoryModal({ onModalOpen, onClose, userGetCategoryRender }: UserCategoryProps) {
    const [categoryItems, setCategoryItems] = useRecoilState(categoryItemsState); // 전체 카테고리 리스트
    const userCategoryItems = useRecoilValue(userCategoryState); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useRecoilState(categorySearchValueState); // 검색 value
    const setSnackbarOpen = useSetRecoilState(snackbarOpenState);
    const observerElem = useRef<HTMLDivElement | null>(null);
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useUserCategoryQuery(categorySearchValue);
    const debouncedSearch = useRef(
        debounce(async (value: string) => {
            setCategoryItems([]);
            setCategorySearchValue(value);
        }, 1000),
    ).current;

    async function userUpdateCategoryRender(activeCategoriesData: { id: number; name: string }[]) {
        const stringConvertNumberActiveData = activeCategoriesData.map(data => +data.id);
        return await putUserCategoryItem(stringConvertNumberActiveData);
    }

    const handleSearch = useCallback(
        (searchQuery: string) => {
            debouncedSearch(searchQuery);
        },
        [debouncedSearch],
    );

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
        if (onModalOpen && data) {
            const allPosts = data.pages.flatMap(value => value.content);
            setCategoryItems(prevItems => [...prevItems, ...allPosts]);
        }
    }, [onModalOpen, data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                threshold: 0.5,
            },
        );

        if (observerElem.current) {
            observer.observe(observerElem.current);
        }

        return () => {
            if (observerElem.current) {
                observer.unobserve(observerElem.current);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    return (
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
                        onChange={e => handleSearch(e.target.value)}
                        aria-label="검색창"
                        sx={(theme: any) => ({
                            width: '60%',
                            [theme.breakpoints.down('sm')]: { width: '100%' },
                        })}
                        autoComplete="off"
                    />
                </div>
                <ul
                    className="flex w-[65%] gap-2 justify-start flex-wrap overflow-y-scroll mt-2 max-[600px]:w-full"
                    id="CategoryModal-Scroll"
                >
                    {categoryItems?.map((categoryitem, index) => (
                        <PrivateCategoryItems
                            key={categoryitem.id}
                            categoryId={categoryitem.id}
                            title={categoryitem.name}
                            onIndex={index}
                        />
                    ))}
                    <div ref={observerElem} style={{ width: '100%', height: '100px' }}>
                        {isFetchingNextPage && hasNextPage
                            ? 'Loading more...'
                            : 'Data does not exist'}
                    </div>
                </ul>

                <SelectedCategoryDisplay />
                <Button
                    className="w-[65%]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #FFA471 ${userCategoryItems.length * 10}%, #F0F0F0 20%)`,
                        color: 'black',
                        borderRadius: '10px 5px 5px 10px',
                    }}
                    onClick={() => handleUserCreateCategory(userCategoryItems)}
                    role="Button"
                    aria-label="카테고리 선택 완료"
                    sx={(theme: any) => ({ [theme.breakpoints.down('sm')]: { width: '100%' } })}
                >
                    <p>선택({userCategoryItems.length}/10)</p>
                </Button>
            </Box>
        </Modal>
    );
}

export default memo(UserCategoryModal);
