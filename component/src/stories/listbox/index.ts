export interface Props {
    items: {
        id: number;
        title: string;
        content: string;
        bookmark: number;
        views: number;
    }[];
}
