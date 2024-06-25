export interface IListBoxProps {
    onFilterItems?: any;
    onSearchData?: any;
}

export interface ItemProps {
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
        hasMemberLikedPost: boolean;
        categoryDto: { id: string; name: string }[];
    };
    index: number;
}
