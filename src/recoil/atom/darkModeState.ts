import { atom } from 'recoil';

export const darkModeState = atom({
    key: 'darkModeState',
    default: localStorage.theme,
});
