import { atom } from 'recoil';
import { ActiveProps } from '../../../types/ActiveCategoryState';

export const activeCategoryState = atom<ActiveProps[]>({
    key: 'activeCategoryState',
    default: [],
});
