import { useEffect, useRef } from 'react';

const useIntersectionObserver = (
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = { root: null, rootMargin: '10px', threshold: 0 },
) => {
    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [callback, options]);

    return loaderRef;
};

export default useIntersectionObserver;
