/**
 * @jest-environment jsdom
 */
import { renderHook, act } from '@testing-library/react'
import { usePageScroll } from '../usePageScroll'

describe('usePageScroll', () => {
  let addEventListenerSpy: jest.SpyInstance
  let removeEventListenerSpy: jest.SpyInstance

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener')
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('registra os event listeners uma única vez na montagem', () => {
    const { unmount } = renderHook(() => usePageScroll(4))

    const wheelCalls = addEventListenerSpy.mock.calls.filter(([event]) => event === 'wheel')
    expect(wheelCalls).toHaveLength(1)

    const touchMoveCalls = addEventListenerSpy.mock.calls.filter(([event]) => event === 'touchmove')
    expect(touchMoveCalls).toHaveLength(1)

    unmount()
  })

  it('não acumula listeners após mudança de seção ativa', () => {
    const { result, unmount } = renderHook(() => usePageScroll(4))

    // Limpar contagem inicial
    addEventListenerSpy.mockClear()

    // Simular mudança de seção
    act(() => {
      result.current.setActiveSection(1)
    })
    act(() => {
      result.current.setActiveSection(2)
    })

    // Após mudanças de seção, não deve ter adicionado novos listeners para wheel
    const wheelCallsAfter = addEventListenerSpy.mock.calls.filter(([event]) => event === 'wheel')
    expect(wheelCallsAfter).toHaveLength(0)

    unmount()
  })

  it('remove os event listeners ao desmontar', () => {
    const { unmount } = renderHook(() => usePageScroll(4))

    removeEventListenerSpy.mockClear()
    unmount()

    const wheelRemoved = removeEventListenerSpy.mock.calls.filter(([event]) => event === 'wheel')
    expect(wheelRemoved).toHaveLength(1)

    const touchMoveRemoved = removeEventListenerSpy.mock.calls.filter(([event]) => event === 'touchmove')
    expect(touchMoveRemoved).toHaveLength(1)
  })

  it('retorna activeSection inicial como 0', () => {
    const { result } = renderHook(() => usePageScroll(4))
    expect(result.current.activeSection).toBe(0)
  })

  it('setActiveSection atualiza a seção ativa', () => {
    const { result } = renderHook(() => usePageScroll(4))
    act(() => {
      result.current.setActiveSection(2)
    })
    expect(result.current.activeSection).toBe(2)
  })

  it('retorna scrollProgress inicial como 0', () => {
    const { result } = renderHook(() => usePageScroll(4))
    expect(result.current.scrollProgress).toBe(0)
  })

  it('scrollProgress é um número entre 0 e 1', () => {
    const { result } = renderHook(() => usePageScroll(4))
    expect(result.current.scrollProgress).toBeGreaterThanOrEqual(0)
    expect(result.current.scrollProgress).toBeLessThanOrEqual(1)
  })

  it('retorna scrollDirection inicial como 0', () => {
    const { result } = renderHook(() => usePageScroll(4))
    expect(result.current.scrollDirection).toBe(0)
  })

  it('scrollDirection é -1, 0 ou 1', () => {
    const { result } = renderHook(() => usePageScroll(4))
    expect([-1, 0, 1]).toContain(result.current.scrollDirection)
  })
})
