import { SetStateAction, Dispatch } from 'react';

export interface CategoryItemsProps {
    categoryId: number;
    title: string;
    setActiveCategoriesData: Dispatch<SetStateAction<any[]>>;
    activeCategoriesData: string[];

    onSetObservationTarget: any;
}
export interface IUserCategoryProps {
    token: string | null;
}

export interface ICategoryProps {
    userCategoryData: {
        id: string;
        name: string;
    };
}
