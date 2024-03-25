import { atom } from 'recoil';

interface ICategoryProps {
    id: number;
    name: string;
}

export const categoryItemsState = atom<ICategoryProps[]>({
    key: 'categoryItemsState',
    default: [],
});
