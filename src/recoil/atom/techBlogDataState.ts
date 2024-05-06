import { atom } from 'recoil';

export const techBlogDataState = atom<any[]>({
    key: 'techBlogDataState',
    default: [],
});
