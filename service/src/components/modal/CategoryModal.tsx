import { useEffect, useState, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import CategoryItem from '../category/CategoryItem';
import { CategoryProps } from './type';
import { getCategoryItem } from '../../service/CategoryService';
import { userInformationState } from '../../recoil/atom/userInformationState';
import { providerIdState } from '../../recoil/atom/providerIdState';
import { SignUpService } from '../../service/auth/SocialService';
import { setAuthStorage } from '../../repository/AuthRepository';
import { getProvider } from '../../repository/ProviderRepository';
import { modalOpenState } from '../../recoil/atom/modalOpenState';

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

function CategoryModal({ onModalOpen, onClose }: CategoryProps) {
    const [didMount, setDidmount] = useState(false);
    const [categoryItems, setCategoryItems] = useState<any[]>([]); //전체 카테고리 리스트
    const [activeCategoriesData, setActiveCategoriesData] = useState<any[]>([]); // 카테고리 선택
    const [categorySearchValue, setCategorySearchValue] = useState(''); // 검색value
    const profileValue = useRecoilValue(userInformationState);
    const setModalOpen = useSetRecoilState(modalOpenState);
    const providerId = useRecoilValue(providerIdState);
    const provider = getProvider('provider');
    const ACCESSTOKEN_KEY = 'accessToken';
    const REFRESHTOKEN_KEY = 'refreshToken';
    const stringConvert = provider?.toString();
    async function getCategoryList() {
        const categoryData = await getCategoryItem();
        setCategoryItems(categoryData);
    }
    async function signupRender() {
        const tokenData = await SignUpService({
            email: profileValue.email,
            categoryIds: activeCategoriesData,
            nickName: profileValue.nickname,
            provider: stringConvert,
            providerId,
        });
        setAuthStorage(
            ACCESSTOKEN_KEY,
            tokenData.accessToken,
            REFRESHTOKEN_KEY,
            tokenData.refreshToken,
        );
        setModalOpen(false);
    }

    async function handleCategory() {
        signupRender();
    }

    const handleCategorySearchItem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCategorySearchValue(value);
    };

    const categorySearchItemList = useMemo(() => {
        if (categorySearchValue) {
            return categoryItems.filter(item =>
                item.categoryName
                    .toLocaleUpperCase()
                    .startsWith(categorySearchValue.toLocaleUpperCase()),
            );
        }
        return categoryItems;
    }, [categoryItems, categorySearchValue]);

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
            <Modal onClose={onClose} open={onModalOpen}>
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
                        {categorySearchItemList?.map(categoryitem => (
                            <CategoryItem
                                key={categoryitem.id}
                                id={categoryitem.id}
                                title={categoryitem.categoryName}
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

export default CategoryModal;
