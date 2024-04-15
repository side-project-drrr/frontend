import { atom } from 'recoil';

export const postLikeIdsState = atom<[]>({
    key: 'postLikeIdsState',
    default: [],
});
