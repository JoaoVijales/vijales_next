'use client'

import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSVGAnimate } from '@/hooks/useSVGAnimate'

const PortfolioWrapper = styled.section`
  padding: 4rem 5%;
  max-width: 1600px;
  margin: 0 auto;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 2rem 5%;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  .v-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 1.5rem;
    filter: drop-shadow(0 0 16px rgba(255, 69, 0, 0.7));

    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
      margin-bottom: 1rem;
    }

    svg { width: 100%; height: 100%; }
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

  p {
    font-size: 0.65rem;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 5px;
    font-weight: 300;
    text-transform: uppercase;
    font-family: var(--font-orbitron), sans-serif;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ItemCard = styled.a`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
  text-decoration: none;
  display: flex;
  flex-direction: column;

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
    z-index: 2;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    box-shadow:
      0 1px 0 0 rgba(255, 69, 0, 0.4),
      0 20px 40px rgba(0, 0, 0, 0.5),
      0 0 60px rgba(255, 69, 0, 0.05);
  }

  &:hover::before {
    opacity: 1;
  }
`

const ItemImage = styled.div<{ $bg: string }>`
  width: 100%;
  height: 180px;
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9));
  background-image: url(${props => props.$bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.6));
    pointer-events: none;
  }

  @media (max-width: 768px) {
    height: 150px;
  }
`

const ItemContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.04);

  @media (max-width: 768px) {
    padding: 1.1rem;
  }

  h3 {
    font-size: 0.78rem;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 700;
    font-family: var(--font-orbitron), sans-serif;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.7rem;
    }
  }

  p {
    color: rgba(255, 255, 255, 0.68);
    line-height: 1.7;
    font-size: 0.7rem;
    font-weight: 300;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 0.65rem;
    }
  }
`

const ViewLabel = styled.span`
  display: none;

  @media (min-width: 1024px) {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.52rem;
    color: rgba(255, 69, 0, 0);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-family: var(--font-orbitron), sans-serif;
    margin-top: auto;
    padding-top: 0.75rem;
    transition: color 0.25s ease;

    ${ItemCard}:hover & {
      color: rgba(255, 69, 0, 0.6);
    }

    &::after {
      content: '→';
    }
  }
`

interface PortfolioItemProps {
  title: string
  description: string
  image: string
  link: string
}

function PortfolioItem({ title, description, image, link }: PortfolioItemProps) {
  return (
    <ItemCard href={link}>
      <ItemImage $bg={image} />
      <ItemContent>
        <h3>{title}</h3>
        <p>{description}</p>
        <ViewLabel>Ver projeto</ViewLabel>
      </ItemContent>
    </ItemCard>
  )
}

interface PortfolioSectionProps {
  isActive?: boolean
}

export default function PortfolioSection({ isActive = false }: PortfolioSectionProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  useSVGAnimate(svgRef, isActive)

  return (
    <PortfolioWrapper id="portfolio" className={isActive ? 'active' : ''}>
      <SectionHeader>
        <div className="v-icon">
          <svg ref={svgRef} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ff4500" strokeWidth="2" opacity="0.4" />
            <line x1="20" y1="25" x2="35" y2="50" stroke="#ff4500" strokeWidth="5" strokeLinecap="round" />
            <line x1="35" y1="50" x2="50" y2="75" stroke="#ff4500" strokeWidth="6" strokeLinecap="round" />
            <line x1="80" y1="25" x2="65" y2="50" stroke="#ff4500" strokeWidth="5" strokeLinecap="round" />
            <line x1="65" y1="50" x2="50" y2="75" stroke="#ff4500" strokeWidth="6" strokeLinecap="round" />
            <circle cx="20" cy="25" r="4" fill="#ff4500">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="35" cy="50" r="3.5" fill="#ff4500">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="80" cy="25" r="4" fill="#ff4500">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin="0.3s" repeatCount="indefinite" />
            </circle>
            <circle cx="65" cy="50" r="3.5" fill="#ff4500">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="75" r="5" fill="#ff4500">
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" begin="1s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <h2>PORTFOLIO</h2>
        <p>Projetos que definem o futuro digital</p>
      </SectionHeader>

      <Grid>
        <PortfolioItem
          title="NexusFit"
          description="Site institucional para academia com calculador de IMC"
          image="/portifolio/nexus_fit.png"
          link="/portifolio/nexus"
        />
        <PortfolioItem
          title="Verde Vivo"
          description="Site institucional para quem oferece serviços de Jardinagem e Paisagismo"
          image="/portifolio/verdevivo.png"
          link="/portifolio/verdevivo"
        />
        <PortfolioItem
          title="Imobi Template"
          description="Plataforma imobiliária full-stack — catálogo inteligente, busca avançada e gestão completa de imóveis"
          image="/portifolio/imobiliaria.png"
          link="/portifolio/imobiliaria"
        />
        <PortfolioItem
          title="Clínica AURA"
          description="Landing page para clínica de estética premium — design editorial, luxo e sofisticação"
          image="https://storage.googleapis.com/uxpilot-auth.appspot.com/d4be4a9ab6-7978702809258893a9e9.png"
          link="/portifolio/estetica/site"
        />
        <PortfolioItem
          title="OdontoPremium"
          description="Site institucional para clínica odontológica — autoridade, tratamentos e agendamento online"
          image="https://storage.googleapis.com/uxpilot-auth.appspot.com/90951fe011-330cd80caa34c07c9908.png"
          link="/portifolio/odonto/site"
        />
        <PortfolioItem
          title="Maison Éclat"
          description="Site para salão de beleza de luxo — serviços exclusivos, experiência sensorial e agendamento"
          image="https://storage.googleapis.com/uxpilot-auth.appspot.com/480ee7895b-7f80c1b41f88850f56c4.png"
          link="/portifolio/cabelereiro/site"
        />
      </Grid>
    </PortfolioWrapper>
  )
}
