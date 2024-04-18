import { atom } from 'recoil';
import { topicsType } from '../../components/topics/type';

export const topicState = atom<topicsType[]>({
    key: 'topic',
    default: [],
});

export const topicIndexState = atom<string>({
    key: 'topicIndex',
    default: 'all',
});

export const searchValueState = atom<string>({
    key: 'searchValue',
    default: '',
});
