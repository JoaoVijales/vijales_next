'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Github, Linkedin } from 'lucide-react'

const SidebarWrapper = styled.aside`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  z-index: 100;
  padding: 2rem 0.5rem;
  background: rgba(10, 10, 10, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 69, 0, 0.2);
  border-radius: 50px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease;

  @media (max-width: 1024px) {
    display: none;
  }
`

const NavIndicator = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const NavDot = styled.a<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$active ? '#ff4500' : 'rgba(255, 255, 255, 0.2)'};
  box-shadow: ${props => props.$active ? '0 0 10px #ff4500, 0 0 20px #ff4500' : 'none'};
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &::after {
    content: attr(data-label);
    position: absolute;
    right: 2.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 0.7rem;
    font-family: var(--font-orbitron), sans-serif;
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    white-space: nowrap;
    text-align: right;
  }

  &:hover::after {
    opacity: 1;
    right: 2rem;
  }
`

const SocialLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const SocialIcon = styled.a`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: bold;
  font-family: var(--font-orbitron), sans-serif;

  &:hover {
    color: #ff4500;
    text-shadow: 0 0 10px #ff4500;
    transform: scale(1.2);
  }
`

const Line = styled.div`
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, rgba(255, 69, 0, 0.5), transparent);
`


const sections = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Serviços' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'contact', label: 'Contato' }
]

interface SidebarProps {
  activeIndex: number;
  onNavigate: (index: number) => void;
}

export default function Sidebar({ activeIndex, onNavigate }: SidebarProps) {
  // Internal state/observer removed in favor of props control

  return (
    <SidebarWrapper>
      <SocialLinks>
        <SocialIcon href="https://github.com" target="_blank" aria-label="GitHub">
          <Github size={20} />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
          <Linkedin size={20} />
        </SocialIcon>
      </SocialLinks>

      <Line />

      <NavIndicator>
        {sections.map((section, index) => (
          <NavDot
            key={section.id}
            href={`#${section.id}`}
            $active={activeIndex === index}
            data-label={section.label}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(index);
            }}
          />
        ))}
      </NavIndicator>
    </SidebarWrapper>
  )
}
