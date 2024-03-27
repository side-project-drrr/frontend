import { Dispatch, SetStateAction } from 'react';

export interface CategoryItemsProps {
    categoryId: number;
    title: string;
    setActiveCategoriesData: Dispatch<SetStateAction<string[]>>;
    activeCategoriesData: string[];
    onSetObservationTarget: any;
}

export interface ICategoryProps {
    userCategoryData: {
        id: number;
        name: string;
    };
}
