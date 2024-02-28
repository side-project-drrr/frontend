import { useEffect, useState } from 'react';

export default function useHandleKeyPress(searchData: any) {
    const [selectedOption, setSelectedOption] = useState<number>(0);
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'ArrowUp') {
                setSelectedOption(prevSelectedOption => {
                    const newSelectedOption = prevSelectedOption - 1;
                    return newSelectedOption < 0 ? searchData.length - 1 : newSelectedOption;
                });
            } else if (event.key === 'ArrowDown') {
                setSelectedOption(prevSelectedOption => {
                    const newSelectedOption = prevSelectedOption + 1;
                    return newSelectedOption >= searchData.length ? 0 : newSelectedOption;
                });
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [searchData]);

    return selectedOption;
}
