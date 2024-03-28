import { atom } from 'recoil';

export const userCategoryState = atom<any[]>({
    key: 'userCategoryState',
    default: [],
});
