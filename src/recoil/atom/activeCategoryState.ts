import { atom } from 'recoil';

interface Props {
    id: number;
    name: string;
}

export const activeCategoryState = atom<Props[]>({
    key: 'activeCategoryState',
    default: [],
});
