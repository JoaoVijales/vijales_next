'use client'

import { useEffect, useRef, useState } from 'react'

export function useIntersectionObserver(options = {}) {
    const [isVisible, setIsVisible] = useState(false)
    const elementRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // We set visible but we don't unset it (unless we want it to hide again)
            // Legacy code adds/removes .active based on focus zone.
            setIsVisible(entry.isIntersecting)
        }, {
            threshold: 0.2, // Trigger when 20% visible
            ...options
        })

        const currentElement = elementRef.current
        if (currentElement) {
            observer.observe(currentElement)
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement)
            }
        }
    }, [options])

    return [elementRef, isVisible] as const
}
