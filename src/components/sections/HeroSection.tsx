'use client'

import React, { useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { useSVGAnimate } from '@/hooks/useSVGAnimate'

const glitchText = keyframes`
  0%, 94%, 100% {
    transform: translate(0);
    opacity: 0;
  }
  95% {
    transform: translate(4px, -4px);
    opacity: 0.5;
  }
  96% {
    transform: translate(-4px, 4px);
    opacity: 0.5;
  }
  97% {
    transform: translate(2px, -2px);
    opacity: 0.5;
  }
`

const HeroWrapper = styled.section`
  text-align: center;
  align-items: center;
`

const TronLogo = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
  position: relative;
  animation: float 8s ease-in-out infinite;
  filter: drop-shadow(0 0 40px rgba(255, 69, 0, 0.9));

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }

  @media (max-height: 700px) {
    width: 120px;
    height: 120px;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`

const Tagline = styled.div`
  font-size: 0.7rem;
  color: #00C8FF;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 8px;
  font-weight: 400;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.5s forwards;
  display: block;
  font-family: var(--font-orbitron), sans-serif;
`

const Title = styled.h1`
  font-size: clamp(2.5rem, 8vw, 4rem);
  margin-bottom: 1.5rem;
  font-weight: 900;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: clamp(10px, 2vw, 30px);
  position: relative;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.8s forwards;
  text-shadow: 0 0 30px rgba(255, 69, 0, 0.5), 0 0 60px rgba(255, 69, 0, 0.3);

  &::before {
    content: 'VIJALES';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    color: #ff4500;
    z-index: -1;
    animation: ${glitchText} 5s infinite;
  }
`

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.72);
  margin-bottom: 3rem;
  max-width: 580px;
  line-height: 1.9;
  font-weight: 300;
  letter-spacing: 0.5px;
  opacity: 0;
  animation: fadeInUp 1s ease-out 1.1s forwards;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding-inline: 1.5rem;
  }

  @media (max-height: 700px) {
    margin-bottom: 1.5rem;
  }
`

const CtaButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 2rem;
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 700;
  font-family: var(--font-orbitron), sans-serif;
  background: transparent;
  text-decoration: none;
  border: 1px solid rgba(0, 200, 255, 0.35);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.9s forwards;
  color: #00C8FF;

  span {
    position: relative;
    z-index: 2;
    transition: color 0.3s;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #00C8FF;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    color: #000;
    border-color: #00C8FF;
    box-shadow: 0 0 30px rgba(0, 200, 255, 0.25), 0 8px 24px rgba(0, 0, 0, 0.4);
    transform: translateY(-4px);

    span {
      color: #000;
    }

    &::before {
      transform: scaleX(1);
    }
  }
`

interface HeroSectionProps {
  isActive?: boolean
}

export default function HeroSection({ isActive = false }: HeroSectionProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  useSVGAnimate(svgRef, isActive)

  return (
    <HeroWrapper id="home" className={isActive ? 'active' : ''}>
      <TronLogo>
        <svg ref={svgRef} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#ff4500" strokeWidth="2" opacity="0.3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#ff4500" strokeWidth="1.5" opacity="0.25" />

          <line x1="45" y1="50" x2="70" y2="85" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" />
          <line x1="70" y1="85" x2="85" y2="110" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" />
          <line x1="85" y1="110" x2="100" y2="135" stroke="#ff4500" strokeWidth="10" strokeLinecap="round" />
          <line x1="155" y1="50" x2="130" y2="85" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" />
          <line x1="130" y1="85" x2="115" y2="110" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" />
          <line x1="115" y1="110" x2="100" y2="135" stroke="#ff4500" strokeWidth="10" strokeLinecap="round" />

          <line x1="45" y1="50" x2="70" y2="85" stroke="#ff8c00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="70" y1="85" x2="85" y2="110" stroke="#ff8c00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="85" y1="110" x2="100" y2="135" stroke="#ff8c00" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <line x1="155" y1="50" x2="130" y2="85" stroke="#ff8c00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="130" y1="85" x2="115" y2="110" stroke="#ff8c00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="115" y1="110" x2="100" y2="135" stroke="#ff8c00" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

          <circle cx="45" cy="50" r="6" fill="#ff4500">
            <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="70" cy="85" r="5" fill="#ff4500">
            <animate attributeName="r" values="5;7;5" dur="2s" begin="0.3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" begin="0.3s" repeatCount="indefinite" />
          </circle>
          <circle cx="85" cy="110" r="5" fill="#ff4500">
            <animate attributeName="r" values="5;7;5" dur="2s" begin="0.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" begin="0.6s" repeatCount="indefinite" />
          </circle>
          <circle cx="155" cy="50" r="6" fill="#ff4500">
            <animate attributeName="r" values="6;8;6" dur="2s" begin="0.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" begin="0.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="130" cy="85" r="5" fill="#ff4500">
            <animate attributeName="r" values="5;7;5" dur="2s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="115" cy="110" r="5" fill="#ff4500">
            <animate attributeName="r" values="5;7;5" dur="2s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" begin="0.8s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="135" r="8" fill="#ff4500">
            <animate attributeName="r" values="8;10;8" dur="2s" begin="1s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0.6;1" dur="2s" begin="1s" repeatCount="indefinite" />
          </circle>

          <line x1="45" y1="50" x2="25" y2="35" stroke="#ff4500" strokeWidth="2" opacity="0.5" />
          <line x1="155" y1="50" x2="175" y2="35" stroke="#ff4500" strokeWidth="2" opacity="0.5" />
          <line x1="100" y1="135" x2="100" y2="160" stroke="#ff4500" strokeWidth="3" opacity="0.5" />

          <rect x="20" y="30" width="8" height="8" fill="none" stroke="#ff8c00" strokeWidth="1.5" opacity="0.4" transform="rotate(45 24 34)" />
          <rect x="172" y="30" width="8" height="8" fill="none" stroke="#ff8c00" strokeWidth="1.5" opacity="0.4" transform="rotate(45 176 34)" />
          <rect x="96" y="156" width="8" height="8" fill="none" stroke="#ff8c00" strokeWidth="1.5" opacity="0.4" transform="rotate(45 100 160)" />

          <path d="M 35 45 Q 40 40 45 45" stroke="#ff4500" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M 155 45 Q 160 40 165 45" stroke="#ff4500" strokeWidth="1.5" fill="none" opacity="0.5" />
        </svg>
      </TronLogo>

      <Title>VIJALES</Title>
      <Tagline>Software house</Tagline>
      <Subtitle>
        Desenvolvemos o futuro. Arquitetamos soluções digitais que transcendem o código e transformam visões em realidade tecnológica.
      </Subtitle>
      <CtaButton href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5548988699159'}`}>
        <span>Entrar em contato</span>
      </CtaButton>
    </HeroWrapper>
  )
}
