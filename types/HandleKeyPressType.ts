import React, { SetStateAction } from 'react';

export interface IHandleProps {
    key: string;
    e: React.KeyboardEvent<HTMLDivElement>;
    getSearchLocalResult: any[];
    setSearchValue: React.Dispatch<SetStateAction<string>>;
    selectedSearchIndex: number;
    setSelectedSearchIndex: React.Dispatch<SetStateAction<number>>;
}
