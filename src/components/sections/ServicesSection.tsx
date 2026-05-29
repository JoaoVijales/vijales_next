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
`

const expandLine = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`

const ServicesWrapper = styled.section`
  padding: 4rem 8%;
  display: grid !important;
  grid-template-columns: 1fr;
  align-content: center;
  gap: 1.25rem;
  min-height: 100vh;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(5px);
  border-radius: 20px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 4rem 8%;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    padding: 4rem 10%;
  }

  @media (max-width: 768px) {
    padding: 2rem 5%;
    overflow-y: auto;
  }

  @media (max-height: 700px) {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
`

const SectionHeader = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    margin-bottom: 0.75rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 15px;
    margin-bottom: 0.75rem;
    text-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
    font-family: var(--font-orbitron), sans-serif;

    @media (max-width: 768px) {
      font-size: 1.5rem;
      letter-spacing: 8px;
    }
  }
`

const HeaderSubtitle = styled.p`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    font-size: 0.6rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 6px;
    font-weight: 300;
    margin-bottom: 1.25rem;
    font-family: var(--font-orbitron), sans-serif;
  }
`

const HeaderDivider = styled.div<{ $isVisible: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(255, 69, 0, 0.4), rgba(0, 200, 255, 0.3), transparent);
    transform-origin: left;
    transform: scaleX(0);
    max-width: 280px;
    margin: 0 auto;

    ${p => p.$isVisible && css`
      animation: ${expandLine} 1.2s ease-out 0.3s forwards;
    `}
  }
`

const Card = styled.div<{ $isVisible?: boolean }>`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  transition: background 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease;

  opacity: 0;
  transform: perspective(1000px) rotateX(-90deg);

  ${props => props.$isVisible && css`
    animation: ${flipIn} 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  `}

  /* Gradient top-border on hover */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(to right, #ff4500, #00C8FF);
    opacity: 0;
    transition: opacity 0.35s ease;
  }

  /* Subtle inner glow */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(to bottom, rgba(255, 69, 0, 0.04), transparent);
    opacity: 0;
    transition: opacity 0.35s ease;
    pointer-events: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-6px);
    box-shadow:
      0 1px 0 0 rgba(255, 69, 0, 0.5),
      0 20px 40px rgba(0, 0, 0, 0.4),
      0 0 60px rgba(255, 69, 0, 0.06);
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (min-width: 1024px) {
    padding: 2rem;
    gap: 1.1rem;
  }

  @media (max-width: 768px) {
    padding: 1.25rem;
    gap: 0.7rem;
  }
`

const IconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background: rgba(255, 69, 0, 0.07);
  border: 1px solid rgba(255, 69, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.35s ease, background 0.35s ease;
  flex-shrink: 0;

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  ${Card}:hover & {
    border-color: rgba(255, 69, 0, 0.3);
    background: rgba(255, 69, 0, 0.1);
  }
`

const CardTitle = styled.h3`
  font-size: 0.82rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-weight: 700;
  font-family: var(--font-orbitron), sans-serif;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.72rem;
    letter-spacing: 2.5px;
  }
`

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.85;
  font-size: 0.7rem;
  font-weight: 300;
  letter-spacing: 0.2px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.65rem;
    line-height: 1.65;
  }
`

const Deliverables = styled.ul`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    padding: 0;
    list-style: none;
    margin: 0;
    padding-top: 0.25rem;

    li {
      font-size: 0.56rem;
      color: rgba(255, 255, 255, 0.55);
      letter-spacing: 0.8px;
      text-transform: uppercase;
      font-family: var(--font-orbitron), sans-serif;
      display: flex;
      align-items: center;
      gap: 0.65rem;
      transition: color 0.25s;

      &::before {
        content: '';
        display: inline-block;
        width: 3px;
        height: 3px;
        background: rgba(255, 69, 0, 0.45);
        flex-shrink: 0;
        border-radius: 1px;
        transition: background 0.25s;
      }
    }
  }

  ${Card}:hover & li {
    color: rgba(255, 255, 255, 0.75);

    &::before {
      background: rgba(255, 69, 0, 0.85);
    }
  }
`

const CardFooter = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
  }
`

const Tag = styled.span`
  font-size: 0.48rem;
  color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  padding: 0.15rem 0.5rem;
  font-family: var(--font-orbitron), sans-serif;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  transition: color 0.25s, border-color 0.25s;

  ${Card}:hover & {
    color: rgba(255, 69, 0, 0.45);
    border-color: rgba(255, 69, 0, 0.12);
  }
`

const BottomRow = styled.div<{ $isVisible: boolean }>`
  display: none;

  @media (min-width: 1024px) {
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
    opacity: 0;

    ${p => p.$isVisible && css`
      animation: ${flipIn} 1s ease-out 1.6s forwards;
    `}
  }
`

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;

  .label {
    font-size: 0.48rem;
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
    letter-spacing: 4px;
    margin-right: 0.4rem;
    font-family: var(--font-orbitron), sans-serif;
  }
`

