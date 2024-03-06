export interface TopKeywordProps {
    id: string;
    name: string;
}

export interface ITopPostProps {
    item: {
        techBlogPostBasicInfoDto: {
            id: string;
            title: string;
            summary: string;
            techBlogCode: string;
            thumbnailUrl: string;
            viewCount: number;
            postLike: number;
            writtenAt: Date;
            url: string;
        };
        categoryDto: { id: string; name: string }[];
    };
}
export interface ITopPostCategoryProps {
    data: { id: string; name: string };
}
