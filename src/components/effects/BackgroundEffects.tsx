'use client'

import React from 'react'
import styled, { keyframes, css } from 'styled-components'

// --- Animations ---

const pulse = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    opacity: 1;
  }
`

const rotateSegment = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`

const scanlineAnim = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(10px); }
`

const flickerAnim = keyframes`
  0% { opacity: 0.27861; }
  5% { opacity: 0.34769; }
  10% { opacity: 0.23604; }
  15% { opacity: 0.90626; }
  20% { opacity: 0.18128; }
  25% { opacity: 0.83891; }
  30% { opacity: 0.65583; }
  35% { opacity: 0.67807; }
  40% { opacity: 0.26559; }
  45% { opacity: 0.84693; }
  50% { opacity: 0.96019; }
  55% { opacity: 0.08594; }
  60% { opacity: 0.20313; }
  65% { opacity: 0.71988; }
  70% { opacity: 0.53455; }
  75% { opacity: 0.37288; }
  80% { opacity: 0.71428; }
  85% { opacity: 0.70419; }
  90% { opacity: 0.7003; }
  95% { opacity: 0.36108; }
  100% { opacity: 0.24387; }
`

// --- Components ---

const CircleBgContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200vw;
  height: 200vw;
  pointer-events: none;
  z-index: 0;

  @media (min-width: 1200px) {
    width: 280vw;
    height: 280vw;
    
    &::before, &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      border: 1px solid rgba(255, 69, 0, 0.18);
      box-shadow: 0 0 12px rgba(255, 69, 0, 0.06);
      pointer-events: none;
    }
    &::before { width: 8%; height: 8%; }
    &::after { width: 85%; height: 85%; }
  }

  @media (max-width: 768px) {
    width: 140vw;
    height: 140vw;
  }
`

const CircleRing = styled.div<{ $index: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 1px solid rgba(255, 69, 0, 0.4); /* #ff450066 approx */
  box-shadow: 0 0 20px rgba(255, 69, 0, 0.2), inset 0 0 20px rgba(255, 69, 0, 0.1);
  
  /* Defaults based on index logic from CSS */
  ${props => {
    const i = props.$index
    let size = '100%'
    let delay = '0s'
    let borderColor = 'rgba(255, 69, 0, 0.4)'
    let borderWidth = '1px'

    if (i === 1) { size = '25%'; borderWidth = '2px'; }
    if (i === 2) { size = '40%'; delay = '1s'; borderColor = 'rgba(255, 100, 0, 0.3)'; }
    if (i === 3) { size = '55%'; delay = '2s'; borderColor = 'rgba(255, 69, 0, 0.35)'; }
    if (i === 4) { size = '70%'; delay = '3s'; borderColor = 'rgba(255, 50, 0, 0.25)'; }
    if (i === 5) { size = '85%'; delay = '4s'; borderColor = 'rgba(255, 69, 0, 0.2)'; }
    if (i === 6) { size = '100%'; delay = '5s'; borderColor = 'rgba(255, 69, 0, 0.15)'; }

    return css`
      width: ${size};
      height: ${size};
      animation: ${pulse} 8s ease-in-out infinite ${delay};
      border-color: ${borderColor};
      border-width: ${borderWidth};
    `
  }}

  @media (min-width: 1200px) {
    opacity: 0.95;
    box-shadow: 0 0 28px rgba(255, 69, 0, 0.18), inset 0 0 14px rgba(255, 69, 0, 0.04);
    ${props => {
    const i = props.$index
    let size = '100%'
    if (i === 1) size = '12%'
    if (i === 2) size = '28%'
    if (i === 3) size = '44%'
    if (i === 4) size = '60%'
    if (i === 5) size = '76%'
    if (i === 6) size = '92%'
    return css`width: ${size}; height: ${size}; border-width: 1px;`
  }}
  }

  @media (max-width: 768px) {
    border-color: rgba(255, 69, 0, 0.22);
    border-width: 1px;
    opacity: 0.7;
    
    ${props => {
    const i = props.$index
    let size = '100%'
    if (i === 1) size = '18%'
    if (i === 2) size = '36%'
    if (i === 3) size = '54%'
    if (i === 4) size = '72%'
    // Hide outer rings
    if (i === 5 || i === 6) return css`display: none;`
    return css`width: ${size}; height: ${size};`
  }}
  }
`

const TechSegment = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60%;
  height: 60%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px dashed rgba(255, 69, 0, 0.2);
  animation: ${rotateSegment} 30s linear infinite;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const HexGrid = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255, 69, 0, 0.03) 40px, rgba(255, 69, 0, 0.03) 41px),
    repeating-linear-gradient(60deg, transparent, transparent 40px, rgba(255, 69, 0, 0.03) 40px, rgba(255, 69, 0, 0.03) 41px),
    repeating-linear-gradient(120deg, transparent, transparent 40px, rgba(255, 69, 0, 0.03) 40px, rgba(255, 69, 0, 0.03) 41px);
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;

  @media (max-width: 768px) {
    opacity: 0.12;
  }
`

const Scanlines = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px);
  z-index: 99;
  pointer-events: none;
  animation: ${scanlineAnim} 8s linear infinite;
`

const CrtFlicker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 69, 0, 0.02);
  z-index: 98;
  pointer-events: none;
  animation: ${flickerAnim} 0.15s infinite;
`

export default function BackgroundEffects() {
  return (
    <>
      <HexGrid className="hex-grid" />
      <Scanlines className="scanlines" />
      <CrtFlicker className="crt-flicker" />
    </>
  )
}
