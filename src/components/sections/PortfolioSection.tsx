'use client'

import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSVGAnimate } from '@/hooks/useSVGAnimate'

const PortfolioWrapper = styled.section`
  padding-top: 4rem;
  padding-bottom: 4rem;
  padding-right: 5%;
  padding-left: 5%;
  max-width: 1600px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 6rem;

  .v-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.8));
    
    svg {
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 15px;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 69, 0, 0.5);
  }

  p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 2px;
    font-weight: 300;
  }
`;

const Grid = styled.div`
  padding-inline: 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 4rem;

  @media (max-width: 768px) {
    padding-inline: 1rem;
    grid-template-columns: 1fr;
  }
`;

const ItemCard = styled.a`
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.95));
  border: 2px solid rgba(255, 69, 0, 0.3);
  overflow: hidden;
  position: relative;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%);
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 30px;
    height: 30px;
    background: #ff4500;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    box-shadow: 0 0 20px #ff4500;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: #ff4500;
    box-shadow: 0 20px 50px rgba(255, 69, 0, 0.5);
  }
`;

const ItemImage = styled.div<{ $bg: string }>`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #1a1a1a, #0a0a0a);
  background-image: url(${props => props.$bg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemContent = styled.div`
  padding: 2rem;

  h3 {
    font-size: 1rem;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  p {
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.8;
    font-size: 0.95rem;
    font-weight: 300;
  }
`;

interface PortfolioItemProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

function PortfolioItem({ title, description, image, link }: PortfolioItemProps) {
  return (
    <ItemCard href={link}>
      <ItemImage $bg={image} />
      <ItemContent>
        <h3>{title}</h3>
        <p>{description}</p>
      </ItemContent>
    </ItemCard>
  )
}

interface PortfolioSectionProps {
  isActive?: boolean;
}

export default function PortfolioSection({ isActive = false }: PortfolioSectionProps) {
  // const [ref, isVisible] = useIntersectionObserver(...) -> Replaced
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
          link="#"
        />
        <PortfolioItem
          title="Verde Vivo"
          description="Site institucional para quem oferece serviços de Jardinagem e Paisagismo"
          image="/portifolio/verdevivo.png"
          link="#"
        />
      </Grid>
    </PortfolioWrapper>
  )
}
