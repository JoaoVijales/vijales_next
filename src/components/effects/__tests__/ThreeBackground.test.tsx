/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'

// ─── Three.js Mock ────────────────────────────────────────────────────────────

const mockGeometryDispose = jest.fn()
const mockMaterialDispose = jest.fn()
const mockRendererDispose = jest.fn()
const mockGridHelperGeometryDispose = jest.fn()
const mockGridHelperMaterialDispose = jest.fn()
const mockSceneRemove = jest.fn()
const mockSceneClear = jest.fn()

jest.mock('three', () => {
  const actual = jest.requireActual('three')

  class MockBufferAttribute {
    array: Float32Array
    needsUpdate = false
    constructor(array: Float32Array, _itemSize: number) {
      this.array = array
    }
  }

  class MockBufferGeometry {
    attributes: Record<string, MockBufferAttribute> = {}
    dispose = mockGeometryDispose
    setAttribute(name: string, attr: MockBufferAttribute) {
      this.attributes[name] = attr
    }
  }

  class MockLineBasicMaterial {
    dispose = mockMaterialDispose
  }

  class MockPointsMaterial {
    dispose = mockMaterialDispose
  }

  class MockLine {
    geometry: MockBufferGeometry
    material: MockLineBasicMaterial
    frustumCulled = false
    constructor(geometry?: MockBufferGeometry, material?: MockLineBasicMaterial) {
      this.geometry = geometry ?? new MockBufferGeometry()
      this.material = material ?? new MockLineBasicMaterial()
    }
  }

  class MockPoints {
    geometry = new MockBufferGeometry()
    material = new MockPointsMaterial()
    rotation = { y: 0 }
  }

  class MockScene {
    fog: unknown = null
    add = jest.fn()
    remove = mockSceneRemove
    clear = mockSceneClear
  }

  class MockPerspectiveCamera {
    aspect = 1
    position = { x: 0, y: 0, z: 50 }
    updateProjectionMatrix = jest.fn()
    lookAt = jest.fn()
  }

  class MockWebGLRenderer {
    domElement = document.createElement('canvas')
    setSize = jest.fn()
    setPixelRatio = jest.fn()
    render = jest.fn()
    dispose = mockRendererDispose
  }

  class MockFogExp2 {}

  class MockGridHelper {
    geometry = { dispose: mockGridHelperGeometryDispose }
    material = { transparent: false, opacity: 1, dispose: mockGridHelperMaterialDispose }
    position = { y: 0 }
  }

  class MockFloat32BufferAttribute extends MockBufferAttribute {
    constructor(arr: number[], itemSize: number) {
      super(new Float32Array(arr), itemSize)
    }
  }

  class MockVector3 {
    x = 0; y = 0; z = 0
    constructor(x = 0, y = 0, z = 0) { this.x = x; this.y = y; this.z = z }
    set(x: number, y: number, z: number) { this.x = x; this.y = y; this.z = z; return this }
    copy(v: MockVector3) { this.x = v.x; this.y = v.y; this.z = v.z; return this }
    clone() { return new MockVector3(this.x, this.y, this.z) }
    add(v: MockVector3) { this.x += v.x; this.y += v.y; this.z += v.z; return this }
    subVectors(a: MockVector3, b: MockVector3) {
      this.x = a.x - b.x; this.y = a.y - b.y; this.z = a.z - b.z; return this
    }
    normalize() {
      const len = this.length()
      if (len > 0) { this.x /= len; this.y /= len; this.z /= len }
      return this
    }
    multiplyScalar(s: number) { this.x *= s; this.y *= s; this.z *= s; return this }
    length() { return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2) }
  }

  class MockColor {
    r = 0; g = 0; b = 0
    setHSL = jest.fn().mockReturnThis()
  }

  return {
    ...actual,
    Scene: MockScene,
    PerspectiveCamera: MockPerspectiveCamera,
    WebGLRenderer: MockWebGLRenderer,
    BufferGeometry: MockBufferGeometry,
    LineBasicMaterial: MockLineBasicMaterial,
    PointsMaterial: MockPointsMaterial,
    Line: MockLine,
    Points: MockPoints,
    FogExp2: MockFogExp2,
    GridHelper: MockGridHelper,
    BufferAttribute: MockBufferAttribute,
    Float32BufferAttribute: MockFloat32BufferAttribute,
    Vector3: MockVector3,
    Color: MockColor,
    AdditiveBlending: actual.AdditiveBlending,
    Material: class MockMaterial { dispose = mockMaterialDispose },
  }
})

// ─── Tests ────────────────────────────────────────────────────────────────────

import ThreeBackground from '../ThreeBackground'

describe('ThreeBackground', () => {
  beforeEach(() => {
    mockGeometryDispose.mockClear()
    mockMaterialDispose.mockClear()
    mockRendererDispose.mockClear()
    mockGridHelperGeometryDispose.mockClear()
    mockGridHelperMaterialDispose.mockClear()
    mockSceneRemove.mockClear()
    mockSceneClear.mockClear()
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 0)
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('renderiza o container do canvas', () => {
    const { container } = render(<ThreeBackground />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('o container é aria-hidden para não poluir a árvore de acessibilidade', () => {
    const { container } = render(<ThreeBackground />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('chama dispose em geometrias e materiais ao desmontar', () => {
    const { unmount } = render(<ThreeBackground />)
    unmount()
    expect(mockGeometryDispose).toHaveBeenCalled()
    expect(mockMaterialDispose).toHaveBeenCalled()
  })

  it('chama dispose no renderer ao desmontar', () => {
    const { unmount } = render(<ThreeBackground />)
    unmount()
    expect(mockRendererDispose).toHaveBeenCalled()
  })

  it('descarta geometria e material do GridHelper ao desmontar', () => {
    const { unmount } = render(<ThreeBackground />)
    unmount()
    expect(mockGridHelperGeometryDispose).toHaveBeenCalledTimes(1)
    expect(mockGridHelperMaterialDispose).toHaveBeenCalledTimes(1)
  })

  it('remove objetos da cena antes de descartar', () => {
    const { unmount } = render(<ThreeBackground />)
    unmount()
    expect(mockSceneRemove).toHaveBeenCalled()
  })

  it('limpa a cena ao desmontar', () => {
    const { unmount } = render(<ThreeBackground />)
    unmount()
    expect(mockSceneClear).toHaveBeenCalled()
  })
})
