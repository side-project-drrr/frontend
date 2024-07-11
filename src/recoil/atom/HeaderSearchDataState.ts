import { atom } from 'recoil';
import { HeaderSearch } from '../../../types/HeaderSearchDataState';

export const HeaderSearchDataState = atom<HeaderSearch[]>({
    key: 'HeaderSearchDataState',
    default: [],
});
