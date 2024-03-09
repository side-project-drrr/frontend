import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (callback: () => void) => {
    const [observationTarget, setObservationTarget] = useState<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        if (!observationTarget) return;

        observer.current = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                callback();
            },
            { threshold: 1 },
        );
        observer.current.observe(observationTarget);
        return () => {
            if (observer.current && observationTarget) {
                observer.current.unobserve(observationTarget);
            }
        };
    }, [observationTarget]);

    return setObservationTarget;
};
