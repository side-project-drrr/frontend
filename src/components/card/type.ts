export interface ICardItemsProps {
    item: {
        techBlogPostBasicInfoDto: {
            id: string;
            title: string;
            summary: string;
            thumbnailUrl: string;
            likeCount: number;
            viewCount: number;
            url: string;
        };
        categoryDto: { id: string; name: string }[];
        hasMemberLikedPost: boolean;
    };
    index: number;
}
