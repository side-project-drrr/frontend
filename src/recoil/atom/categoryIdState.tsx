import { atom } from 'recoil';

export const categoryIdState = atom<number>({
    key: 'categoryIdState',
    default: 0,
});
