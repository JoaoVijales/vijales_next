'use client'

import React, { createContext, useContext, useRef, useCallback } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TunnelState {
  active: boolean
  progress: number   // 0–1, animado via rAF
  direction: 1 | -1
}

interface TransitionContextValue {
  tunnelRef: React.MutableRefObject<TunnelState>
  startTunnel: (direction: 1 | -1, onSectionChange: () => void) => void
}

// ─── Context ──────────────────────────────────────────────────────────────────

const TransitionContext = createContext<TransitionContextValue | null>(null)

// ─── Provider ─────────────────────────────────────────────────────────────────

const TUNNEL_DURATION = 1200 // ms — total (dive + emerge)
const SECTION_CHANGE_AT = 600 // ms — DOM muda no pico do tunnel

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const tunnelRef = useRef<TunnelState>({
    active: false,
    progress: 0,
    direction: 1,
  })

  const rafRef = useRef<number>(0)

  const startTunnel = useCallback((direction: 1 | -1, onSectionChange: () => void) => {
    // Cancela animação anterior se houver
    if (rafRef.current) cancelAnimationFrame(rafRef.current)

    tunnelRef.current = { active: true, progress: 0, direction }

    // setTimeout controla o callback — compatível com fake timers em testes
    setTimeout(onSectionChange, SECTION_CHANGE_AT)

    // rAF controla apenas o progresso visual lido pelo ThreeBackground
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / TUNNEL_DURATION, 1)

      tunnelRef.current.progress = progress

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        tunnelRef.current = { active: false, progress: 0, direction }
      }
    }

    rafRef.current = requestAnimationFrame(animate)
  }, [])

  return (
    <TransitionContext.Provider value={{ tunnelRef, startTunnel }}>
      {children}
    </TransitionContext.Provider>
  )
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useTransition(): TransitionContextValue {
  const ctx = useContext(TransitionContext)
  if (!ctx) throw new Error('useTransition deve ser usado dentro de TransitionProvider')
  return ctx
}
