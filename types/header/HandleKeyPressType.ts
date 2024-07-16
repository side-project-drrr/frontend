import React, { SetStateAction } from 'react';

export interface IHandleKeyPressProps {
    key: string;
    e: React.KeyboardEvent<HTMLDivElement>;
    getSearchLocalResult: string[];
    setSearchValue: React.Dispatch<SetStateAction<string>>;
    selectedSearchIndex: number;
    setSelectedSearchIndex: React.Dispatch<SetStateAction<number>>;
}
