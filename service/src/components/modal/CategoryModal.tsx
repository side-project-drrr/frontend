import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

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

interface Props {
    handleClose: () => void;
    onModalOpen: boolean;
}

export default function CategoryModal({ handleClose, onModalOpen }: Props) {
    const [didMount, setDidmount] = useState(false);
    const [categoryItems, setCategoryItems] = useState<any[]>([]);
    const [addCategories, setAddCategories] = useState<string[]>([]);
    async function getCategoryList() {
        const responese = axios.get('/categoryList');
        const categoryListData = (await responese).data;
        setCategoryItems(categoryListData);
    }
    const handleAddCategory = (e: React.MouseEvent<HTMLElement>) => {
        const { id } = e.target as HTMLButtonElement;

        setAddCategories(prev => [...prev, id]);
    };

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
                            <li
                                key={categoryitem.id}
                                id={categoryitem.id}
                                className="bg-[#E6F1FE] h-10 p-5 text-[#006FEE] text-center flex justify-center items-center rounded-lg "
                                onClick={handleAddCategory}
                            >
                                {categoryitem.title}
                            </li>
                        ))}
                    </ul>
                    <Button className="w-10/12" color="primary">
                        선택({addCategories.length}/10)
                    </Button>
                </Box>
            </Modal>
        </>
    );
}
