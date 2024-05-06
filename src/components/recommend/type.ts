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
