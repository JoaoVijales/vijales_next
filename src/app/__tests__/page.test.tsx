/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render } from '@testing-library/react'

jest.mock('@/hooks/usePageScroll', () => ({
  usePageScroll: () => ({
    activeSection: 0,
    setActiveSection: jest.fn(),
    containerRef: { current: null },
    sectionRefs: { current: [] },
  }),
}))

jest.mock('@/components/layout/Sidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="sidebar" />,
}))

jest.mock('@/components/sections/HeroSection', () => ({
  __esModule: true,
  default: () => <div data-testid="hero" />,
}))

jest.mock('@/components/sections/ServicesSection', () => ({
  __esModule: true,
  default: () => <div data-testid="services" />,
}))

jest.mock('@/components/sections/PortfolioSection', () => ({
  __esModule: true,
  default: () => <div data-testid="portfolio" />,
}))

jest.mock('@/components/sections/ContactSection', () => ({
  __esModule: true,
  default: () => <div data-testid="contact" />,
}))

import Home from '../page'

describe('Home page', () => {
  it('renderiza sem erros', () => {
    const { container } = render(<Home />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('as 4 seções são montadas', () => {
    const { getByTestId } = render(<Home />)
    expect(getByTestId('hero')).toBeInTheDocument()
    expect(getByTestId('services')).toBeInTheDocument()
    expect(getByTestId('portfolio')).toBeInTheDocument()
    expect(getByTestId('contact')).toBeInTheDocument()
  })
})
