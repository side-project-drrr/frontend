import { atom } from 'recoil';

export const categoriesItemClickedState = atom<boolean>({
    key: 'categoriesItemClickedState',
    default: false,
});
