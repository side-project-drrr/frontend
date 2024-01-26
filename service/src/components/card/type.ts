export interface ICardItemsProps {
    items: {
        id: number;
        title: string;
        content: string;
        bookmark: number;
        views: number;
        thumbnailUrl: string;
    }[];
}
