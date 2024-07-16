import { atom } from 'recoil';
import { IListBoxType } from '../../../types/listbox/ListBoxType';

export const techBlogDataState = atom<IListBoxType[]>({
    key: 'techBlogDataState',
    default: [],
});
