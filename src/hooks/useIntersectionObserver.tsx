import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (callback: () => void) => {
    const [observationTarget, setObservationTarget] = useState<HTMLDivElement | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    useEffect(() => {
        if (observationTarget) {
            observer.current = new IntersectionObserver(
                entry => {
                    if (!entry[0].isIntersecting) return;
                    callback();
                },
                { threshold: 1 },
            );
            observer.current.observe(observationTarget);
        }
        return () => {
            observer.current?.disconnect();
        };
    }, [observationTarget]);

    return setObservationTarget;
};
