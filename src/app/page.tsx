
'use client'

import styled from 'styled-components'
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
    padding: 80px 10% 0 10%;
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
  const { activeSection, setActiveSection, containerRef, sectionRefs } = usePageScroll(SECTION_COUNT);

  return (
    <MainWrapper ref={containerRef}>
      <Sidebar activeIndex={activeSection} onNavigate={setActiveSection} />

      <SectionWrapper
        $offset={0 - activeSection}
        ref={el => { sectionRefs.current[0] = el }}
      >
        <HeroSection isActive={activeSection === 0} />
      </SectionWrapper>

      <SectionWrapper
        $offset={1 - activeSection}
        ref={el => { sectionRefs.current[1] = el }}
      >
        <ServicesSection isActive={activeSection === 1} />
      </SectionWrapper>

      <SectionWrapper
        $offset={2 - activeSection}
        ref={el => { sectionRefs.current[2] = el }}
      >
        <PortfolioSection isActive={activeSection === 2} />
      </SectionWrapper>

      <SectionWrapper
        $offset={3 - activeSection}
        ref={el => { sectionRefs.current[3] = el }}
      >
        <ContactSection isActive={activeSection === 3} />
      </SectionWrapper>
    </MainWrapper>
  )
}
