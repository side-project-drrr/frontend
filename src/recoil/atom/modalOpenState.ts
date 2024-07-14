import { atom } from 'recoil';

export const modalOpenState = atom<boolean>({
    key: 'modalOepnState',
    default: false,
});
