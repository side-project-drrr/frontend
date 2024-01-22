import { SetStateAction, Dispatch } from 'react';

export interface CategoryItemsProps {
    id: string;
    title: string;
    setActiveCategoriesData: Dispatch<SetStateAction<any[]>>;
    activeCategoriesData: string[];
}
