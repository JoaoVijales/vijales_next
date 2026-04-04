/**
 * @jest-environment jsdom
 */
import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { TransitionProvider, useTransition } from '../TransitionContext'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <TransitionProvider>{children}</TransitionProvider>
)

describe('TransitionContext', () => {
  it('fornece tunnelRef com estado inicial idle', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    expect(result.current.tunnelRef.current.active).toBe(false)
    expect(result.current.tunnelRef.current.progress).toBe(0)
  })

  it('expõe startTunnel como função', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })
    expect(typeof result.current.startTunnel).toBe('function')
  })

  it('startTunnel chama o callback de section change após delay', () => {
    jest.useFakeTimers()
    const { result } = renderHook(() => useTransition(), { wrapper })
    const onSectionChange = jest.fn()

    act(() => {
      result.current.startTunnel(1, onSectionChange)
    })

    expect(onSectionChange).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(600)
    })

    expect(onSectionChange).toHaveBeenCalledTimes(1)
    jest.useRealTimers()
  })

  it('startTunnel ativa o tunnel imediatamente', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })

    act(() => {
      result.current.startTunnel(1, jest.fn())
    })

    expect(result.current.tunnelRef.current.active).toBe(true)
  })

  it('startTunnel registra a direção corretamente', () => {
    const { result } = renderHook(() => useTransition(), { wrapper })

    act(() => {
      result.current.startTunnel(-1, jest.fn())
    })

    expect(result.current.tunnelRef.current.direction).toBe(-1)
  })
})
