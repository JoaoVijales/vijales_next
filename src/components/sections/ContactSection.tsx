'use client'

import React from 'react'
import styled, { keyframes } from 'styled-components'

// ─── Constants ────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '5548988699159'
const WHATSAPP_PRE_MESSAGE = encodeURIComponent(
  'Olá! Vi seu portfólio e quero conversar sobre um projeto. Pode me chamar?'
)
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_PRE_MESSAGE}`

// ─── Animations ───────────────────────────────────────────────────────────────

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  50%       { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
`

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
`

const orbitPing = keyframes`
  0%   { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
`

// ─── Styled Components ────────────────────────────────────────────────────────

const ContactWrapper = styled.section`
  padding: 4rem 5%;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2rem 5%;
  }
`

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }

  .v-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.8));

    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
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
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 69, 0, 0.5);

    @media (max-width: 768px) {
      font-size: 1.5rem;
      letter-spacing: 8px;
    }
  }

  p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 2px;
    font-weight: 300;
  }
`

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
  padding: 3rem 3.5rem;
  background: rgba(10, 10, 10, 0.7);
  border: 1px solid rgba(255, 69, 0, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 4px;
  filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.9));
  position: relative;
  clip-path: polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px);
  text-align: center;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 30px; height: 30px;
    border-top: 3px solid #ff4500;
    border-right: 3px solid #ff4500;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 30px; height: 30px;
    border-bottom: 3px solid #ff4500;
    border-left: 3px solid #ff4500;
    pointer-events: none;
  }
`

const Tagline = styled.p`
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 1.5px;
  font-weight: 300;
  line-height: 1.7;
  margin-bottom: 2.5rem;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const WhatsAppButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
`

const WhatsAppButton = styled.a<{ $isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1.2rem 3rem;
  background: rgba(37, 211, 102, 0.1);
  border: 2px solid #25D366;
  color: #25D366;
  font-family: inherit;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 0.9rem;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);
  animation: ${float} 3s ease-in-out infinite;
  animation-play-state: ${props => props.$isActive ? 'running' : 'paused'};

  &:hover {
    background: #25D366;
    color: #000;
    box-shadow:
      0 0 30px rgba(37, 211, 102, 0.6),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
    letter-spacing: 6px;
    animation: none;
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 1rem 1.5rem;
  }
`

const WhatsAppIconWrapper = styled.span<{ $isActive?: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  .ping {
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid #25D366;
    animation: ${orbitPing} 1.8s ease-out infinite;
    animation-play-state: ${props => props.$isActive ? 'running' : 'paused'};
  }

  svg {
    width: 22px;
    height: 22px;
    flex-shrink: 0;
  }
`

const PhoneDisplay = styled.p`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 3px;
  font-weight: 300;
  margin: 0;
`

const AvailabilityBadge = styled.span<{ $isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  color: rgba(37, 211, 102, 0.8);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 400;

  .dot {
    width: 7px;
    height: 7px;
    background: #25D366;
    border-radius: 50%;
    animation: ${pulse} 2s ease infinite;
    animation-play-state: ${props => props.$isActive ? 'running' : 'paused'};
    flex-shrink: 0;
  }
`

// ─── Component ────────────────────────────────────────────────────────────────

interface ContactSectionProps {
  isActive?: boolean
}

export default function ContactSection({ isActive = false }: ContactSectionProps) {
  return (
    <ContactWrapper
      id="contact"
      aria-label="Contato"
      className={isActive ? 'active' : ''}
    >
      <SectionHeader>
        <div className="v-icon">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ff4500" strokeWidth="2" opacity="0.4" />
            <g transform="translate(25, 30) scale(1)">
              <rect x="0" y="0" width="50" height="35" rx="3" fill="none" stroke="#ff4500" strokeWidth="3" />
              <polyline points="0,0 25,20 50,0" fill="none" stroke="#ff4500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#ff4500" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="45;55" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.3;0" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <h2>CONTATO</h2>
        <p>Conecte-se com o futuro</p>
      </SectionHeader>

      <Container className="contact-container">
        <Tagline>
          Pronto para transformar sua ideia em realidade? Fale diretamente
          comigo no WhatsApp — resposta rápida, sem burocracia.
        </Tagline>

        <WhatsAppButtonWrapper>
          <AvailabilityBadge $isActive={isActive}>
            <span className="dot" />
            Disponível agora
          </AvailabilityBadge>

          <WhatsAppButton
            $isActive={isActive}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar pelo WhatsApp"
          >
            <WhatsAppIconWrapper $isActive={isActive}>
              <span className="ping" aria-hidden="true" />
              {/* WhatsApp SVG icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </WhatsAppIconWrapper>
            Falar pelo WhatsApp
          </WhatsAppButton>

          <PhoneDisplay>+55 48 9 8869-9159</PhoneDisplay>
        </WhatsAppButtonWrapper>
      </Container>
    </ContactWrapper>
  )
}
