'use client'

import { useEffect, RefObject } from 'react'

export function useSVGAnimate(ref: RefObject<SVGSVGElement | null>, isVisible: boolean) {
    useEffect(() => {
        if (!ref.current || !isVisible) return

        const svg = ref.current
        const elements = svg.querySelectorAll('line, path, circle, rect, polygon')

        elements.forEach((element, index) => {
            const el = element as HTMLElement & SVGGeometryElement

            if (el.tagName === 'line' || el.tagName === 'path') {
                try {
                    const length = el.getTotalLength?.() || 100
                    el.style.strokeDasharray = `${length}`
                    el.style.strokeDashoffset = `${length}`
                    el.style.opacity = '0'

                    setTimeout(() => {
                        el.style.transition = 'stroke-dashoffset 1500ms ease-out, opacity 500ms ease-out'
                        el.style.strokeDashoffset = '0'
                        el.style.opacity = '1'
                    }, index * 100)
                } catch (e) {
                    console.warn('SVGAnimate: Could not get length for element', el)
                }
            } else {
                el.style.opacity = '0'
                el.style.transform = 'scale(0)'
                el.style.transformOrigin = 'center'

                setTimeout(() => {
                    el.style.transition = 'opacity 600ms ease-out, transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)'
                    el.style.opacity = el.getAttribute('opacity') || '1'
                    el.style.transform = 'scale(1)'
                }, index * 100 + 200)
            }
        })
    }, [ref, isVisible])
}
