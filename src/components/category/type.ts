export interface CategoryItemsProps {
    categoryId: number;
    title: string;

    onSetObservationTarget: any;
}

export interface ICategoryProps {
    userCategoryData: {
        id: number;
        name: string;
    };
}
