'use client'

import React, { useEffect } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
`

const petroleum = '#003366'
const goldColor = '#D4AF37'
const bg = '#f5f7fa'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  background-color: ${bg};
  color: #1a2238;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;
`

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease;
  background: ${p => p.$scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.85)'};
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding: 1rem 1.5rem;
  box-shadow: ${p => p.$scrolled ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none'};
`

const NavInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon { color: ${petroleum}; font-size: 1.5rem; }

  span {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${petroleum};
    letter-spacing: -0.025em;
  }
`

const NavLinks = styled.div`
  display: none;
  gap: 2rem;

  @media (min-width: 768px) { display: flex; }

  a {
    font-size: 0.875rem;
    font-weight: 500;
    color: #475569;
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: ${petroleum}; }
  }
`

const NavCta = styled.a`
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.5rem;
  background: ${petroleum};
  color: #fff;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0,0,51,0.2);
  cursor: pointer;

  @media (min-width: 768px) { display: inline-flex; }

  &:hover {
    background: rgba(0,51,102,0.9);
    transform: translateY(-1px);
    box-shadow: 0 10px 15px -3px rgba(0,0,51,0.2);
  }
`

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 6rem;
  background: #fff;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    background: rgba(248,250,252,0.5);
    z-index: 0;
  }
`

const HeroInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const HeroLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${fadeUp} 0.8s ease-out 0.1s both;
`

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  width: fit-content;

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${goldColor};
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
    color: #475569;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
`

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  color: ${petroleum};
  line-height: 1.1;
  letter-spacing: -0.025em;
  margin: 0;

  .accent {
    color: ${goldColor};
    font-style: italic;
  }
`

const HeroDesc = styled.p`
  font-size: 1.125rem;
  color: #475569;
  line-height: 1.625;
  max-width: 32rem;
  margin: 0;
`

const HeroBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;

  @media (min-width: 640px) { flex-direction: row; }
`

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: ${petroleum};
  color: #fff;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(0,0,51,0.2);
  cursor: pointer;

  &:hover {
    background: rgba(0,51,102,0.9);
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0,0,51,0.2);
  }
`

const BtnSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: #fff;
  color: ${petroleum};
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  cursor: pointer;

  &:hover {
    background: #f8fafc;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  }
`

const TrustRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding-top: 2rem;
  border-top: 1px solid #f1f5f9;
  margin-top: 1rem;
`

const TrustItem = styled.div`
  .number {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: ${petroleum};
  }

  .stars { color: ${goldColor}; font-size: 0.75rem; margin-bottom: 0.25rem; }

  .label {
    font-size: 0.7rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.25rem;
    display: block;
  }
`

const HeroRight = styled.div`
  position: relative;
  height: 600px;
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  animation: ${fadeUp} 0.8s ease-out 0.3s both;

  @media (max-width: 1024px) { height: 400px; }
`

const HeroHeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const FloatingBadge = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 2rem;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  max-width: 18rem;

  .icon-wrap {
    width: 3rem;
    height: 3rem;
    border-radius: 9999px;
    background: #eff6ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${petroleum};
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .title { font-size: 0.875rem; font-weight: 700; color: ${petroleum}; }
  .sub { font-size: 0.75rem; color: #475569; }
`

const AuthoritySection = styled.section`
  padding: 6rem 1.5rem;
  background: #f8fafc;
`

const AuthorityInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`

const AuthorityImgWrap = styled.div`
  position: relative;

  .img-container {
    aspect-ratio: 4/5;
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    position: relative;
    z-index: 1;

    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .deco1 {
    position: absolute;
    bottom: -1.5rem;
    right: -1.5rem;
    width: 12rem;
    height: 12rem;
    background: rgba(212,175,55,0.1);
    border-radius: 9999px;
    z-index: 0;
  }

  .deco2 {
    position: absolute;
    top: -1.5rem;
    left: -1.5rem;
    width: 8rem;
    height: 8rem;
    background: rgba(0,51,102,0.05);
    border-radius: 9999px;
    z-index: 0;
  }
`

const AuthorityContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${goldColor};
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    color: ${petroleum};
    line-height: 1.2;
    margin: 0;
  }

  .quote {
    font-size: 1.25rem;
    color: #475569;
    font-family: 'Playfair Display', serif;
    font-style: italic;
  }

  p {
    color: #475569;
    line-height: 1.625;
    margin: 0;
  }
`

const AuthorityCards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (max-width: 480px) { grid-template-columns: 1fr; }
`

const AuthorityCard = styled.div`
  background: #fff;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: box-shadow 0.2s;

  &:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 9999px;
    background: #f8fafc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${petroleum};
    flex-shrink: 0;
    font-size: 1rem;
  }

  h4 { font-weight: 700; color: ${petroleum}; font-size: 0.875rem; margin: 0 0 0.25rem; }
  p { font-size: 0.75rem; color: #64748b; margin: 0; }
`

const TreatmentsSection = styled.section`
  padding: 6rem 1.5rem;
  background: #fff;
`

const TreatmentsInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`

const SectionHeader = styled.div`
  text-align: center;
  max-width: 42rem;
  margin: 0 auto 4rem;

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${goldColor};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 700;
    color: ${petroleum};
    margin: 0 0 1rem;
  }

  p { color: #475569; margin: 0; }
`

const TreatmentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`

const TreatmentCard = styled.div`
  background: rgba(248,250,252,0.5);
  border-radius: 2rem;
  padding: 2rem;
  border: 1px solid #f1f5f9;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    background: #fff;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
    border-color: #e2e8f0;

    .icon-wrap {
      background: ${petroleum};
      color: #fff;
    }
  }

  .deco {
    position: absolute;
    top: 0;
    right: 0;
    width: 8rem;
    height: 8rem;
    background: rgba(212,175,55,0.05);
    border-bottom-left-radius: 9999px;
  }

  .icon-wrap {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${petroleum};
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
    transition: all 0.3s;
  }

  h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1.25rem;
    font-weight: 700;
    color: ${petroleum};
    margin: 0 0 0.75rem;
  }

  p {
    color: #475569;
    font-size: 0.875rem;
    line-height: 1.625;
    margin: 0 0 1.5rem;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: ${petroleum};
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: ${goldColor}; }
  }
`

const DifferentialsSection = styled.section`
  padding: 6rem 1.5rem;
  background: ${petroleum};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 800px;
    height: 800px;
    background: rgba(255,255,255,0.05);
    border-radius: 9999px;
    filter: blur(64px);
  }
`

const DifferentialsInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`

const DifferentialsHeader = styled.div`
  text-align: center;
  max-width: 42rem;
  margin: 0 auto 4rem;

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${goldColor};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 0.75rem;
  }

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 2.5rem);
    font-weight: 700;
    color: #fff;
    margin: 0 0 1rem;
  }

  p { color: rgba(255,255,255,0.7); margin: 0; }
`

const DiffGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`

const DiffCard = styled.div`
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  transition: background 0.3s;

  &:hover { background: rgba(255,255,255,0.1); }

  .icon { font-size: 2rem; margin-bottom: 1rem; }

  h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1.125rem;
    color: #fff;
    margin: 0 0 0.75rem;
  }

  p { font-size: 0.875rem; color: rgba(255,255,255,0.6); margin: 0; }
`

const CtaSection = styled.section`
  padding: 6rem 1.5rem;
  background: #fff;
  text-align: center;
`

const CtaInner = styled.div`
  max-width: 48rem;
  margin: 0 auto;

  .label {
    font-size: 0.875rem;
    font-weight: 700;
    color: ${goldColor};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 0.75rem;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.75rem);
    font-weight: 700;
    color: ${petroleum};
    margin: 0 0 1.5rem;
  }

  p {
    color: #475569;
    font-size: 1.125rem;
    margin: 0 0 2.5rem;
  }
`

const CtaBtns = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 640px) { flex-direction: row; justify-content: center; }
`

const FooterEl = styled.footer`
  background: #1a2238;
  color: rgba(255,255,255,0.7);
  padding: 4rem 1.5rem 2rem;
`

const FooterInner = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`

const FooterBrand = styled.div`
  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  p { font-size: 0.875rem; line-height: 1.625; }
`

const FooterColEl = styled.div`
  h4 {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    font-size: 0.875rem;
  }

  a {
    color: rgba(255,255,255,0.6);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: #fff; }
  }
`

const FooterBottomEl = styled.div`
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    margin-left: 1.5rem;

    &:hover { color: rgba(255,255,255,0.8); }
  }
`

