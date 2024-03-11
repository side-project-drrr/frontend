import { atom } from 'recoil';

export const isSearchFocusedState = atom<boolean>({
    key: 'isSearchFocusedState',
    default: false,
});
