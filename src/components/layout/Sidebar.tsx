'use client'

import React from 'react'
import styled, { css } from 'styled-components'
import { Github, Linkedin } from 'lucide-react'

const SidebarWrapper = styled.aside`
  position: fixed;
  right: 1.75rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  z-index: 100;
  padding: 2rem 0.75rem;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 40px;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: color 0.25s ease, transform 0.25s ease;

  &:hover {
    color: rgba(255, 69, 0, 0.8);
    transform: scale(1.15);
  }
`

const Divider = styled.div`
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.07), transparent);
`

const NavIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
  position: relative;
`

const NavDot = styled.button<{ $active: boolean }>`
  width: 2px;
  border-radius: 2px;
  background: ${p => p.$active ? '#ff4500' : 'rgba(255, 255, 255, 0.15)'};
  box-shadow: ${p => p.$active ? '0 0 8px #ff4500, 0 0 16px rgba(255,69,0,0.4)' : 'none'};
  transition: height 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: none;
  padding: 0;
  position: relative;

  ${p => p.$active ? css`
    height: 28px;
  ` : css`
    height: 8px;
    &:hover {
      height: 14px;
      background: rgba(255, 255, 255, 0.35);
    }
  `}

  &::after {
    content: attr(data-label);
    position: absolute;
    right: calc(100% + 1rem);
    top: 50%;
    transform: translateY(-50%);
    color: ${p => p.$active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.35)'};
    font-size: 0.52rem;
    font-family: var(--font-orbitron), sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, right 0.2s ease;
    white-space: nowrap;
  }

  &:hover::after {
    opacity: 1;
    right: calc(100% + 0.75rem);
  }
`

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Serviços' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contato' }
]

interface SidebarProps {
  activeIndex: number
  onNavigate: (index: number) => void
}

export default function Sidebar({ activeIndex, onNavigate }: SidebarProps) {
  return (
    <SidebarWrapper>
      <SocialLinks>
        <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <Github size={16} />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <Linkedin size={16} />
        </SocialIcon>
      </SocialLinks>

      <Divider />

      <NavIndicator>
        {sections.map((section, index) => (
          <NavDot
            key={section.id}
            type="button"
            $active={activeIndex === index}
            data-label={section.label}
            aria-label={`Ir para ${section.label}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => onNavigate(index)}
          />
        ))}
      </NavIndicator>
    </SidebarWrapper>
  )
}
