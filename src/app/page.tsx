'use client'

import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import Sidebar from '@/components/layout/Sidebar'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ContactSection from '@/components/sections/ContactSection'

const PageWrapper = styled.div`
  height: 100vh;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar { display: none; }
`;

const HeroContainer = styled.div`
  height: 100vh;
  perspective: 1500px;
  overflow: hidden;
  position: relative;
`;

const HeroInner = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 80px 10% 4rem;
  box-sizing: border-box;
  will-change: transform, opacity;
  transform-origin: center top;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const GradientBridge = styled.div`
  height: 160px;
  background: linear-gradient(to bottom, transparent, #000);
  pointer-events: none;
`;

const SectionBlock = styled.div`
  min-height: 100vh;
  position: relative;
  background: #000;
`;

export default function Home() {
  const { activeSection, setActiveSection, sectionRefs, containerRef } = useSectionObserver();
  const heroInnerRef = useRef<HTMLDivElement>(null);

  const setRef0 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[0] = el }, [sectionRefs]);
  const setRef1 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[1] = el }, [sectionRefs]);
  const setRef2 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[2] = el }, [sectionRefs]);
  const setRef3 = useCallback((el: HTMLDivElement | null) => { sectionRefs.current[3] = el }, [sectionRefs]);

  useEffect(() => {
    const container = containerRef.current;
    const heroInner = heroInnerRef.current;
    if (!container || !heroInner) return;

    const handleScroll = () => {
      const progress = Math.min(container.scrollTop / container.clientHeight, 1);

      if (progress <= 0) {
        heroInner.style.transform = '';
        heroInner.style.opacity = '1';
        return;
      }

      const y = -100 * progress;
      const z = -200 * progress;
      const rotX = 45 * progress;
      const opacity = Math.max(1 - progress * 1.5, 0);

      heroInner.style.transform = `translate3d(0, ${y}px, ${z}px) rotateX(${rotX}deg)`;
      heroInner.style.opacity = String(opacity);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return (
    <PageWrapper ref={containerRef}>
      <Sidebar activeIndex={activeSection} onNavigate={setActiveSection} />

      <HeroContainer ref={setRef0}>
        <HeroInner ref={heroInnerRef}>
          <HeroSection isActive={activeSection === 0} />
        </HeroInner>
      </HeroContainer>

      <GradientBridge />

      <SectionBlock ref={setRef1}>
        <ServicesSection isActive={activeSection === 1} />
      </SectionBlock>

      <SectionBlock ref={setRef2}>
        <PortfolioSection isActive={activeSection === 2} />
      </SectionBlock>

      <SectionBlock ref={setRef3}>
        <ContactSection isActive={activeSection === 3} />
      </SectionBlock>
    </PageWrapper>
  );
}
