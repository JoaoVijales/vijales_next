'use client'

import React, { useRef } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useSVGAnimate } from '@/hooks/useSVGAnimate'

const flipIn = keyframes`
  0% {
    opacity: 0;
    transform: perspective(1000px) rotateX(-90deg) translateY(50px);
  }
  100% {
    opacity: 1;
    transform: perspective(1000px) rotateX(0deg) translateY(0);
  }
`;

const ServicesWrapper = styled.section`
  padding: 4rem 15%;
  display: grid !important;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-height: 100vh;
  max-width: 1600px;
  margin: 0 auto;
  
  /* Improve visibility against moving background */
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 20px;
`;

const SectionHeader = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 15px;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
  }
`;

const Card = styled.div<{ $isVisible?: boolean }>`
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9));
  border: 2px solid #0c0c0c66;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  /* Initial state for animation */
  opacity: 0; 
  transform: perspective(1000px) rotateX(-90deg);

  ${props => props.$isVisible && css`
    animation: ${flipIn} 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  `}

  /* Stagger delays based on child index is tricky with styled-components isolation,
     so we can handle it via props or just generic nth-child in the wrapper if we wanted.
     For now, let's keep it simple or use a delay prop if needed.
     Actually, let's add a small random or index based delay if we can, but 
     prop drilling index is easy.
  */
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 69, 0, 0.3), transparent);
    transition: left 0.8s;
  }

  &:hover::before {
    left: 100%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25px;
    height: 25px;
    background: #ff4500;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    box-shadow: 0 0 20px #ff4500;
  }

  &:hover {
    transform: perspective(1000px) rotateX(0deg) translateY(-15px) scale(1.02);
    border-color: #ff4500;
    box-shadow: 0 20px 60px rgba(255, 69, 0, 0.4);
    opacity: 1; /* Ensure it stays visible */
  }

  h3 {
    font-size: 0.95rem;
    margin-bottom: 0.5rem;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 4px;
    font-weight: 700;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 40px;
      height: 2px;
      background: #ff4500;
      box-shadow: 0 0 10px #ff4500;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    line-height: 2;
    font-size: 0.75rem;
    font-weight: 300;
    letter-spacing: 0.5px;
    margin-top: 1rem;
  }
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  margin-bottom: 0;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  index: number;
}

function FeatureCard({ icon, title, description, isVisible, index }: FeatureProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Apply SVG animation hook to the cloned icon if it's an SVG
  useSVGAnimate(svgRef, isVisible)

  return (
    <Card className="feature-card" $isVisible={isVisible} style={{ animationDelay: `${index * 0.4}s` }}>
      <IconWrapper>
        {React.cloneElement(icon as React.ReactElement, { ref: svgRef } as any)}
      </IconWrapper>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  )
}

interface ServicesSectionProps {
  isActive?: boolean;
}

