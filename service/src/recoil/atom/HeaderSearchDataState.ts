import { atom } from 'recoil';

interface Props {
    techBlogPostBasicInfoDto: {
        id: string;
        title: string;
        summary: string;
        thumbnailUrl: string;
        postLike: number;
        viewCount: number;
    };
    categoryDto: { id: string; name: string }[];
}

export const HeaderSearchDataState = atom<Props[]>({
    key: 'HeaderSearchDataState',
    default: [],
});
