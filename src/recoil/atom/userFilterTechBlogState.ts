import { atom } from 'recoil';

export const userFilterTechBlogState = atom<any[]>({
    key: 'userFilterTechBlogState',
    default: [],
});
