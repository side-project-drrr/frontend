import { atom } from 'recoil';
import { ICategoryProps } from '../../../types/CategoryStateType';

export const categoryItemsState = atom<ICategoryProps[]>({
    key: 'categoryItemsState',
    default: [],
});
