export interface IRandomDataProps {
    techBlogPostBasicInfoDto: {
        id: string;
        title: string;
        summary: string;
        thumbnailUrl: string;
        likeCount: number;
        viewCount: number;
        url: string;
    };
    hasMemberLikedPost: boolean;
}

export type RecommendedItem = {
    category: { id: number; name: string }[];
    postInfo: {
        id: number;
        likeCount: number;
        viewCount: number;
        title: string;
        summary: string;
        url: string;
    };
};
