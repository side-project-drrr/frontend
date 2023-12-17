import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState, memo, useCallback } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CategoryItem from '../category/CategoryItem';
import { CategoryProps } from './type';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 534,
    height: 483,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
};

function CategoryModal({ handleClose, onModalOpen }: CategoryProps) {
    const [didMount, setDidmount] = useState(false);
    const [categoryItems, setCategoryItems] = useState<any[]>([]); //전체 카테고리 리스트
    //const [copyCategoryItems, setCopyCategoryItems] = useState<any[]>([]); //copy 전체 카테고리 리스트
    const [activeCategoriesData, setActiveCategoriesData] = useState<string[]>([]); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useState(''); // 검색value
    //원본
    //핸들링 할 카테고리 리스트
    //검색했을때 안했을때 상태를 가지고 있어야 한다.
    //검색하고 나서 다시 다른걸 검색할때에 대한 처리가 필요
    //전체 카테고리 리스트 다시 보여 줄 수있다.
    async function getCategoryList() {
        const response = axios.get('/categoryList');
        const categoryListData = (await response).data;
        setCategoryItems(categoryListData);
    }

    async function handleCategory() {
        const response = axios.post('/category/create', { activeCategoriesData });
        const data = (await response).data;
        console.log(data);
    }

    const handleCategorySearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategorySearchValue(value);
        // setCopyCategoryItems(
        //     categoryItems.filter(item =>
        //         item.title.toLocaleUpperCase().startsWith(value.toLocaleUpperCase()),
        //     ),
        // );
    };
    const categorySearchItemList = useCallback(
        (value?: string) => {
            console.log(456);
            if (value) {
                return categoryItems.filter(item =>
                    item.title.toLocaleUpperCase().startsWith(value.toLocaleUpperCase()),
                );
            } else {
                return categoryItems;
            }
        },
        [categoryItems],
    );

    useEffect(() => {
        setDidmount(true);
    }, []);

    useEffect(() => {
        if (didMount) {
            //카테고리리스트 api 호출
            getCategoryList();
        }
    }, [didMount]);

    return (
        <>
            <Modal onClose={handleClose} open={onModalOpen}>
                <Box sx={style} className="flex flex-col items-center justify-around">
                    <div className="flex justify-start w-full pb-2 text-black border-b-2 border-solid">
                        <h1 className="text-base">선호 카테고리 등록</h1>
                    </div>
                    <div className="flex">
                        <TextField
                            placeholder="검색"
                            variant="outlined"
                            className="h-12 rounded-1xl w-96"
                            onChange={handleCategorySearchItem}
                        />
                    </div>
                    <ul className="flex flex-wrap justify-around w-full h-[25vh] gap-4 overflow-y-scroll">
                        {categorySearchItemList(categorySearchValue).map(categoryitem => (
                            <CategoryItem
                                key={categoryitem.id}
                                id={categoryitem.id}
                                title={categoryitem.title}
                                setActiveCategoriesData={setActiveCategoriesData}
                                activeCategoriesData={activeCategoriesData}
                            />
                        ))}
                    </ul>
                    <Button className="w-10/12" color="primary" onClick={handleCategory}>
                        선택({activeCategoriesData.length}/10)
                    </Button>
                </Box>
            </Modal>
        </>
    );
}

export default memo(CategoryModal);
