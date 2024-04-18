import { atom } from 'recoil';

export const selectedCategoryState = atom<boolean>({
    key: 'selectedCategoryState',
    default: false,
});
