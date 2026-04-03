'use client'

import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

// --- Animations ---

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`;

// --- Styled Components ---

const Container = styled.div`
  background-color: #0f172a;
  color: #f8fafc;
  min-height: 100vh;
  font-family: var(--font-open-sans), sans-serif;
  overflow-x: hidden;
`;

const Nav = styled.nav`
  position: fixed;
  width: 100%;
  z-index: 50;
  background-color: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #1e293b;
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.05em;
  font-family: 'Montserrat', sans-serif;

  .icon {
    color: #a3e635;
    font-size: 2.25rem;
  }

  span {
    color: #a3e635;
  }
`;

const NavLinks = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: baseline;
    gap: 2rem;
  }
`;

const NavLink = styled.a`
  font-weight: 500;
  transition: color 0.15s ease-in-out;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;

  &:hover {
    color: #a3e635;
  }
`;

const BtnPrimary = styled.a`
  background-color: #a3e635;
  color: #0f172a;
  font-weight: 700;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #bef264;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(163, 230, 53, 0.4);
  }
`;

const MobileMenuBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: #9ca3af;
  transition: all 0.2s;

  @media (min-width: 768px) {
    display: none;
  }

  &:hover {
    color: white;
    background-color: #374151;
  }
`;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  background-color: #1e293b;
  width: 100%;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Hero = styled.header`
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9));
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 0 1rem;
  max-width: 64rem;
  margin: 4rem auto 0;

  @media (min-width: 640px) {
    padding: 0 1.5rem;
  }
  @media (min-width: 1024px) {
    padding: 0 2rem;
  }
  animation: ${fadeInUp} 0.8s ease-out;
