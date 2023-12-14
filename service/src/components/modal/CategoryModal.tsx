import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
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

export default function CategoryModal({ handleClose, onModalOpen }: CategoryProps) {
    const [didMount, setDidmount] = useState(false);
    const [categoryItems, setCategoryItems] = useState<any[]>([]);
    const [activeCategoriesData, setActiveCategoriesData] = useState<string[]>([]);

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
                        />
                        <Button className="bg-[#006FEE]">검색</Button>
                    </div>
                    <ul className="flex flex-wrap justify-around w-full h-[25vh] gap-4 overflow-y-scroll ">
                        {categoryItems.map(categoryitem => (
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
