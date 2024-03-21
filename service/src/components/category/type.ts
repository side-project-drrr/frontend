import { SetStateAction, Dispatch } from 'react';

export interface CategoryItemsProps {
    id: number;
    title: string;
    setActiveCategoriesData: Dispatch<SetStateAction<any[]>>;
    activeCategoriesData: string[];
    onUserCategoryItems?:
        | {
              id: string;
              name: string;
          }[]
        | undefined;
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
