export type CarouselProps = {
    data: {
        id: number;
        createdDate: Date;
        thumbnailUrl: string;
        title: string;
        summary: number;
        urlSuffix: string;
        url: string;
        techBlogCode: string;
        viewCount: number;
    }[];
};
