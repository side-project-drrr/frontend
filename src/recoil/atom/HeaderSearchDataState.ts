import { atom } from 'recoil';
import { IHeaderSearch } from '../../../types/header/HeaderSearchDataState';

export const HeaderSearchDataState = atom<IHeaderSearch[]>({
    key: 'HeaderSearchDataState',
    default: [],
});
