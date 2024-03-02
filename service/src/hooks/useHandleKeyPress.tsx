import React, { SetStateAction } from 'react';

interface IHandleProps {
    key: string;
    e: React.KeyboardEvent<HTMLDivElement>;
    getSearchLocalResult: any[];
    setSearchValue: React.Dispatch<SetStateAction<string>>;
    selectedSearchIndex: number;
    setSelectedSearchIndex: React.Dispatch<SetStateAction<number>>;
}

export default function useHandleKeyPress({
    key,
    e,
    getSearchLocalResult,
    setSearchValue,
    selectedSearchIndex,
    setSelectedSearchIndex,
}: IHandleProps) {
    switch (key) {
        case 'ArrowDown':
            e.preventDefault();
            setSearchValue(getSearchLocalResult[selectedSearchIndex + 1]);
            setSelectedSearchIndex(prevSelectedOption => {
                const newSelectedOption = prevSelectedOption + 1; // 1
                return newSelectedOption >= getSearchLocalResult.length + 1 ? 0 : newSelectedOption;
            });
            break;
        case 'ArrowUp':
            e.preventDefault();
            setSearchValue(getSearchLocalResult[selectedSearchIndex - 1]);
            setSelectedSearchIndex(prevSelectedOption => {
                const newSelectedOption = prevSelectedOption - 1;
                return newSelectedOption < -1 ? getSearchLocalResult.length - 1 : newSelectedOption;
            });
            break;
        case 'Escape':
            setSelectedSearchIndex(-1);
            break;
        default:
            break;
    }
}
