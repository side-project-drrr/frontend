export interface ICardItemsProps {
    item: {
        techBlogPostBasicInfoDto: {
            id: string;
            title: string;
            summary: string;
            thumbnailUrl: string;
            postLike: number;
            viewCount: number;
        };
        categoryDto: { id: string; name: string }[];
    };
    index: number;
}
