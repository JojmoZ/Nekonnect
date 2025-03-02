import { useEffect, useRef } from "react";

interface IProps {
    callback : () => void,
}

export const useInfiniteScroll = ({callback} : IProps) => {
    const observerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
            callback(); // Trigger data fetch
            }
        },
        { threshold: 1.0 }
        );

        if (observerRef.current) observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [callback]);

    return observerRef;
};