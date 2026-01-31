'use client'

import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSVGAnimate } from '@/hooks/useSVGAnimate'

const HeroWrapper = styled.section`
  text-align: center;
  align-items: center;
`;

const TronLogo = styled.div`
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
  position: relative;
  animation: float 8s ease-in-out infinite;
  filter: drop-shadow(0 0 40px rgba(255, 69, 0, 0.9));

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Tagline = styled.div`
  font-size: 0.75rem;
  color: #00C8FF;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 6px;
  font-weight: 400;
  opacity: 0;
  animation: fadeInUp 1s ease-out 0.5s forwards;
  display: block;
`;

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
    animation: glitchText 5s infinite;
  }
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 3rem;
  max-width: 650px;
  line-height: 1.8;
  font-weight: 300;
  letter-spacing: 1px;
  opacity: 0;
  animation: fadeInUp 1s ease-out 1.1s forwards;
`;

const CtaButton = styled.a`
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 700;
  font-family: var(--font-orbitron), sans-serif;
  background: transparent;
  text-decoration: none;
  border: 2px solid #00C8FF;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.4s;
  clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.3);
  opacity: 0;
  animation: fadeInUp 1s ease-out 1.4s forwards;
  color: #00C8FF;

  span {
    position: relative;
    z-index: 2;
    transition: color 0.4s;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, #00C8FF, transparent);
    transition: all 0.6s;
    transform: translate(-50%, -50%);
  }

  &:hover {
    color: #000;
    background: #00C8FF;
    box-shadow: 0 0 40px #00C8FFcc, inset 0 0 20px #ffffff33;
    transform: translateY(-5px);

    span {
      color: #000;
    }

    &::before {
      width: 300%;
      height: 300%;
    }
  }
`;

interface HeroSectionProps {
  isActive?: boolean;
}

export default function HeroSection({ isActive = false }: HeroSectionProps) {
  // const [ref, isVisible] = useIntersectionObserver(...) -> Replaced by isActive prop
  const svgRef = useRef<SVGSVGElement>(null)

  useSVGAnimate(svgRef, isActive)

  return (
    <HeroWrapper id="home" className={isActive ? 'active' : ''}>
      <TronLogo>
        <svg ref={svgRef} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#ff4500" strokeWidth="2" opacity="0.3" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#ff4500" strokeWidth="1.5" opacity="0.25" />

          {/* Main V Shape */}
          <line x1="45" y1="50" x2="70" y2="85" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" />
          <line x1="70" y1="85" x2="85" y2="110" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" />
          <line x1="85" y1="110" x2="100" y2="135" stroke="#ff4500" strokeWidth="10" strokeLinecap="round" />

          <line x1="155" y1="50" x2="130" y2="85" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" />
          <line x1="130" y1="85" x2="115" y2="110" stroke="#ff4500" strokeWidth="8" strokeLinecap="round" />
          <line x1="115" y1="110" x2="100" y2="135" stroke="#ff4500" strokeWidth="10" strokeLinecap="round" />

          {/* Glowing Overlays */}
          <line x1="45" y1="50" x2="70" y2="85" stroke="#ff8c00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="70" y1="85" x2="85" y2="110" stroke="#ff8c00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="85" y1="110" x2="100" y2="135" stroke="#ff8c00" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
          <line x1="155" y1="50" x2="130" y2="85" stroke="#ff8c00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="130" y1="85" x2="115" y2="110" stroke="#ff8c00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <line x1="115" y1="110" x2="100" y2="135" stroke="#ff8c00" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

          {/* Node Points */}
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

          {/* Connectors */}
          <line x1="45" y1="50" x2="25" y2="35" stroke="#ff4500" strokeWidth="2" opacity="0.5" />
          <line x1="155" y1="50" x2="175" y2="35" stroke="#ff4500" strokeWidth="2" opacity="0.5" />
          <line x1="100" y1="135" x2="100" y2="160" stroke="#ff4500" strokeWidth="3" opacity="0.5" />

          {/* Decorative Elements */}
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
      <CtaButton href="https://wa.me/5548998699159">
        <span>Entrar em contato</span>
      </CtaButton>
    </HeroWrapper>
  )
}
