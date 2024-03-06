import { atom } from 'recoil';

interface Props {
    techBlogPostBasicInfoDto: {
        id: number;
        title: string;
        summary: string;
        techBlogCode: string;
        thumbnailUrl: string;
        viewCount: number;
        postLike: number;
        writtenAt: Date;
        url: string;
    };
}

export const HeaderSearchDataState = atom<Props[]>({
    key: 'HeaderSearchDataState',
    default: [],
});
