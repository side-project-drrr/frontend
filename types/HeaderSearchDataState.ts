export interface HeaderSearch {
    techBlogPostBasicInfoDto: {
        id: string;
        title: string;
        summary: string;
        thumbnailUrl: string;
        likeCount: number;
        viewCount: number;
    };
    hasMemberLikedPost: boolean;
    categoryDto: { id: string; name: string }[];
}
