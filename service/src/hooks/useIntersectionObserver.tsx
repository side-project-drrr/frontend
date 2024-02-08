import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (callback: () => void) => {
    const [observationTarget, setObservationTarget] = useState<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        if (observationTarget) {
            observer.current = new IntersectionObserver(
                ([entry]) => {
                    if (!entry.isIntersecting) return;
                    console.log(callback);
                    callback();
                },
                { threshold: 1 },
            );
            observer.current.observe(observationTarget);
        }
        return () => {
            if (observer.current && observationTarget) {
                observer.current.unobserve(observationTarget);
            }
        };
    }, [observationTarget]);

    return setObservationTarget;
};