const TechBadge = styled.span`
  font-size: 0.52rem;
  color: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  padding: 0.2rem 0.6rem;
  font-family: var(--font-orbitron), sans-serif;
  letter-spacing: 0.8px;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: rgba(255, 69, 0, 0.7);
    border-color: rgba(255, 69, 0, 0.18);
  }
`

const CtaLink = styled.a`
  font-size: 0.56rem;
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-family: var(--font-orbitron), sans-serif;
  transition: color 0.25s;

  &:hover {
    color: rgba(255, 69, 0, 0.75);
  }
`

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  isVisible: boolean
  index: number
  tags?: string[]
  deliverables?: string[]
}

function FeatureCard({ icon, title, description, isVisible, index, tags, deliverables }: FeatureProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  useSVGAnimate(svgRef, isVisible)

  return (
    <Card className="feature-card" $isVisible={isVisible} style={{ animationDelay: `${index * 0.25}s` }}>
      <IconBox>
        {React.cloneElement(icon as React.ReactElement, { ref: svgRef } as any)}
      </IconBox>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {deliverables && (
        <Deliverables>
          {deliverables.map(d => <li key={d}>{d}</li>)}
        </Deliverables>
      )}
      {tags && (
        <CardFooter>
          {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
        </CardFooter>
      )}
    </Card>
  )
}

interface ServicesSectionProps {
  isActive?: boolean
}

export default function ServicesSection({ isActive = false }: ServicesSectionProps) {
  return (
    <ServicesWrapper id="services" className={isActive ? 'active' : ''}>
      <SectionHeader>
        <h2>SERVIÇOS</h2>
        <HeaderSubtitle>O que construímos e entregamos</HeaderSubtitle>
        <HeaderDivider $isVisible={isActive} />
      </SectionHeader>

      <FeatureCard
        isVisible={isActive}
        index={0}
        title="Produto SaaS"
        description="Da ideia ao produto em produção. Construímos plataformas completas com autenticação, planos de assinatura, painel admin e isolamento multi-tenant."
        deliverables={[
          'Auth com múltiplos provedores',
          'Planos pagos com Stripe / AbacatePay',
          'Dashboard admin com métricas',
          'Multi-tenant com isolamento de dados',
        ]}
        tags={['Next.js', 'Supabase', 'Stripe', 'Firebase']}
        icon={
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="48" width="56" height="14" rx="2" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <rect x="12" y="33" width="56" height="14" rx="2" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <rect x="12" y="18" width="56" height="14" rx="2" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <circle cx="22" cy="25" r="2.5" fill="#FF4500" opacity="0.8">
              <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="22" cy="40" r="2.5" fill="#FF4500" opacity="0.5" />
            <circle cx="22" cy="55" r="2.5" fill="#FF4500" opacity="0.3" />
            <line x1="30" y1="25" x2="52" y2="25" stroke="#FF4500" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
            <line x1="30" y1="40" x2="46" y2="40" stroke="#FF4500" strokeWidth="1" strokeLinecap="round" opacity="0.25" />
            <line x1="30" y1="55" x2="42" y2="55" stroke="#FF4500" strokeWidth="1" strokeLinecap="round" opacity="0.15" />
            <path d="M 60 18 L 60 12 L 72 12 L 72 22 L 66 22" stroke="#FF4500" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6">
              <animate attributeName="stroke-dashoffset" values="0;-30" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
        }
      />

      <FeatureCard
        isVisible={isActive}
        index={1}
        title="Automação & IA"
        description="Sistemas que trabalham enquanto você dorme. Bots para WhatsApp, pipelines de IA para análise automatizada e integrações com webhooks em tempo real."
        deliverables={[
          'Bots WhatsApp via Twilio',
          'Pipelines com OpenAI / LLMs',
          'Webhooks e filas de processamento',
          'Painel de controle das automações',
        ]}
        tags={['OpenAI', 'Twilio', 'Django', 'Celery']}
        icon={
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="10" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <circle cx="40" cy="14" r="4" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <circle cx="40" cy="66" r="4" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <circle cx="14" cy="40" r="4" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <circle cx="66" cy="40" r="4" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <circle cx="21" cy="21" r="3" stroke="#FF4500" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="59" cy="21" r="3" stroke="#FF4500" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="21" cy="59" r="3" stroke="#FF4500" strokeWidth="1.5" fill="none" opacity="0.6" />
            <circle cx="59" cy="59" r="3" stroke="#FF4500" strokeWidth="1.5" fill="none" opacity="0.6" />
            <line x1="40" y1="30" x2="40" y2="18" stroke="#FF4500" strokeWidth="1" opacity="0.5" />
            <line x1="40" y1="50" x2="40" y2="62" stroke="#FF4500" strokeWidth="1" opacity="0.5" />
            <line x1="30" y1="40" x2="18" y2="40" stroke="#FF4500" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="40" x2="62" y2="40" stroke="#FF4500" strokeWidth="1" opacity="0.5" />
            <line x1="33" y1="33" x2="24" y2="24" stroke="#FF4500" strokeWidth="1" opacity="0.35" />
            <line x1="47" y1="33" x2="56" y2="24" stroke="#FF4500" strokeWidth="1" opacity="0.35" />
            <line x1="33" y1="47" x2="24" y2="56" stroke="#FF4500" strokeWidth="1" opacity="0.35" />
            <line x1="47" y1="47" x2="56" y2="56" stroke="#FF4500" strokeWidth="1" opacity="0.35" />
            <circle cx="40" cy="40" r="3" fill="#FF4500">
              <animate attributeName="r" values="3;4.5;3" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.6;1" dur="1.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        }
      />

      <FeatureCard
        isVisible={isActive}
        index={2}
        title="Experiência Web"
        description="Sites que causam impacto. Landing pages com ambientes 3D, animações avançadas e interações que convertem. Do portfólio imersivo à vitrine institucional."
        deliverables={[
          'Cenas 3D interativas com Three.js',
          'Animações SVG e CSS avançadas',
          'Performance e Core Web Vitals',
          'Design responsivo pixel-perfect',
        ]}
        tags={['Three.js', 'Next.js', 'GSAP', 'WebGL']}
        icon={
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="40" rx="22" ry="22" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <ellipse cx="40" cy="40" rx="22" ry="10" stroke="#FF4500" strokeWidth="1" fill="none" opacity="0.5" />
            <ellipse cx="40" cy="40" rx="10" ry="22" stroke="#FF4500" strokeWidth="1" fill="none" opacity="0.5" />
            <line x1="18" y1="40" x2="62" y2="40" stroke="#FF4500" strokeWidth="1" opacity="0.3" />
            <line x1="40" y1="18" x2="40" y2="62" stroke="#FF4500" strokeWidth="1" opacity="0.3" />
            <circle cx="40" cy="40" r="3" fill="#FF4500" opacity="0.9">
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="57" cy="27" r="2" fill="#FF4500" opacity="0.6" />
            <circle cx="23" cy="53" r="2" fill="#FF4500" opacity="0.4" />
            <path d="M 57 27 L 62 20 L 68 22" stroke="#FF4500" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />
            <circle cx="65" cy="19" r="1.5" fill="#FF4500" opacity="0.8">
              <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        }
      />

      <FeatureCard
        isVisible={isActive}
        index={3}
        title="API & Integrações"
        description="Backend robusto para qualquer escala. APIs REST documentadas, integrações com serviços externos e infraestrutura containerizada pronta para produção."
        deliverables={[
          'APIs REST com documentação',
          'Integrações com sistemas externos',
          'Deploy com Docker e Nginx',
          'Testes automatizados e CI/CD',
        ]}
        tags={['Django REST', 'Node.js', 'PostgreSQL', 'Docker']}
        icon={
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="28" width="20" height="24" rx="2" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <rect x="50" y="28" width="20" height="24" rx="2" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <rect x="30" y="35" width="20" height="10" rx="2" stroke="#FF4500" strokeWidth="1.5" fill="none" />
            <line x1="30" y1="40" x2="18" y2="40" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="50" y1="40" x2="62" y2="40" stroke="#FF4500" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="15" cy="35" r="1.5" fill="#FF4500" opacity="0.7" />
            <circle cx="15" cy="40" r="1.5" fill="#FF4500" opacity="0.4" />
            <circle cx="15" cy="45" r="1.5" fill="#FF4500" opacity="0.2" />
            <circle cx="65" cy="35" r="1.5" fill="#FF4500" opacity="0.7" />
            <circle cx="65" cy="40" r="1.5" fill="#FF4500" opacity="0.4" />
            <circle cx="65" cy="45" r="1.5" fill="#FF4500" opacity="0.2" />
            <path d="M 36 40 L 40 36 L 44 40 L 40 44 Z" stroke="#FF4500" strokeWidth="1" fill="none">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </path>
            <line x1="40" y1="28" x2="40" y2="20" stroke="#FF4500" strokeWidth="1" strokeLinecap="round" opacity="0.4" strokeDasharray="2 2" />
            <line x1="40" y1="52" x2="40" y2="60" stroke="#FF4500" strokeWidth="1" strokeLinecap="round" opacity="0.4" strokeDasharray="2 2" />
          </svg>
        }
      />

      <BottomRow $isVisible={isActive}>
        <TechStack>
          <span className="label">Stack</span>
          {['Next.js', 'React', 'TypeScript', 'Django', 'PostgreSQL', 'Supabase', 'Three.js', 'Docker'].map(tech => (
            <TechBadge key={tech}>{tech}</TechBadge>
          ))}
        </TechStack>
        <CtaLink href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5548988699159'}`}>
          Não sabe qual serviço precisa? Conta o projeto →
        </CtaLink>
      </BottomRow>
    </ServicesWrapper>
  )
}
