import { useEffect, useState, useCallback, useRef } from 'react';

export function usePageScroll(sectionCount: number) {
    const [activeSection, setActiveSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollDirection, setScrollDirection] = useState<-1 | 0 | 1>(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // Sensitivity controls
    const scrollAccumulator = useRef(0);
    const SCROLL_THRESHOLD = 275; // Points of deltaY to accumulate before trigger
    const touchStartY = useRef<number | null>(null);

    // Helper to get current section element
    const getCurrentSection = () => sectionRefs.current[activeSection];

    const isScrollingRef = useRef(false);

    // Helper to clamp values
    const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

    // Apply visual tilt based on accumulator
    const applyTilt = (val: number) => {
        const el = getCurrentSection();
        if (!el) return;

        // Boundary Guard: No tilt at very top of site or very bottom of site
        const { scrollTop, scrollHeight, clientHeight } = el;
        const isAtTop = scrollTop <= 0;
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;

        // Force stop tilt if we are at edge of world
        if ((activeSection === 0 && isAtTop && val < 0) ||
            (activeSection === sectionCount - 1 && isAtBottom && val > 0)) {
            el.style.transform = '';
            return;
        }

        const tilt = clamp(val / 5, -10, 10);
        el.style.transform = `translate3d(0, 0, 0) rotateX(${tilt * 3}deg)`;
    };

    const resetTilt = () => {
        const el = getCurrentSection();
        if (el) el.style.transform = '';
    }

    const processMovement = useCallback((delta: number): boolean => {
        // Instant check using REF to catch multiple events in same frame
        if (isScrollingRef.current) return true;

        const currentSection = getCurrentSection();
        if (!currentSection) return false;

        // Normalize delta to avoid "explosive" movements
        const normalizedDelta = clamp(delta, -100, 100);

        const { scrollTop, scrollHeight, clientHeight } = currentSection;
        const isScrollable = scrollHeight > clientHeight;
        const isAtTop = scrollTop <= 0;
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5;

        // Logic for DOWN scroll (or SWIPE UP)
        if (normalizedDelta > 0) {
            if (isScrollable && !isAtBottom) {
                scrollAccumulator.current = 0;
                applyTilt(0);
                return false;
            }

            // Hard Boundary: End of Site
            if (activeSection === sectionCount - 1 && isAtBottom) {
                scrollAccumulator.current = 0;
                applyTilt(0);
                return true;
            }
        }
        // Logic for UP scroll (or SWIPE DOWN)
        else if (normalizedDelta < 0) {
            if (isScrollable && !isAtTop) {
                scrollAccumulator.current = 0;
                applyTilt(0);
                return false;
            }

            // Hard Boundary: Start of Site
            if (activeSection === 0 && isAtTop) {
                scrollAccumulator.current = 0;
                applyTilt(0);
                return true;
            }
        }

        // Standard Transition Logic
        scrollAccumulator.current += normalizedDelta;

        // Direction change reset
        if (Math.sign(normalizedDelta) !== Math.sign(scrollAccumulator.current)) {
            scrollAccumulator.current = normalizedDelta;
        }

        // Update progress and direction immediately on every scroll event
        setScrollProgress(Math.min(Math.abs(scrollAccumulator.current) / SCROLL_THRESHOLD, 1));
        setScrollDirection(scrollAccumulator.current > 0 ? 1 : -1);

        applyTilt(scrollAccumulator.current);

        if (normalizedDelta > 0) {
            if (activeSection < sectionCount - 1) {
                if (scrollAccumulator.current > SCROLL_THRESHOLD) {
                    isScrollingRef.current = true;
                    setIsScrolling(true);
                    setScrollProgress(1);
                    setActiveSection(prev => prev + 1);
                    scrollAccumulator.current = 0;
                    resetTilt();
                    setTimeout(() => {
                        isScrollingRef.current = false;
                        setIsScrolling(false);
                    }, 1000);
                }
            }
        } else if (normalizedDelta < 0) {
            if (activeSection > 0) {
                if (scrollAccumulator.current < -SCROLL_THRESHOLD) {
                    isScrollingRef.current = true;
                    setIsScrolling(true);
                    setScrollProgress(1);
                    setActiveSection(prev => prev - 1);
                    scrollAccumulator.current = 0;
                    resetTilt();
                    setTimeout(() => {
                        isScrollingRef.current = false;
                        setIsScrolling(false);
                    }, 1000);
                }
            }
        }

        return true;
    }, [activeSection, sectionCount]);

    // Ref mantém sempre a versão mais atual de processMovement sem criar dependências
    const processMovementRef = useRef(processMovement);
    useEffect(() => { processMovementRef.current = processMovement }, [processMovement]);

    // Handlers estáveis — delegam para o ref, nunca causam re-registro de listeners
    const handleWheel = useCallback((event: WheelEvent) => {
        const shouldPrevent = processMovementRef.current(event.deltaY);
        if (shouldPrevent) event.preventDefault();
    }, []);

    const handleTouchStart = useCallback((event: TouchEvent) => {
        touchStartY.current = event.touches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((event: TouchEvent) => {
        if (touchStartY.current === null) return;

        const touchY = event.touches[0].clientY;
        const deltaY = touchStartY.current - touchY;

        const shouldPrevent = processMovementRef.current(deltaY * 2.5);
        if (shouldPrevent) event.preventDefault();

        touchStartY.current = touchY;
    }, []);

    const handleTouchEnd = useCallback(() => {
        touchStartY.current = null;
    }, []);

    useEffect(() => {
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);

        // Decay accumulator when user stops scrolling without switching section
        const interval = setInterval(() => {
            if (!isScrolling && Math.abs(scrollAccumulator.current) > 0) {
                scrollAccumulator.current *= 0.85;

                if (Math.abs(scrollAccumulator.current) < 0.5) {
                    scrollAccumulator.current = 0;
                    resetTilt();
                    setScrollProgress(0);
                    setScrollDirection(0);
                } else {
                    applyTilt(scrollAccumulator.current);
                    setScrollProgress(Math.abs(scrollAccumulator.current) / SCROLL_THRESHOLD);
                }
            }
        }, 30);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            clearInterval(interval);
        }
    }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, isScrolling]);

    // Safety: ensure tilt is reset if active section changes
    useEffect(() => {
        resetTilt();
        scrollAccumulator.current = 0;
        setScrollProgress(0);
        setScrollDirection(0);
    }, [activeSection]);

    return { activeSection, setActiveSection, scrollProgress, scrollDirection, containerRef, sectionRefs };
}
