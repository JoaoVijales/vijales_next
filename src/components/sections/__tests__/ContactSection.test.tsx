/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import ContactSection from '../ContactSection'

const WHATSAPP_NUMBER = '5548988699159'
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`

describe('ContactSection – WhatsApp CTA', () => {
  it('renderiza a seção de contato', () => {
    render(<ContactSection />)
    expect(screen.getByRole('region', { name: /contato/i })).toBeInTheDocument()
  })

  it('exibe o título da seção', () => {
    render(<ContactSection />)
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('exibe o número de WhatsApp formatado', () => {
    render(<ContactSection />)
    expect(screen.getByText(/\+55\s?48\s?9\s?8869[-\s]?9159/i)).toBeInTheDocument()
  })

  it('renderiza o botão/link de CTA do WhatsApp', () => {
    render(<ContactSection />)
    const ctaLink = screen.getByRole('link', { name: /whatsapp/i })
    expect(ctaLink).toBeInTheDocument()
  })

  it('o link CTA aponta para o número correto no wa.me', () => {
    render(<ContactSection />)
    const ctaLink = screen.getByRole('link', { name: /whatsapp/i })
    expect(ctaLink).toHaveAttribute('href', expect.stringContaining(WHATSAPP_BASE_URL))
  })

  it('o link CTA abre em nova aba', () => {
    render(<ContactSection />)
    const ctaLink = screen.getByRole('link', { name: /whatsapp/i })
    expect(ctaLink).toHaveAttribute('target', '_blank')
    expect(ctaLink).toHaveAttribute('rel', expect.stringContaining('noopener'))
  })

  it('inclui mensagem pré-preenchida no link do WhatsApp', () => {
    render(<ContactSection />)
    const ctaLink = screen.getByRole('link', { name: /whatsapp/i })
    const href = ctaLink.getAttribute('href') ?? ''
    expect(href).toContain('text=')
  })

  it('não renderiza nenhum campo de formulário', () => {
    render(<ContactSection />)
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /enviar/i })).not.toBeInTheDocument()
  })

  it('aplica isActive sem erros', () => {
    const { rerender } = render(<ContactSection isActive={false} />)
    rerender(<ContactSection isActive={true} />)
    expect(screen.getByRole('region', { name: /contato/i })).toBeInTheDocument()
  })
})
