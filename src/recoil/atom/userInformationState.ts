import { atom } from 'recoil';
import { ISignProfileValueProps } from '../../../types/signin/SignUpType';

export const userInformationState = atom<ISignProfileValueProps>({
    key: 'userInformationState',
    default: {
        email: '',
        nickName: '',
    },
});
