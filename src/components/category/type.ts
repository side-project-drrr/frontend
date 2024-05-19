export interface CategoryItemsProps {
    categoryId: number;
    title: string;
    onIndex: number;
}

export interface ICategoryProps {
    userCategoryData: {
        id: number;
        name: string;
    };
}
