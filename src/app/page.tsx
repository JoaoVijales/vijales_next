
'use client'

import { useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { usePageScroll } from '@/hooks/usePageScroll'
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

const arrowBounceDown = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(4px); }
`;

const arrowBounceUp = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-4px); }
`;

const ScrollIndicator = styled.div<{ $visible: boolean; $top: boolean }>`
  position: fixed;
  ${props => props.$top ? 'top: 2rem;' : 'bottom: 2rem;'}
  left: 50%;
  transform: translateX(-50%);
  z-index: 200;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: ${props => props.$visible ? 1 : 0};
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

const ScrollLabel = styled.span`
  font-family: var(--font-orbitron), sans-serif;
  font-size: 0.55rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #ff4500;
  text-shadow: 0 0 8px #ff4500;
  display: block;
`;

const ScrollTrack = styled.div`
  width: 140px;
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 69, 0, 0.2);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
`;

const ScrollFill = styled.div<{ $progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => Math.round(props.$progress * 100)}%;
  background: #ff4500;
  box-shadow: 0 0 6px #ff4500, 0 0 14px #ff450066;
  transition: width 0.08s linear;
  border-radius: 2px;
`;

const ScrollArrow = styled.div<{ $up: boolean }>`
  color: #ff4500;
  text-shadow: 0 0 8px #ff4500;
  font-size: 0.9rem;
  line-height: 1;
  animation: ${props => props.$up ? arrowBounceUp : arrowBounceDown} 1s ease-in-out infinite;
`;

const SectionWrapper = styled.div<{ $offset: number }>`
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
  
  transition: 
    opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);

  transform: ${props => {
    if (props.$offset === 0) return 'translate3d(0, 0, 0) rotateX(0deg)';
    if (props.$offset < 0) return 'translate3d(0, -100px, -200px) rotateX(45deg)'; // Past (Top)
    return 'translate3d(0, 100px, -200px) rotateX(-45deg)'; // Future (Bottom)
  }};

  overflow-y: auto; /* Enable internal scrolling */
  overflow-x: hidden;
  
  /* Hide scrollbar but allow scrolling */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  /* Target internal sections for specific home behavior */
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
    
    /* Animation base */
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out, filter 0.5s ease-out;
    will-change: opacity, transform;

    &.active {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-height: 700px) {
    section {
      justify-content: flex-start;
    }
  }
`;

export default function Home() {
  const SECTION_COUNT = 4;
  const { activeSection, setActiveSection, scrollProgress, scrollDirection, containerRef, sectionRefs } = usePageScroll(SECTION_COUNT);

  const setRef0 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[0] = el }, [sectionRefs])
  const setRef1 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[1] = el }, [sectionRefs])
  const setRef2 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[2] = el }, [sectionRefs])
  const setRef3 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[3] = el }, [sectionRefs])

  const isGoingUp = scrollDirection === -1;
  const showIndicator = scrollProgress > 0.03;

  return (
    <MainWrapper ref={containerRef}>
      <ScrollIndicator $visible={showIndicator} $top={isGoingUp} aria-hidden="true">
        {isGoingUp && <ScrollArrow $up={true}>↑</ScrollArrow>}
        <ScrollLabel>{isGoingUp ? 'seção anterior' : 'próxima seção'}</ScrollLabel>
        <ScrollTrack>
          <ScrollFill $progress={scrollProgress} />
        </ScrollTrack>
        {!isGoingUp && <ScrollArrow $up={false}>↓</ScrollArrow>}
      </ScrollIndicator>
      <Sidebar activeIndex={activeSection} onNavigate={setActiveSection} />

      <SectionWrapper $offset={0 - activeSection} ref={setRef0}>
        <HeroSection isActive={activeSection === 0} />
      </SectionWrapper>

      <SectionWrapper $offset={1 - activeSection} ref={setRef1}>
        <ServicesSection isActive={activeSection === 1} />
      </SectionWrapper>

      <SectionWrapper $offset={2 - activeSection} ref={setRef2}>
        <PortfolioSection isActive={activeSection === 2} />
      </SectionWrapper>

      <SectionWrapper $offset={3 - activeSection} ref={setRef3}>
        <ContactSection isActive={activeSection === 3} />
      </SectionWrapper>
    </MainWrapper>
  )
}
