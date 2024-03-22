import { SetStateAction, Dispatch } from 'react';

export interface CategoryItemsProps {
    categoryId: number;
    title: string;
    setActiveCategoriesData: Dispatch<SetStateAction<any[]>>;
    activeCategoriesData: { id: number; name: string }[];
    onSetObservationTarget: any;
    onSetCategoriesItemClicked: Dispatch<SetStateAction<boolean>>;
    onCategoriesItemClicked: boolean;
}

export interface ICategoryProps {
    userCategoryData: {
        id: number;
        name: string;
    };
}