export default function ServicesSection({ isActive = false }: ServicesSectionProps) {
  // const [ref, isVisible] = useIntersectionObserver(...) -> Replaced

  return (
    <ServicesWrapper id="services" className={isActive ? 'active' : ''}>
      <SectionHeader>
        <h2>SERVIÇOS</h2>
      </SectionHeader>

      <FeatureCard
        isVisible={isActive}
        index={0}
        title="Soluções Personalizadas"
        description="Desenvolvimento sob medida com código limpo e otimizado, criando aplicações que atendem exatamente às necessidades do seu negócio com performance excepcional."
        icon={
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 10 L40 25" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 55 L40 70" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" />
            <path d="M10 40 L25 40" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" />
            <path d="M55 40 L70 40" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" />
            <path d="M40 25 L50 30 L50 40 L40 45 L30 40 L30 30 Z" stroke="#FF4500" strokeWidth="2" fill="none" />
            <circle cx="40" cy="10" r="3" fill="#FF4500" />
            <circle cx="40" cy="70" r="3" fill="#FF4500" />
            <circle cx="10" cy="40" r="3" fill="#FF4500" />
            <circle cx="70" cy="40" r="3" fill="#FF4500" />
            <path d="M25 15 L30 20" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M55 15 L50 20" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M25 65 L30 60" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M55 65 L50 60" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="25" cy="15" r="2" fill="none" stroke="#FF4500" strokeWidth="1.5" />
            <circle cx="55" cy="15" r="2" fill="none" stroke="#FF4500" strokeWidth="1.5" />
            <circle cx="25" cy="65" r="2" fill="none" stroke="#FF4500" strokeWidth="1.5" />
            <circle cx="55" cy="65" r="2" fill="none" stroke="#FF4500" strokeWidth="1.5" />
            <circle cx="40" cy="35" r="2" fill="#FF4500" opacity="0.8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
        }
      />

      <FeatureCard
        isVisible={isActive}
        index={1}
        title="Design Responsivo e Moderno"
        description="Interfaces elegantes que funcionam perfeitamente em qualquer dispositivo, proporcionando uma experiência fluida e profissional para seus usuários."
        icon={
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="20" width="50" height="32" rx="2" stroke="#FF4500" strokeWidth="2" fill="none" />
            <line x1="20" y1="25" x2="35" y2="25" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="30" x2="45" y2="30" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="35" x2="40" y2="35" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="15" y="20" width="50" height="32" rx="2" stroke="#FF4500" strokeWidth="1" fill="none" opacity="0.3" />
            <rect x="14" y="19" width="52" height="34" rx="2" stroke="#FF4500" strokeWidth="0.5" fill="none" opacity="0.2" />
            <line x1="38" y1="52" x2="42" y2="52" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" />
            <line x1="30" y1="56" x2="50" y2="56" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" />
            <rect x="52" y="42" width="18" height="28" rx="2" stroke="#FF4500" strokeWidth="2" fill="none" />
            <line x1="55" y1="46" x2="60" y2="46" stroke="#FF4500" strokeWidth="1" strokeLinecap="round" />
            <line x1="55" y1="49" x2="65" y2="49" stroke="#FF4500" strokeWidth="1" strokeLinecap="round" />
            <line x1="55" y1="52" x2="63" y2="52" stroke="#FF4500" strokeWidth="1" strokeLinecap="round" />
            <path d="M 45 35 Q 50 37 52 42" stroke="#FF4500" strokeWidth="1.5" fill="none" strokeDasharray="2 2" opacity="0.6">
              <animate attributeName="stroke-dashoffset" values="0;-10" dur="1.5s" repeatCount="indefinite" />
            </path>
            <circle cx="55" cy="30" r="1.5" fill="#FF4500" opacity="0.8">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="25" r="1.5" fill="#FF4500" opacity="0.8">
              <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        }
      />

      <FeatureCard
        isVisible={isActive}
        index={2}
        title="Suporte Completo"
        description="Integração de sistemas, manutenção contínua e arquitetura escalável para garantir que seu projeto cresça junto com seu negócio sem preocupações."
        icon={
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="18" stroke="#FF4500" strokeWidth="2" fill="none" />
            <rect x="38" y="17" width="4" height="6" fill="#FF4500" />
            <rect x="38" y="57" width="4" height="6" fill="#FF4500" />
            <rect x="17" y="38" width="6" height="4" fill="#FF4500" />
            <rect x="57" y="38" width="6" height="4" fill="#FF4500" />
            <rect x="52" y="23" width="4" height="6" fill="#FF4500" transform="rotate(45 54 26)" />
            <rect x="24" y="23" width="4" height="6" fill="#FF4500" transform="rotate(-45 26 26)" />
            <rect x="52" y="51" width="4" height="6" fill="#FF4500" transform="rotate(-45 54 54)" />
            <rect x="24" y="51" width="4" height="6" fill="#FF4500" transform="rotate(45 26 54)" />
            <circle cx="40" cy="40" r="8" stroke="#FF4500" strokeWidth="2" fill="none" />
            <circle cx="40" cy="40" r="3" fill="#FF4500">
              <animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.7;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <g opacity="0.7">
              <path d="M 65 15 L 70 10 L 72 12 L 67 17" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <circle cx="65" cy="15" r="3" stroke="#FF4500" strokeWidth="1.5" fill="none" />
              <path d="M 12 68 L 8 72" stroke="#FF4500" strokeWidth="2" strokeLinecap="round" />
              <rect x="8" y="64" width="8" height="3" fill="#FF4500" transform="rotate(-45 12 65.5)" />
            </g>
            <path d="M 30 12 L 28 10 L 26 12" stroke="#FF4500" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="28" cy="10" r="1.5" fill="#FF4500" />
            <path d="M 68 50 L 70 48 L 72 50" stroke="#FF4500" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <circle cx="70" cy="48" r="1.5" fill="#FF4500" />
            <path d="M 15 65 Q 25 50 35 45" stroke="#FF4500" strokeWidth="1" fill="none" strokeDasharray="2 2" opacity="0.5">
              <animate attributeName="stroke-dashoffset" values="0;-8" dur="1s" repeatCount="indefinite" />
            </path>
          </svg>
        }
      />
    </ServicesWrapper>
  )
}
