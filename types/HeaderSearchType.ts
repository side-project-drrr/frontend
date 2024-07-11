import React from 'react';

export interface ISearchProps {
    onSetSearchValue: React.Dispatch<React.SetStateAction<string>>;
    onSelectedSearchIndex: number;
}
