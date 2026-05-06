import { useEffect, useState, useRef, useCallback } from 'react';

export function useSectionObserver() {
    const [activeSection, setActiveSectionState] = useState(0);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToSection = useCallback((index: number) => {
        const container = containerRef.current;
        const el = sectionRefs.current[index];
        if (!container || !el) return;
        container.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const midpoint = container.scrollTop + container.clientHeight / 2;
            let activeIndex = 0;

            for (let i = 0; i < sectionRefs.current.length; i++) {
                const el = sectionRefs.current[i];
                if (!el) continue;
                if (el.offsetTop <= midpoint) {
                    activeIndex = i;
                } else {
                    break;
                }
            }

            setActiveSectionState(activeIndex);
        };

        container.addEventListener('scroll', handleScroll, { passive: true });
        return () => container.removeEventListener('scroll', handleScroll);
    }, []);

    return {
        activeSection,
        setActiveSection: scrollToSection,
        sectionRefs,
        containerRef,
    };
}
