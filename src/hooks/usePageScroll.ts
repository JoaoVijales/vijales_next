import { useEffect, useState, useCallback, useRef } from 'react';

export function usePageScroll(sectionCount: number) {
    const [activeSection, setActiveSection] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    // Sensitivity controls
    const scrollAccumulator = useRef(0);
    const SCROLL_THRESHOLD = 250; // Points of deltaY to accumulate before trigger

    // Helper to get current section element
    const getCurrentSection = () => sectionRefs.current[activeSection];

    // Apply visual tilt based on accumulator
    const applyTilt = (val: number) => {
        const el = getCurrentSection();
        if (el) {
            // Max tilt 5 degrees, inverted for natural feel (pull up = tilt up)
            // delta > 0 (scroll down) -> tilt positive (top goes back/down)
            const tilt = Math.max(-10, Math.min(10, val / 5));
            // Note: page.tsx handles the main transform. We are adding a temporary style.
            // We must ensure we don't break the 'translate' logic.
            // Page.tsx uses: translate3d(0,0,0) rotateX(0deg) for offset 0.
            // So overwriting it here is safe IF offset is 0.
            el.style.transform = `translate3d(0, 0, 0) rotateX(${tilt}deg)`;
        }
    };

    const resetTilt = () => {
        const el = getCurrentSection();
        // Restore default state for offset 0
        if (el) el.style.transform = '';
    }

    const handleScroll = useCallback((event: WheelEvent) => {
        if (isScrolling) return;

        const delta = event.deltaY;
        const currentSection = getCurrentSection();

        // Safety check
        if (!currentSection) return;

        // Check internal scroll possibility
        const { scrollTop, scrollHeight, clientHeight } = currentSection;
        const isScrollable = scrollHeight > clientHeight;
        const isAtTop = scrollTop <= 0;
        const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 5; // Increased tolerance

        // Accumulate scroll
        scrollAccumulator.current += delta;

        // Anti-glitch: Reset if direction flips
        if (Math.sign(delta) !== Math.sign(scrollAccumulator.current)) {
            scrollAccumulator.current = delta;
        }

        // Apply Tilt Effect
        applyTilt(scrollAccumulator.current);

        // Logic for DOWN scroll
        if (delta > 0) {
            if (isScrollable && !isAtBottom) {
                // Allow bubble event => internal scroll
                scrollAccumulator.current = 0;
                applyTilt(0);
                return;
            }

            // Switch Section (Down)
            if (activeSection < sectionCount - 1) {
                if (scrollAccumulator.current > SCROLL_THRESHOLD) {
                    setIsScrolling(true);
                    setActiveSection(prev => prev + 1);
                    scrollAccumulator.current = 0;
                    resetTilt();
                    setTimeout(() => setIsScrolling(false), 1000); // 1s cooldown
                }
            } else {
                // End of page, reset tilt
                if (scrollAccumulator.current > SCROLL_THRESHOLD) {
                    scrollAccumulator.current = SCROLL_THRESHOLD; // Cap it
                }
            }
        }
        // Logic for UP scroll
        else if (delta < 0) {
            if (isScrollable && !isAtTop) {
                // Allow bubble event => internal scroll
                scrollAccumulator.current = 0;
                applyTilt(0);
                return;
            }

            // Switch Section (Up)
            if (activeSection > 0) {
                if (scrollAccumulator.current < -SCROLL_THRESHOLD) {
                    setIsScrolling(true);
                    setActiveSection(prev => prev - 1);
                    scrollAccumulator.current = 0;
                    resetTilt();
                    setTimeout(() => setIsScrolling(false), 1000); // 1s cooldown
                }
            } else {
                // Start of page (Hero)
                // Prevent getting stuck or weird visual glitches
                // If dragging up at top, maybe dampen the accumulator or just cap it
                if (scrollAccumulator.current < -SCROLL_THRESHOLD) {
                    scrollAccumulator.current = -SCROLL_THRESHOLD; // Cap it so it decays fast
                }
            }
        }
    }, [activeSection, isScrolling, sectionCount]);

    useEffect(() => {
        const onWheel = (e: WheelEvent) => handleScroll(e);
        window.addEventListener('wheel', onWheel);

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
            clearInterval(interval);
        }
    }, [handleScroll, isScrolling]);

    // Safety: ensure tile is reset if active section changes
    useEffect(() => {
        resetTilt();
        scrollAccumulator.current = 0;
    }, [activeSection]);

    return { activeSection, setActiveSection, containerRef, sectionRefs };
}
