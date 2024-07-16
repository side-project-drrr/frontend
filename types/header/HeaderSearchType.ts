import React from 'react';

export interface IHeaderSearchSearchProps {
    onSetSearchValue: React.Dispatch<React.SetStateAction<string>>;
    onSelectedSearchIndex: number;
}
