import { SetStateAction, Dispatch } from 'react';

export interface CategoryItemsProps {
    key: string;
    id: string;
    title: string;
    setActiveCategoriesData: Dispatch<SetStateAction<string[]>>;
    activeCategoriesData: string[];
}
