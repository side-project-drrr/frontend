import { atom } from 'recoil';

interface Props {
    id: string;
    name: string;
}

export const userCategoryState = atom<Props[]>({
    key: 'userCategoryState',
    default: [],
});
