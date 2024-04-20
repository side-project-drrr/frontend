export interface IListBoxProps {
    items: {
        techBlogPostBasicInfoDto: {
            id: string;
            title: string;
            summary: string;
            thumbnailUrl: string;
            postLike: number;
            viewCount: number;
        };
        categoryDto: { id: string; name: string }[];
    }[];
    onCategoryId?: number;
    onFilterItems?: any;
}

export interface ItemProps {
    item: {
        techBlogPostBasicInfoDto: {
            id: string;
            title: string;
            summary: string;
            thumbnailUrl: string;
            postLike: number;
            viewCount: number;
            url: string;
        };
        categoryDto: { id: string; name: string }[];
    };
    index: number;
}
