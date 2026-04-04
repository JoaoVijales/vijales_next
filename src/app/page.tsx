
'use client'

import { useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { usePageScroll } from '@/hooks/usePageScroll'
import { TransitionProvider, useTransition } from '@/context/TransitionContext'
import ThreeBackground from '@/components/effects/ThreeBackground'
import Sidebar from '@/components/layout/Sidebar'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ContactSection from '@/components/sections/ContactSection'

const MainWrapper = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: transparent;
  overflow: hidden;
  perspective: 1500px; /* Deep perspective */
  transform-style: preserve-3d;
`;

const VortexWrapper = styled.div<{ $visible: boolean; $top: boolean }>`
  position: fixed;
  ${props => props.$top ? 'top: 1.5rem;' : 'bottom: 1.5rem;'}
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.35s ease;
  pointer-events: none;

  svg {
    width: clamp(80px, 10vmin, 130px);
    height: clamp(80px, 10vmin, 130px);
  }
`;

const VortexLabel = styled.span`
  font-family: var(--font-orbitron), sans-serif;
  font-size: clamp(0.45rem, 0.8vmin, 0.6rem);
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #ff4500;
  text-shadow: 0 0 8px #ff4500;
`;

// Circunferência para r=38: 2π×38 ≈ 238.8
const RING_CIRCUMFERENCE = 238.8;

interface VortexProps {
  progress: number;
  isUp: boolean;
}

function VortexIndicator({ progress, isUp }: VortexProps) {
  const offset = RING_CIRCUMFERENCE * (1 - progress);
  return (
    <VortexWrapper $visible={progress > 0.03} $top={isUp}>
      {isUp && <VortexLabel>seção anterior</VortexLabel>}
      <svg
        viewBox="0 0 100 100"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        {/* Anel de fundo */}
        <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(255,69,0,0.1)" strokeWidth="2.5" />

        {/* Anel externo girando — vórtice */}
        <g style={{ animation: 'vortexSpin 1.8s linear infinite', transformOrigin: '50px 50px' }}>
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="rgba(255,69,0,0.35)"
            strokeWidth="1.5"
            strokeDasharray="5 9"
          />
        </g>

        {/* Arco de progresso */}
        <circle
          cx="50" cy="50" r="38"
          fill="none"
          stroke="#ff4500"
          strokeWidth="3"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
          style={{
            transition: 'stroke-dashoffset 0.08s linear',
            filter: 'drop-shadow(0 0 5px #ff4500) drop-shadow(0 0 12px #ff450088)',
          }}
        />

        {/* Seta central */}
        <text
          x="50" y="58"
          textAnchor="middle"
          fill="#ff4500"
          fontSize="22"
          fontFamily="monospace"
          style={{ filter: 'drop-shadow(0 0 6px #ff4500)' }}
        >
          {isUp ? '↑' : '↓'}
        </text>
      </svg>
      {!isUp && <VortexLabel>próxima seção</VortexLabel>}
    </VortexWrapper>
  );
}

const SectionWrapper = styled.div<{ $offset: number; $tunneling: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  will-change: transform, opacity;
  z-index: ${props => props.$offset === 0 ? 10 : 0};
  
  /* 
    State Logic:
    offset === 0: Active (Visible, Flat)
    offset < 0: Past (Above, Rotated Up)
    offset > 0: Future (Below, Rotated Down)
  */
  opacity: ${props => props.$offset === 0 ? 1 : 0};
  visibility: ${props => props.$offset === 0 ? 'visible' : 'hidden'};
  
  /* Tunnel substitui o flip — apenas opacity + escala de profundidade */
  transition: opacity 0.4s ease;

  transform: ${props =>
    props.$offset === 0
      ? 'translateZ(0) scale(1)'
      : 'translateZ(-180px) scale(0.94)'
  };

  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }

  /* Seção emerge do tunnel com glitch + drawIn em cascata */
  section {
    padding: 80px 10% 4rem 10%;
    box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 2;
    opacity: 0;
    will-change: opacity, filter, transform;

    &.active {
      animation: materialize 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }

    /* Filhos revelados da esquerda em cascata — feel de dados carregando */
    &.active > *:nth-child(1) { animation: drawIn 0.45s ease-out 0.1s  both; }
    &.active > *:nth-child(2) { animation: drawIn 0.45s ease-out 0.2s  both; }
    &.active > *:nth-child(3) { animation: drawIn 0.45s ease-out 0.3s  both; }
    &.active > *:nth-child(4) { animation: drawIn 0.45s ease-out 0.4s  both; }
    &.active > *:nth-child(5) { animation: drawIn 0.45s ease-out 0.5s  both; }
  }

  @media (max-height: 700px) {
    section { justify-content: flex-start; }
  }
`;

function HomeInner() {
  const SECTION_COUNT = 4;
  const { startTunnel, tunnelRef } = useTransition();

  const onTransition = useCallback(
    (dir: 1 | -1, cb: () => void) => startTunnel(dir, cb),
    [startTunnel]
  );

  const { activeSection, setActiveSection, scrollProgress, scrollDirection, containerRef, sectionRefs } = usePageScroll(SECTION_COUNT, onTransition);

  const setRef0 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[0] = el }, [sectionRefs])
  const setRef1 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[1] = el }, [sectionRefs])
  const setRef2 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[2] = el }, [sectionRefs])
  const setRef3 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[3] = el }, [sectionRefs])

  const isGoingUp = scrollDirection === -1;
  const isTunneling = tunnelRef.current.active;

  return (
    <MainWrapper ref={containerRef}>
      <ThreeBackground />
      <VortexIndicator progress={scrollProgress} isUp={isGoingUp} />
      <Sidebar activeIndex={activeSection} onNavigate={setActiveSection} />

      <SectionWrapper $offset={0 - activeSection} $tunneling={isTunneling} ref={setRef0}>
        <HeroSection isActive={activeSection === 0} />
      </SectionWrapper>

      <SectionWrapper $offset={1 - activeSection} $tunneling={isTunneling} ref={setRef1}>
        <ServicesSection isActive={activeSection === 1} />
      </SectionWrapper>

      <SectionWrapper $offset={2 - activeSection} $tunneling={isTunneling} ref={setRef2}>
        <PortfolioSection isActive={activeSection === 2} />
      </SectionWrapper>

      <SectionWrapper $offset={3 - activeSection} $tunneling={isTunneling} ref={setRef3}>
        <ContactSection isActive={activeSection === 3} />
      </SectionWrapper>
    </MainWrapper>
  )
}

export default function Home() {
  return (
    <TransitionProvider>
      <HomeInner />
    </TransitionProvider>
  )
}
