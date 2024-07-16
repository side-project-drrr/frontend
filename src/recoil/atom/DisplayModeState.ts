import { atom } from 'recoil';

export const DisplayModeState = atom<boolean>({
    key: 'DisplayModeState',
    default: true,
});
