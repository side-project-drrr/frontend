export interface IListBoxType {
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
    categoryDto: { id: string; name: string }[];
}

export interface ItemProps {
    item: IListBoxType;
    index: number;
}
