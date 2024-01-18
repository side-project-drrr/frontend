import { useEffect, useState } from 'react';

interface DebounceOptions {
    delay: number;
}
function useDebounce(value: string, options: DebounceOptions) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, options.delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [value, options.delay]);

    return debouncedValue;
}
export default useDebounce;
