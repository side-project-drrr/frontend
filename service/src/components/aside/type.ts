export interface TopKeywordProps {
    id: string;
    name: string;
}

export interface ITopPostProps {
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
