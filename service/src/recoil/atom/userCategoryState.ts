import { atom } from 'recoil';

interface Props {
    id: number;
    name: string;
}

export const userCategoryState = atom<Props[]>({
    key: 'userCategoryState',
    default: [],
});
