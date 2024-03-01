import { SetStateAction, useEffect, useState } from 'react';

interface IHandleProps {
    getSearchLocalResult: any[];
    setIsAutoSearch: React.Dispatch<SetStateAction<boolean>>;
}

export default function useHandleKeyPress({ getSearchLocalResult, setIsAutoSearch }: IHandleProps) {
    const [selectedOption, setSelectedOption] = useState<number>(-1);
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp') {
                setIsAutoSearch(true);
                setSelectedOption(prevSelectedOption => {
                    const newSelectedOption = prevSelectedOption - 1;
                    return newSelectedOption < -1
                        ? getSearchLocalResult.length - 1
                        : newSelectedOption;
                });
            } else if (event.key === 'ArrowDown') {
                setIsAutoSearch(true);

                setSelectedOption(prevSelectedOption => {
                    const newSelectedOption = prevSelectedOption + 1;
                    return newSelectedOption >= getSearchLocalResult.length ? 0 : newSelectedOption;
                });
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [getSearchLocalResult]);

    return selectedOption;
}
