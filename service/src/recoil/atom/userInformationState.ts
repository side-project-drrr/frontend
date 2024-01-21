import { atom } from 'recoil';

export const userInformationState = atom({
    key: 'userInformationState',
    default: {
        email: '',
        nickname: '',
    },
});
