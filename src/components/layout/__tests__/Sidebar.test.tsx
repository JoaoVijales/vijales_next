/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('lucide-react', () => ({
  Github: () => <svg data-testid="icon-github" />,
  Linkedin: () => <svg data-testid="icon-linkedin" />,
}))

import Sidebar from '../Sidebar'

const defaultProps = {
  activeIndex: 0,
  onNavigate: jest.fn(),
}

describe('Sidebar', () => {
  beforeEach(() => {
    defaultProps.onNavigate.mockClear()
  })

  // ─── Task #7 — links externos ────────────────────────────────────────────────

  it('links sociais têm rel="noopener noreferrer"', () => {
    render(<Sidebar {...defaultProps} />)
    const links = screen.getAllByRole('link')
    links.forEach(link => {
      if (link.getAttribute('target') === '_blank') {
        expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
        expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
      }
    })
  })

  // ─── Task #8 — NavDots como buttons ─────────────────────────────────────────

  it('os dots de navegação são elementos button', () => {
    render(<Sidebar {...defaultProps} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  it('cada dot tem aria-label descritivo', () => {
    render(<Sidebar {...defaultProps} />)
    expect(screen.getByRole('button', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /servi/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /portfolio/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /contato/i })).toBeInTheDocument()
  })

  it('dot ativo tem aria-current="true"', () => {
    render(<Sidebar {...defaultProps} activeIndex={2} />)
    const portfolioBtn = screen.getByRole('button', { name: /portfolio/i })
    expect(portfolioBtn).toHaveAttribute('aria-current', 'true')
  })

  it('dot inativo não tem aria-current', () => {
    render(<Sidebar {...defaultProps} activeIndex={0} />)
    const portfolioBtn = screen.getByRole('button', { name: /portfolio/i })
    expect(portfolioBtn).not.toHaveAttribute('aria-current')
  })

  it('clicar num dot chama onNavigate com o índice correto', async () => {
    const user = userEvent.setup()
    render(<Sidebar {...defaultProps} />)
    const portfolioBtn = screen.getByRole('button', { name: /portfolio/i })
    await user.click(portfolioBtn)
    expect(defaultProps.onNavigate).toHaveBeenCalledWith(2)
  })
})
