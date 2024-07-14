import { atom } from 'recoil';

export const providerIdState = atom<string>({
    key: 'providerIdState',
    default: '',
});
