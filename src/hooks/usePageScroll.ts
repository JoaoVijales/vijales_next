import { useEffect, useState, useCallback, useRef } from 'react';

export function usePageScroll(sectionCount: number) {
    const [activeSection, setActiveSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // Sensitivity controls
    const scrollAccumulator = useRef(0);
    const SCROLL_THRESHOLD = 250; // Points of deltaY to accumulate before trigger
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
        // Note: page.tsx handles the main transform. We are adding a temporary style.
        // We must ensure we don't break the 'translate' logic.
        // Page.tsx uses: translate3d(0,0,0) rotateX(0deg) for offset 0.
        // So overwriting it here is safe IF offset is 0.
        el.style.transform = `translate3d(0, 0, 0) rotateX(${tilt}deg)`;
    };

    const resetTilt = () => {
        const el = getCurrentSection();
        // Restore default state for offset 0
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

        applyTilt(scrollAccumulator.current);

        if (normalizedDelta > 0) {
            if (activeSection < sectionCount - 1) {
                if (scrollAccumulator.current > SCROLL_THRESHOLD) {
                    isScrollingRef.current = true;
                    setIsScrolling(true);
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

    const handleWheel = useCallback((event: WheelEvent) => {
        const shouldPrevent = processMovement(event.deltaY);
        if (shouldPrevent) event.preventDefault();
    }, [processMovement]);

    const handleTouchStart = useCallback((event: TouchEvent) => {
        touchStartY.current = event.touches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((event: TouchEvent) => {
        if (touchStartY.current === null) return;

        const touchY = event.touches[0].clientY;
        const deltaY = touchStartY.current - touchY;

        const shouldPrevent = processMovement(deltaY * 1.5);
        if (shouldPrevent) event.preventDefault();

        touchStartY.current = touchY;
    }, [processMovement]);

    const handleTouchEnd = useCallback(() => {
        touchStartY.current = null;
        // Optional: auto-snap or decay on release could go here, 
        // but the interval in useEffect handles decay already.
    }, []);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => handleWheel(e);
        const onTouchStart = (e: TouchEvent) => handleTouchStart(e);
        const onTouchMove = (e: TouchEvent) => handleTouchMove(e);
        const onTouchEnd = (e: TouchEvent) => handleTouchEnd();

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('touchstart', onTouchStart, { passive: false });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);

        // Decay/Reset accumulator if user stops scrolling without switching
        const interval = setInterval(() => {
            if (!isScrolling && Math.abs(scrollAccumulator.current) > 0) {
                // Decay factor
                scrollAccumulator.current *= 0.85;

                // Snap to 0
                if (Math.abs(scrollAccumulator.current) < 0.5) {
                    scrollAccumulator.current = 0;
                    resetTilt();
                } else {
                    applyTilt(scrollAccumulator.current);
                }
            }
        }, 30); // 60fps tick roughly

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
            clearInterval(interval);
        }
    }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, isScrolling]);

    // Safety: ensure tile is reset if active section changes
    useEffect(() => {
        resetTilt();
        scrollAccumulator.current = 0;
    }, [activeSection]);

    return { activeSection, setActiveSection, containerRef, sectionRefs };
}