export default function OdontoSite() {
  const [scrolled, setScrolled] = React.useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <GlobalStyle />
      <Page>
        <Nav $scrolled={scrolled}>
          <NavInner>
            <NavLogo>
              <span className="icon">🦷</span>
              <span>OdontoPremium</span>
            </NavLogo>
            <NavLinks>
              <a href="#hero">Início</a>
              <a href="#autoridade">A Clínica</a>
              <a href="#tratamentos">Tratamentos</a>
              <a href="#diferenciais">Diferenciais</a>
            </NavLinks>
            <NavCta href="#agendar">Agendar Avaliação</NavCta>
          </NavInner>
        </Nav>

        <HeroSection id="hero">
          <HeroInner>
            <HeroLeft>
              <HeroBadge>
                <span className="dot" />
                <span>Odontologia de Excelência</span>
              </HeroBadge>

              <HeroTitle>
                Seu sorriso merece <span className="accent">cuidado</span> de excelência
              </HeroTitle>

              <HeroDesc>
                Tratamentos odontológicos modernos com tecnologia avançada, conforto e atendimento humanizado.
                Transforme sua autoestima em um ambiente preparado para você.
              </HeroDesc>

              <HeroBtns>
                <BtnPrimary href="#agendar">Agendar avaliação →</BtnPrimary>
                <BtnSecondary href="https://wa.me/5511999999999">💬 Falar no WhatsApp</BtnSecondary>
              </HeroBtns>

              <TrustRow>
                <TrustItem>
                  <span className="number">+500</span>
                  <span className="label">Pacientes Atendidos</span>
                </TrustItem>
                <TrustItem>
                  <div className="stars">★★★★★</div>
                  <span className="number">4.9</span>
                  <span className="label">Avaliação Média</span>
                </TrustItem>
                <TrustItem>
                  <span className="number" style={{ fontSize: '1.25rem' }}>👨‍⚕️</span>
                  <span className="label" style={{ marginTop: '0.25rem' }}>Atendimento Personalizado</span>
                </TrustItem>
              </TrustRow>
            </HeroLeft>

            <HeroRight>
              <HeroHeroImg
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/90951fe011-330cd80caa34c07c9908.png"
                alt="Clínica odontológica moderna"
              />
              <FloatingBadge>
                <div className="icon-wrap">🛡️</div>
                <div>
                  <div className="title">Tecnologia Avançada</div>
                  <div className="sub">Equipamentos de última geração</div>
                </div>
              </FloatingBadge>
            </HeroRight>
          </HeroInner>
        </HeroSection>

        <AuthoritySection id="autoridade">
          <AuthorityInner>
            <AuthorityImgWrap>
              <div className="img-container">
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/b6ff3fb705-4859f503e7b134c78a1b.png"
                  alt="Dr. Alexandre Silva"
                />
              </div>
              <div className="deco1" />
              <div className="deco2" />
            </AuthorityImgWrap>

            <AuthorityContent>
              <span className="label">Sobre o Especialista</span>
              <h3>Dr. Alexandre Silva</h3>
              <p className="quote">
                "Especialista em Implantodontia e Estética Dental, oferecendo excelência clínica aliada à tecnologia."
              </p>
              <p>
                Com mais de uma década dedicada a transformar sorrisos, nosso objetivo é proporcionar não apenas
                tratamentos estéticos, mas devolver a função e a confiança de cada paciente através de um
                planejamento minucioso e atendimento acolhedor.
              </p>

              <AuthorityCards>
                <AuthorityCard>
                  <div className="icon">🏆</div>
                  <div>
                    <h4>15 Anos de Experiência</h4>
                    <p>Prática clínica dedicada</p>
                  </div>
                </AuthorityCard>
                <AuthorityCard>
                  <div className="icon">🎓</div>
                  <div>
                    <h4>Especializações</h4>
                    <p>Implantodontia e Prótese</p>
                  </div>
                </AuthorityCard>
                <AuthorityCard>
                  <div className="icon">📜</div>
                  <div>
                    <h4>Certificações Internacionais</h4>
                    <p>Membro da ITI Suíça</p>
                  </div>
                </AuthorityCard>
                <AuthorityCard>
                  <div className="icon">🪪</div>
                  <div>
                    <h4>Registro Profissional</h4>
                    <p>CRO-SP 12345</p>
                  </div>
                </AuthorityCard>
              </AuthorityCards>
            </AuthorityContent>
          </AuthorityInner>
        </AuthoritySection>

        <TreatmentsSection id="tratamentos">
          <TreatmentsInner>
            <SectionHeader>
              <span className="label">Nossas Especialidades</span>
              <h3>Tratamentos Premium</h3>
              <p>
                Soluções completas e personalizadas para a saúde e estética do seu sorriso,
                utilizando as técnicas mais avançadas da odontologia moderna.
              </p>
            </SectionHeader>

            <TreatmentsGrid>
              {[
                { icon: '🦷', title: 'Implantes Dentários', desc: 'Recupere a função mastigatória e a estética com implantes de titânio de alta tecnologia e coroas em porcelana pura.' },
                { icon: '😁', title: 'Lentes de Contato', desc: 'Facetas ultrafinas de porcelana que corrigem cor, formato e alinhamento, criando um sorriso harmônico e natural.' },
                { icon: '✨', title: 'Ortodontia Invisível', desc: 'Alinhadores transparentes sob medida para corrigir a posição dos dentes com máximo conforto e discrição.' },
                { icon: '💫', title: 'Harmonização Facial', desc: 'Procedimentos estéticos minimamente invasivos para equilibrar as proporções do rosto e realçar sua beleza natural.' },
                { icon: '⭐', title: 'Clareamento Dental', desc: 'Técnicas seguras e eficazes, a laser ou caseiro supervisionado, para devolver a luminosidade e brancura ao seu sorriso.' },
                { icon: '🩺', title: 'Clínica Geral', desc: 'Prevenção, profilaxia, restaurações estéticas e cuidados essenciais para manter a saúde bucal sempre em dia.' },
              ].map((t) => (
                <TreatmentCard key={t.title}>
                  <div className="deco" />
                  <div className="icon-wrap">{t.icon}</div>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                  <a href="#">Saiba mais →</a>
                </TreatmentCard>
              ))}
            </TreatmentsGrid>
          </TreatmentsInner>
        </TreatmentsSection>

        <DifferentialsSection id="diferenciais">
          <DifferentialsInner>
            <DifferentialsHeader>
              <span className="label">Por Que Nos Escolher</span>
              <h3>Diferenciais OdontoPremium</h3>
              <p>Tecnologia, cuidado humanizado e uma equipe altamente especializada a seu serviço.</p>
            </DifferentialsHeader>

            <DiffGrid>
              {[
                { icon: '🔬', title: 'Tecnologia Digital', desc: 'Escâner 3D, tomografia cone beam e planejamento digital para diagnósticos precisos.' },
                { icon: '❤️', title: 'Atendimento Humanizado', desc: 'Cada paciente é único. Seu conforto e bem-estar são nossa prioridade absoluta.' },
                { icon: '🏅', title: 'Especialistas Certificados', desc: 'Equipe com especializações nacionais e internacionais nas mais diversas áreas.' },
                { icon: '🔒', title: 'Biossegurança Total', desc: 'Protocolos rigorosos de esterilização e controle de infecção acima das normas.' },
              ].map((d) => (
                <DiffCard key={d.title}>
                  <div className="icon">{d.icon}</div>
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </DiffCard>
              ))}
            </DiffGrid>
          </DifferentialsInner>
        </DifferentialsSection>

        <CtaSection id="agendar">
          <CtaInner>
            <span className="label">Seu Primeiro Passo</span>
            <h2>Agende sua avaliação gratuita hoje</h2>
            <p>
              Nossa equipe está pronta para receber você e criar um plano de tratamento
              totalmente personalizado para o sorriso que você sempre sonhou.
            </p>
            <CtaBtns>
              <BtnPrimary href="#">Agendar Consulta →</BtnPrimary>
              <BtnSecondary href="https://wa.me/5511999999999">💬 WhatsApp</BtnSecondary>
            </CtaBtns>
          </CtaInner>
        </CtaSection>

        <FooterEl>
          <FooterInner>
            <FooterBrand>
              <div className="logo">🦷 OdontoPremium</div>
              <p>Transformando sorrisos com tecnologia, arte e cuidado humanizado em São Paulo.</p>
            </FooterBrand>

            <FooterColEl>
              <h4>Localização</h4>
              <ul>
                <li>Av. Paulista, 1000 - Bela Vista</li>
                <li>São Paulo - SP, 01310-100</li>
              </ul>
            </FooterColEl>

            <FooterColEl>
              <h4>Contato</h4>
              <ul>
                <li><a href="#">+55 11 99999-9999</a></li>
                <li><a href="#">contato@odontopremium.com</a></li>
              </ul>
            </FooterColEl>

            <FooterColEl>
              <h4>Social</h4>
              <ul>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">YouTube</a></li>
              </ul>
            </FooterColEl>
          </FooterInner>

          <FooterBottomEl>
            <span>© 2026 OdontoPremium. Todos os direitos reservados.</span>
            <div>
              <a href="#">Política de Privacidade</a>
              <a href="#">Termos de Uso</a>
            </div>
          </FooterBottomEl>
        </FooterEl>
      </Page>
    </>
  )
}
