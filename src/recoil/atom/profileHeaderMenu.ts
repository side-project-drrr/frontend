import { atom } from 'recoil';

export const profileHeaderMenu = atom<boolean>({
    key: 'profileHeaderMenu',
    default: false,
});