`;

const Badge = styled.div`
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  border: 1px solid rgba(163, 230, 53, 0.5);
  background-color: rgba(163, 230, 53, 0.1);
  backdrop-filter: blur(4px);
  color: #a3e635;
  font-weight: 600;
  letter-spacing: 0.025em;
  text-transform: uppercase;
  font-size: 0.875rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1.5rem;
  letter-spacing: -0.025em;
  line-height: 1;
  font-family: 'Montserrat', sans-serif;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }

  span {
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(to right, #a3e635, #10b981);
  }
`;

const Description = styled.p`
  margin-top: 1rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 1.25rem;
  color: #cbd5e1;
  margin-bottom: 2.5rem;
`;

const HeroActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const LargeBtn = styled(BtnPrimary)`
  padding: 1rem 2rem;
  font-size: 1.125rem;
  box-shadow: 0 10px 15px -3px rgba(163, 230, 53, 0.2);
`;

const SecondaryBtn = styled.a`
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 700;
  border: 1px solid #475569;
  border-radius: 9999px;
  color: white;
  background-color: rgba(15, 23, 42, 0.5);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;

  &:hover {
    background-color: #1e293b;
    border-color: #64748b;
  }
`;

const StatsStrip = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border-top: 1px solid #1e293b;
  display: none;
  justify-content: space-around;
  padding: 1.5rem 0;
  text-align: center;

  @media (min-width: 768px) {
    display: flex;
  }

  .stat-val {
    display: block;
    font-size: 1.875rem;
    font-weight: 700;
    color: #a3e635;
  }

  .stat-label {
    font-size: 0.875rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const Section = styled.section`
  padding: 6rem 0;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;

  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    font-family: var(--font-montserrat), sans-serif;

    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  }

  .divider {
    width: 6rem;
    height: 0.25rem;
    background-color: #84cc16;
    margin: 0 auto;
    border-radius: 9999px;
  }

  p {
    margin-top: 1rem;
    color: #94a3b8;
    font-size: 1.125rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const FeatureCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  cursor: pointer;
  height: 20rem;

  &:hover img {
    transform: scale(1.1);
  }

  &:hover .content {
    transform: translateY(0);
  }

  &:hover .description {
    opacity: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, #0f172a, rgba(15, 23, 42, 0.4), transparent);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .content {
    transform: translateY(1.5rem);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Montserrat', sans-serif;

    .icon {
      color: #a3e635;
      font-variation-settings: 'FILL' 1;
    }
  }

  .description {
    color: #cbd5e1;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover .content {
    transform: translateY(0);
  }

  &:hover .description {
    opacity: 1;
    transform: translateY(0);
  }

  .icon {
    font-variation-settings: 'FILL' 1;
  }
`;

const ScheduleSection = styled(Section)`
  background-color: #1e293b;
  border-top: 1px solid #334155;
  border-bottom: 1px solid #334155;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  overflow-x: auto;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  max-width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-weight: 700;
  transition: all 0.2s;
  background-color: ${props => props.$active ? '#a3e635' : '#334155'};
  color: ${props => props.$active ? '#0f172a' : '#cbd5e1'};
  white-space: nowrap;

  &:hover {
    background-color: ${props => props.$active ? '#a3e635' : '#475569'};
  }
`;

const ScheduleList = styled.div`
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  gap: 1rem;
`;

const ScheduleItem = styled.div`
  background-color: rgba(51, 65, 85, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #475569;
  transition: border-color 0.2s;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  &:hover {
    border-color: #a3e635;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    width: 100%;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      width: auto;
      margin-bottom: 0;
    }
  }

  .time {
    font-size: 1.25rem;
    font-weight: 700;
    color: #a3e635;
    width: 4rem;
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: white;
  }

  .trainer {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .intensity {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    align-self: flex-end;

    @media (min-width: 768px) {
      align-self: center;
    }
  }

  .high { background-color: rgba(239, 68, 68, 0.2); color: #f87171; }
  .medium { background-color: rgba(234, 179, 8, 0.2); color: #facc15; }
  .low { background-color: rgba(59, 130, 246, 0.2); color: #60a5fa; }
`;

const TrainersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2.5rem;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const TrainerCard = styled.div`
  background-color: #1e293b;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid #334155;
  transition: all 0.3s;

  &:hover {
    border-color: #a3e635;
  }

  .img-container {
    height: 24rem;
    position: relative;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: linear-gradient(to top, #0f172a, transparent);
    padding: 1.5rem;
    padding-top: 5rem;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
  }

  .specialty {
    color: #a3e635;
    font-weight: 500;
  }

  .details {
    padding: 1.5rem;
  }

  p {
    font-size: 0.875rem;
    color: #94a3b8;
    margin-bottom: 1rem;
    font-style: italic;
  }

  .social {
    color: #64748b;
    display: flex;
    gap: 0.5rem;
    
    .icon {
      cursor: pointer;
      &:hover { color: white; }
    }
  }
`;

const CalculatorSection = styled(Section)`
  background-color: #1e293b;
  position: relative;
  overflow: hidden;

  .glow {
    position: absolute;
    top: 0;
    right: 0;
    width: 16rem;
    height: 16rem;
    background-color: rgba(163, 230, 53, 0.1);
    border-radius: 9999px;
    filter: blur(64px);
  }
`;

const CalculatorContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 10;
`;

const CalculatorBox = styled.div`
  background-color: #0f172a;
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #334155;

  @media (min-width: 768px) {
    padding: 3rem;
    flex-direction: row;
  }

  .form-container {
    flex: 1;
    width: 100%;
  }

  .result-container {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(51, 65, 85, 0.5);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid rgba(51, 65, 85, 0.5);
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1rem;
  
  label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #cbd5e1;
    margin-bottom: 0.25rem;
  }

  input {
    width: 100%;
    background-color: #1e293b;
    border: 1px solid #475569;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #a3e635;
    }
  }
`;

const CalculatorBtn = styled.button`
  width: 100%;
  background-color: #a3e635;
  color: #0f172a;
  font-weight: 700;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  transition: all 0.3s;

  &:hover {
    background-color: #bef264;
  }
`;

const BmiCircle = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: 9999px;
  border: 8px solid #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: all 0.5s;
  background-color: #1e293b;

  &.blue { border-color: #60a5fa; color: #60a5fa; }
  &.green { border-color: #4ade80; color: #4ade80; }
  &.yellow { border-color: #facc15; color: #facc15; }
  &.red { border-color: #f87171; color: #f87171; }

  span {
    font-size: 2.25rem;
    font-weight: 700;
    color: inherit;
  }
`;

const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PlanCard = styled.div<{ $featured?: boolean }>`
  background-color: #1e293b;
  border-radius: 1rem;
  padding: 2rem;
  border: ${props => props.$featured ? '2px solid #a3e635' : '1px solid #334155'};
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
  position: relative;
  
  ${props => props.$featured && `
    transform: translateY(-1rem);
    box-shadow: 0 20px 25px -5px rgba(163, 230, 53, 0.1);
  `}

  @media (max-width: 767px) {
    ${props => props.$featured && `
      transform: none;
    `}
  }

  &:hover {
    border-color: ${props => props.$featured ? '#a3e635' : '#64748b'};
  }

  .popular-tag {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #a3e635;
    color: #0f172a;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-bottom-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: white;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 0.875rem;
    color: #94a3b8;
    margin-bottom: 1.5rem;
  }

  .price {
    margin-bottom: 1.5rem;
    
    .val {
      font-size: 2.25rem;
      font-weight: 700;
      color: white;
      transition: opacity 0.2s;
    }
    
    .period {
      color: #64748b;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #cbd5e1;

    .icon {
      color: #a3e635;
      font-size: 1rem;
    }
  }
`;

const PlanBtn = styled.button<{ $featured?: boolean }>`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-weight: 700;
  transition: all 0.2s;
  
  ${props => props.$featured ? `
    background-color: #a3e635;
    color: #0f172a;
    box-shadow: 0 10px 15px -3px rgba(163, 230, 53, 0.25);
    &:hover { background-color: #bef264; }
  ` : `
    background-color: transparent;
    border: 1px solid #a3e635;
    color: #a3e635;
    &:hover { 
      background-color: #a3e635; 
      color: #0f172a;
    }
  `}
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FormPane = styled.div`
  background-color: #1e293b;
  padding: 2.5rem;

  @media (min-width: 768px) {
    padding: 4rem;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1.5rem;
  }

  p {
    color: #94a3b8;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  input {
    width: 100%;
    background-color: #0f172a;
    border: 1px solid #334155;
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    color: white;
    outline: none;

    &:focus {
      border-color: #a3e635;
    }
  }

  .form-footer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #334155;
    display: flex;
    gap: 1.5rem;
    color: #94a3b8;
    
    .item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .icon {
      color: #a3e635;
    }
  }
`;

const MapPane = styled.div`
  background-color: #0f172a;
  min-height: 300px;
  /* Placeholder for map if needed */
`;

const Footer = styled.footer`
  background-color: #020617;
  color: #94a3b8;
  padding: 3rem 0;
  border-top: 1px solid #0f172a;

  .footer-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;

    @media (min-width: 768px) {
      flex-direction: row;
      padding: 0 2rem;
    }
  }

  .copy-right {
    font-size: 0.875rem;
    text-align: center;
    @media (min-width: 768px) {
      text-align: right;
    }
  }
`;

// --- Components and Logic ---

const scheduleData = {
  'seg': [
    { time: '06:00', class: 'Spinning', trainer: 'Roberto', intensity: 'Alta' },
    { time: '07:00', class: 'Yoga', trainer: 'Ana', intensity: 'Baixa' },
    { time: '18:00', class: 'Musculação (Grupo)', trainer: 'Carlos', intensity: 'Média' },
    { time: '19:00', class: 'HIIT', trainer: 'Roberto', intensity: 'Alta' },
    { time: '20:00', class: 'Zumba', trainer: 'Mariana', intensity: 'Média' }
  ],
  'ter': [
    { time: '06:30', class: 'Cross Training', trainer: 'Roberto', intensity: 'Alta' },
    { time: '08:00', class: 'Pilates', trainer: 'Ana', intensity: 'Baixa' },
    { time: '18:30', class: 'Boxe', trainer: 'Paulo', intensity: 'Alta' },
    { time: '19:30', class: 'Spinning', trainer: 'Mariana', intensity: 'Alta' }
  ],
  'qua': [
    { time: '06:00', class: 'Yoga Flow', trainer: 'Ana', intensity: 'Baixa' },
    { time: '07:00', class: 'Funcional', trainer: 'Carlos', intensity: 'Média' },
    { time: '18:00', class: 'HIIT Extreme', trainer: 'Roberto', intensity: 'Alta' },
    { time: '19:00', class: 'Gap', trainer: 'Mariana', intensity: 'Média' }
  ],
  'qui': [
    { time: '06:30', class: 'Boxe', trainer: 'Paulo', intensity: 'Alta' },
    { time: '08:00', class: 'Alongamento', trainer: 'Ana', intensity: 'Baixa' },
    { time: '18:30', class: 'Cross Training', trainer: 'Roberto', intensity: 'Alta' },
    { time: '20:00', class: 'Fit Dance', trainer: 'Mariana', intensity: 'Média' }
  ],
  'sex': [
    { time: '06:00', class: 'Spinning', trainer: 'Mariana', intensity: 'Alta' },
    { time: '17:00', class: 'Happy Hour Yoga', trainer: 'Ana', intensity: 'Baixa' },
    { time: '18:00', class: 'Circuito', trainer: 'Carlos', intensity: 'Alta' }
  ]
};

export default function NexusPage() {
  const [activeTab, setActiveTab] = useState('seg');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isYearly, setIsYearly] = useState(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmiResult, setBmiResult] = useState({ value: '--', status: 'Seu Resultado', advice: 'Preencha os dados ao lado.', color: '' });

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (!h || !w) {
      alert("Por favor, preencha altura e peso.");
      return;
    }

    const bmi = (w / (h * h)).toFixed(1);
    const bmiVal = parseFloat(bmi);

    let status = "";
    let advice = "";
    let color = "";

    if (bmiVal < 18.5) {
      status = "Abaixo do Peso";
      color = "blue";
      advice = "Foco em nutrição e ganho de massa muscular (Hipertrofia).";
    } else if (bmiVal < 24.9) {
      status = "Peso Normal";
      color = "green";
      advice = "Mantenha o ritmo! Explore Cross Training ou Yoga.";
    } else if (bmiVal < 29.9) {
      status = "Sobrepeso";
      color = "yellow";
      advice = "Que tal HIIT e Cardio para queimar calorias?";
    } else {
      status = "Obesidade";
      color = "red";
      advice = "Nossos treinadores podem criar um plano seguro para você.";
    }

    setBmiResult({ value: bmi, status, advice, color });
  };

  return (
    <Container>
      <Nav>
        <NavContainer>
          <Logo>
            <span className="material-symbols-outlined icon">fitness_center</span>
            NEXUS<span>FIT</span>
          </Logo>
          <NavLinks>
            <NavLink href="#modalidades">Modalidades</NavLink>
            <NavLink href="#schedule">Horários</NavLink>
            <NavLink href="#trainers">Treinadores</NavLink>
            <NavLink href="#calculator">IMC</NavLink>
            <NavLink href="#plans">Planos</NavLink>
            <BtnPrimary href="#contact" as="a">Matricule-se</BtnPrimary>
          </NavLinks>
          <MobileMenuBtn onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined">menu</span>
          </MobileMenuBtn>
        </NavContainer>
        <MobileMenu $isOpen={isMenuOpen}>
          <div style={{ padding: '0.5rem 0.5rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <NavLink href="#modalidades" onClick={() => setIsMenuOpen(false)}>Modalidades</NavLink>
            <NavLink href="#schedule" onClick={() => setIsMenuOpen(false)}>Horários</NavLink>
            <NavLink href="#trainers" onClick={() => setIsMenuOpen(false)}>Treinadores</NavLink>
            <NavLink href="#plans" onClick={() => setIsMenuOpen(false)}>Planos</NavLink>
            <NavLink href="#contact" style={{ color: '#a3e635', fontWeight: 'bold' }} onClick={() => setIsMenuOpen(false)}>Matricule-se Agora</NavLink>
          </div>
        </MobileMenu>
      </Nav>

      <Hero>
        <HeroBg>
          <img src="/assets/nexus/hero.png" alt="Gym Background" />
          <div className="gradient"></div>
        </HeroBg>
        <HeroContent>
          <Badge>A Revolução Fitness Chegou</Badge>
          <Title>
            SUPERE SEUS <br />
            <span>LIMITES</span>
          </Title>
          <Description>
            Equipamentos de ponta, treinadores de elite e uma comunidade que te impulsiona. Sua melhor versão começa aqui na Nexus Fit.
          </Description>
          <HeroActions>
            <LargeBtn href="#plans">Começar Agora</LargeBtn>
            <SecondaryBtn href="#modalidades">Explorar Aulas</SecondaryBtn>
          </HeroActions>
        </HeroContent>
        <StatsStrip>
          <div>
            <span className="stat-val">2000+</span>
            <span className="stat-label">m² de Espaço</span>
          </div>
          <div>
            <span className="stat-val">50+</span>
            <span className="stat-label">Equipamentos Pro</span>
          </div>
          <div>
            <span className="stat-val">30+</span>
            <span className="stat-label">Aulas Semanais</span>
          </div>
          <div>
            <span className="stat-val">24h</span>
            <span className="stat-label">Acesso Total</span>
          </div>
        </StatsStrip>
      </Hero>

      <Section id="modalidades">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <SectionHeader>
            <h2>Modalidades Premium</h2>
            <div className="divider"></div>
            <p>Escolha como você quer suar hoje.</p>
          </SectionHeader>
          <FeaturesGrid>
            {[
              { title: 'Musculação', img: 'feature_musculacao.png', icon: 'fitness_center', desc: 'Área completa com pesos livres e máquinas de última geração para hipertrofia e força.' },
              { title: 'Yoga & Pilates', img: 'feature_yoga.png', icon: 'self_improvement', desc: 'Conecte corpo e mente em nossas aulas focadas em flexibilidade, core e respiração.' },
              { title: 'Cross Training', img: 'feature_cross.png', icon: 'bolt', desc: 'Treinos funcionais de alta intensidade para queimar calorias e desafiar seus limites.' },
              { title: 'Boxe', img: 'feature_boxe.png', icon: 'sports_mma', desc: 'Aprenda técnicas de combate e melhore seu condicionamento cardiovascular.' },
              { title: 'Cardio Zone', img: 'feature_cardio.png', icon: 'directions_run', desc: 'Esteiras, elípticos e bikes com tecnologia integrada para monitorar seu desempenho.' },
              { title: 'Spinning', img: 'feature_spinning.png', icon: 'pedal_bike', desc: 'Pedale ao ritmo da música em uma experiência imersiva e motivadora.' },
            ].map((f, i) => (
              <FeatureCard key={i}>
                <img src={`/assets/nexus/${f.img}`} alt={f.title} />
                <div className="overlay">
                  <div className="content">
                    <h3><span className="material-symbols-outlined icon">{f.icon}</span> {f.title}</h3>
                    <p className="description">{f.desc}</p>
                  </div>
                </div>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>
      </Section>

      <ScheduleSection id="schedule">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <SectionHeader>
            <h2>Horário das Aulas</h2>
          </SectionHeader>
          <TabsContainer>
            {['seg', 'ter', 'qua', 'qui', 'sex'].map(day => (
              <TabButton
                key={day}
                $active={activeTab === day}
                onClick={() => setActiveTab(day)}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}da
              </TabButton>
            ))}
          </TabsContainer>
          <ScheduleList>
            {scheduleData[activeTab as keyof typeof scheduleData]?.map((c, i) => (
              <ScheduleItem key={i}>
                <div className="info">
                  <span className="time">{c.time}</span>
                  <div>
                    <h4>{c.class}</h4>
                    <p className="trainer">Prof. {c.trainer}</p>
                  </div>
                </div>
                <span className={`intensity ${c.intensity === 'Alta' ? 'high' : c.intensity === 'Baixa' ? 'low' : 'medium'}`}>
                  Intensidade: {c.intensity}
                </span>
              </ScheduleItem>
            ))}
          </ScheduleList>
        </div>
      </ScheduleSection>

      <Section id="trainers">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <SectionHeader>
            <h2>Conheça Seus Treinadores</h2>
          </SectionHeader>
          <TrainersGrid>
            {[
              { name: 'Carlos Mendes', role: 'Espec. Hipertrofia', img: 'carlos.png', quote: '"O único treino ruim é aquele que não aconteceu."' },
              { name: 'Ana Souza', role: 'Yoga & Funcional', img: 'ana.png', quote: '"Equilíbrio é a chave para uma vida longa e saudável."' },
              { name: 'Roberto Silva', role: 'Cross Training', img: 'roberto.png', quote: '"Se não te desafia, não te transforma. Vamos lá!"' },
            ].map((t, i) => (
              <TrainerCard key={i}>
                <div className="img-container">
                  <img src={`/assets/nexus/${t.img}`} alt={t.name} />
                  <div className="overlay">
                    <h3>{t.name}</h3>
                    <span className="specialty">{t.role}</span>
                  </div>
                </div>
                <div className="details">
                  <p>{t.quote}</p>
                  <div className="social">
                    <span className="material-symbols-outlined icon">alternate_email</span>
                  </div>
                </div>
              </TrainerCard>
            ))}
          </TrainersGrid>
        </div>
      </Section>

      <CalculatorSection id="calculator">
        <div className="glow"></div>
        <CalculatorContainer>
          <CalculatorBox>
            <div className="form-container">
              <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Calculadora de IMC</h2>
              <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Descubra seu Índice de Massa Corporal e veja qual plano de treino se adapta melhor aos seus objetivos.</p>
              <InputGroup>
                <label>Altura (cm)</label>
                <input type="number" placeholder="Ex: 175" value={height} onChange={e => setHeight(e.target.value)} />
              </InputGroup>
              <InputGroup>
                <label>Peso (kg)</label>
                <input type="number" placeholder="Ex: 70" value={weight} onChange={e => setWeight(e.target.value)} />
              </InputGroup>
              <CalculatorBtn onClick={calculateBMI}>Calcular Agora</CalculatorBtn>
            </div>
            <div className="result-container">
              <BmiCircle className={bmiResult.color}>
                <span>{bmiResult.value}</span>
              </BmiCircle>
              <p style={{ fontSize: '1.25rem', fontWeight: '600', color: 'white' }}>{bmiResult.status}</p>
              <p style={{ fontSize: '0.875rem', textAlign: 'center', color: '#94a3b8', marginTop: '0.5rem' }}>{bmiResult.advice}</p>
            </div>
          </CalculatorBox>
        </CalculatorContainer>
      </CalculatorSection>

      <Section id="plans">
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
          <SectionHeader>
            <h2>Planos Flexíveis</h2>
            <p>Sem taxas de cancelamento. Mude quando quiser.</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem', gap: '1rem' }}>
              <span style={{ color: '#cbd5e1', fontWeight: '500' }}>Mensal</span>
              <div
                onClick={() => setIsYearly(!isYearly)}
                style={{ width: '3.5rem', height: '1.75rem', backgroundColor: '#334155', borderRadius: '9999px', position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s' }}
                className={isYearly ? 'bg-lime-500' : ''}
              >
                <div style={{
                  width: '1.5rem',
                  height: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '9999px',
                  position: 'absolute',
                  top: '0.125rem',
                  left: isYearly ? '1.875rem' : '0.125rem',
                  transition: 'all 0.2s'
                }}></div>
              </div>
              <span style={{ color: 'white', fontWeight: 'bold' }}>Anual <span style={{ fontSize: '0.75rem', color: '#a3e635', marginLeft: '0.25rem' }}>-20% OFF</span></span>
            </div>
          </SectionHeader>
          <PlansGrid>
            <PlanCard>
              <h3>Essential</h3>
              <p className="subtitle">Para quem está começando.</p>
              <div className="price">
                <span className="val">{isYearly ? 'R$ 70' : 'R$ 89'}</span>
                <span className="period">/mês</span>
              </div>
              <ul>
                <li><span className="material-symbols-outlined icon">check</span> Acesso à musculação</li>
                <li><span className="material-symbols-outlined icon">check</span> Acesso Cardio</li>
                <li><span className="material-symbols-outlined icon">check</span> Vestiários</li>
              </ul>
              <PlanBtn>Escolher Essential</PlanBtn>
            </PlanCard>

            <PlanCard $featured>
              <div className="popular-tag">POPULAR</div>
              <h3>Performance</h3>
              <p className="subtitle">O melhor custo-benefício.</p>
              <div className="price">
                <span className="val">{isYearly ? 'R$ 99' : 'R$ 129'}</span>
                <span className="period">/mês</span>
              </div>
              <ul>
                <li><span className="material-symbols-outlined icon">check_circle</span> Tudo do Essential</li>
                <li><span className="material-symbols-outlined icon">check_circle</span> Aulas Coletivas (Yoga, Zumba)</li>
                <li><span className="material-symbols-outlined icon">check_circle</span> App de Treino</li>
                <li><span className="material-symbols-outlined icon">check_circle</span> Direito a 1 convidado/mês</li>
              </ul>
              <PlanBtn $featured>Escolher Performance</PlanBtn>
            </PlanCard>

            <PlanCard>
              <h3>Ultimate</h3>
              <p className="subtitle">Resultados acelerados.</p>
              <div className="price">
                <span className="val">{isYearly ? 'R$ 159' : 'R$ 199'}</span>
                <span className="period">/mês</span>
              </div>
              <ul>
                <li><span className="material-symbols-outlined icon">check</span> Tudo do Performance</li>
                <li><span className="material-symbols-outlined icon">check</span> Acompanhamento Nutricional</li>
                <li><span className="material-symbols-outlined icon">check</span> Bioimpedância mensal</li>
                <li><span className="material-symbols-outlined icon">check</span> Kit Exclusivo Nexus</li>
              </ul>
              <PlanBtn>Escolher Ultimate</PlanBtn>
            </PlanCard>
          </PlansGrid>
        </div>
      </Section>

      <div id="contact">
        <ContactGrid>
          <FormPane>
            <h2>Comece Sua Jornada</h2>
            <p>Preencha o formulário e ganhe 3 dias de acesso grátis (Free Pass) para conhecer a Nexus Fit.</p>
            <form onSubmit={e => { e.preventDefault(); alert('Obrigado! Entraremos em contato em breve.'); }}>
              <input type="text" placeholder="Seu Nome" required />
              <input type="email" placeholder="Seu Email" required />
              <input type="tel" placeholder="WhatsApp" />
              <CalculatorBtn type="submit" style={{ padding: '1rem' }}>Garantir Free Pass</CalculatorBtn>
            </form>
            <div className="form-footer">
              <div className="item">
                <span className="material-symbols-outlined icon">phone</span> (11) 99999-0000
              </div>
              <div className="item">
                <span className="material-symbols-outlined icon">location_on</span> Av. Paulista, 1000
              </div>
            </div>
          </FormPane>
          <MapPane />
        </ContactGrid>
      </div>

      <Footer>
        <div className="footer-container">
          <Logo style={{ fontSize: '1.25rem' }}>
            <span className="material-symbols-outlined icon" style={{ fontSize: '1.5rem' }}>fitness_center</span>
            NEXUS<span>FIT</span>
          </Logo>
          <div className="copy-right">
            <p>© 2023 Nexus Fitness. Todos os direitos reservados.</p>
            <p style={{ marginTop: '0.25rem', color: '#475569' }}>Imagens meramente ilustrativas.</p>
          </div>
        </div>
      </Footer>
    </Container>
  )
}
