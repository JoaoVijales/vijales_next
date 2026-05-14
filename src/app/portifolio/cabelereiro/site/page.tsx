'use client'

import React, { useEffect } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
`

const nude = '#F5F2EE'
const dark = '#232323'
const gold = '#9F824C'
const beige = '#C6A27B'
const rosegold = '#D1BEA8'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const Page = styled.div`
  background-color: ${nude};
  color: ${dark};
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  scroll-behavior: smooth;
`

const Header = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  width: 100%;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${p => p.$scrolled ? '0.75rem 3rem' : '1.25rem 3rem'};
  background: rgba(245,242,238,0.9);
  backdrop-filter: blur(12px);
  border-bottom: ${p => p.$scrolled ? `1px solid rgba(35,35,35,0.1)` : 'none'};
  transition: all 0.4s ease;

  @media (max-width: 768px) { padding: 1rem 1.5rem; }
`

const Logo = styled.a`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: ${dark};
  text-decoration: none;
`

const Nav = styled.nav`
  display: none;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: 768px) { display: flex; }

  a {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 500;
    text-decoration: none;
    color: ${dark};
    transition: color 0.2s;

    &:hover { color: ${gold}; }
  }
`

const HeaderCta = styled.a`
  display: none;
  padding: 0.75rem 2rem;
  background: ${dark};
  color: ${nude};
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s;
  cursor: pointer;

  @media (min-width: 768px) { display: inline-block; }

  &:hover { background: ${gold}; }
`

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  padding-top: 8rem;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-top: 6rem;
  }
`

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 1024px) { grid-template-columns: 1fr; }
`

const HeroLeft = styled.div`
  z-index: 1;
  animation: ${fadeUp} 0.8s ease-out 0.1s both;

  .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${gold};
    display: block;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 7vw, 5.5rem);
    line-height: 1.1;
    color: ${dark};
    margin: 0 0 2rem;

    .accent {
      color: ${gold};
      font-style: italic;
    }
  }

  p {
    font-size: 1.125rem;
    color: rgba(35,35,35,0.7);
    font-weight: 300;
    max-width: 36rem;
    line-height: 1.625;
    margin-bottom: 3rem;
  }
`

const HeroCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: ${dark};
  color: ${nude};
  padding: 1.25rem 2.5rem;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;

  .arrow { transition: transform 0.3s; }
  &:hover { background: ${gold}; }
  &:hover .arrow { transform: translateX(0.5rem); }
`

const HeroRight = styled.div`
  position: relative;
  height: 736px;
  animation: ${fadeUp} 0.8s ease-out 0.3s both;

  @media (max-width: 768px) { height: 400px; }

  .offset-bg {
    position: absolute;
    inset: 0;
    background: rgba(209,190,168,0.2);
    transform: translate(1rem, 1rem);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: 1;
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  }
`

const HeroDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(35,35,35,0.1);
  margin-top: 6rem;
`

const AboutSection = styled.section`
  padding: 6rem 3rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 768px) { padding: 4rem 1.5rem; }
`

const AboutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`

const AboutImgWrap = styled.div`
  position: relative;
  height: 500px;
  max-width: 28rem;
  margin: 0 auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1);
    transition: filter 0.7s;

    &:hover { filter: grayscale(0); }
  }
`

const AboutContent = styled.div`
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.2;
    color: ${dark};
    margin: 0 0 2rem;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    color: rgba(35,35,35,0.8);
    font-weight: 300;
    font-size: 1.125rem;
    line-height: 1.625;
    margin-bottom: 3rem;
  }
`

const AboutStats = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(35,35,35,0.1);

  .divider {
    width: 1px;
    height: 3rem;
    background: rgba(35,35,35,0.1);
  }

  .number {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 1.875rem;
    color: ${gold};
    margin-bottom: 0.5rem;
  }

  .label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: rgba(35,35,35,0.6);
  }
`

const ServicesSection = styled.section`
  padding: 8rem 3rem;
  background: #F0EDE8;

  @media (max-width: 768px) { padding: 4rem 1.5rem; }
`

const ServicesInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const ServicesSectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;

  .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${gold};
    display: block;
    margin-bottom: 1rem;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    color: ${dark};
    margin: 0;
  }
`

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`

const ServiceCard = styled.div`
  background: ${nude};
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.5s;

  &:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.05); }
  &:hover .service-img { transform: scale(1.05); }
  &:hover .cta-text { opacity: 1; }
`

const ServiceImgWrap = styled.div`
  height: 16rem;
  margin-bottom: 1.5rem;
  overflow: hidden;
  position: relative;
`

const ServiceImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
`

const ServiceOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(35,35,35,0.2);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s;

  ${ServiceCard}:hover & { opacity: 1; }

  span {
    background: ${nude};
    padding: 0.5rem 1.5rem;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`

const ServiceMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;

  h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    color: ${dark};
    margin: 0;
  }

  .price {
    font-size: 0.875rem;
    font-weight: 300;
    color: ${gold};
    white-space: nowrap;
  }
`

const ServiceDesc = styled.p`
  font-size: 0.875rem;
  color: rgba(35,35,35,0.7);
  font-weight: 300;
  margin-bottom: 1rem;
  line-height: 1.625;
`

const ServiceTime = styled.div`
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(35,35,35,0.5);
`

const ServicesFooter = styled.div`
  margin-top: 4rem;
  text-align: center;

  a {
    display: inline-block;
    border-bottom: 1px solid ${dark};
    padding-bottom: 0.25rem;
    font-size: 0.875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    color: ${dark};
    transition: all 0.2s;
    cursor: pointer;

    &:hover { color: ${gold}; border-color: ${gold}; }
  }
`

const DiffSection = styled.section`
  padding: 8rem 3rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 768px) { padding: 4rem 1.5rem; }
`

const DiffBanner = styled.div`
  background: ${dark};
  color: ${nude};
  padding: 3rem 6rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 2rem;
  }
`

const DiffContent = styled.div`
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.875rem, 4vw, 3rem);
    margin: 0 0 2rem;
  }

  p {
    color: rgba(245,242,238,0.7);
    font-weight: 300;
    font-size: 1.125rem;
    line-height: 1.625;
    margin-bottom: 3rem;
  }
`

const DiffList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;

    .check { color: ${gold}; margin-top: 0.25rem; font-size: 0.875rem; }

    h4 {
      font-family: 'Playfair Display', serif;
      font-size: 1.25rem;
      margin: 0 0 0.25rem;
    }

    p {
      font-size: 0.875rem;
      color: rgba(245,242,238,0.6);
      font-weight: 300;
      margin: 0;
      line-height: 1.5;
    }
  }
`

const DiffImg = styled.div`
  height: 600px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 768px) { height: 300px; }
`

const CtaSection = styled.section`
  padding: 8rem 1.5rem;
  border-top: 1px solid rgba(35,35,35,0.1);
  text-align: center;
  max-width: 56rem;
  margin: 0 auto;

  .eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${gold};
    display: block;
    margin-bottom: 1.5rem;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 6vw, 4rem);
    color: ${dark};
    margin: 0 0 2rem;
  }

  p {
    color: rgba(35,35,35,0.7);
    font-weight: 300;
    font-size: 1.125rem;
    margin-bottom: 3rem;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
  }
`

const CtaBtnEl = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  background: ${dark};
  color: ${nude};
  padding: 1.5rem 3rem;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;

  &:hover { background: ${gold}; }
`

const FooterEl = styled.footer`
  border-top: 1px solid rgba(35,35,35,0.2);
  padding-top: 5rem;
  padding-bottom: 2.5rem;
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
`

const FooterBrandEl = styled.div`
  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: ${dark};
    display: block;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 0.875rem;
    color: rgba(35,35,35,0.6);
    font-weight: 300;
    line-height: 1.625;
    max-width: 20rem;
  }
`

const FooterColEl = styled.div`
  h4 {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 0.875rem;
    color: rgba(35,35,35,0.7);
    font-weight: 300;
    line-height: 1.625;
  }

  a {
    color: rgba(35,35,35,0.7);
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: ${dark}; }
  }

  .hours-row {
    display: flex;
    justify-content: space-between;

    .closed { color: ${gold}; font-style: italic; }
  }
`

const FooterSocial = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 0;

  a {
    color: rgba(35,35,35,0.6);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s;

    &:hover { color: ${dark}; }
  }
`

const FooterBottomEl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(35,35,35,0.1);
  padding-top: 2rem;
  font-size: 0.75rem;
  color: rgba(35,35,35,0.5);
  letter-spacing: 0.05em;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  a {
    color: rgba(35,35,35,0.5);
    text-decoration: none;
    margin-left: 1.5rem;
    transition: color 0.2s;

    &:hover { color: ${dark}; }
  }
`

export default function CabelereircoSite() {
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
        <Header $scrolled={scrolled}>
          <Logo href="#">MAISON ÉCLAT</Logo>
          <Nav>
            <a href="#sobre">Sobre</a>
            <a href="#servicos">Serviços</a>
            <a href="#galeria">Galeria</a>
            <a href="#experiencia">Experiência</a>
          </Nav>
          <HeaderCta href="#agendar">Agendar</HeaderCta>
        </Header>

        <HeroSection>
          <HeroGrid>
            <HeroLeft>
              <span className="eyebrow">(SUA NOVA VERSÃO)</span>
              <h1>
                A arte de revelar<br />
                <span className="accent">sua verdadeira</span><br />
                essência.
              </h1>
              <p>
                Muito mais que um salão de beleza. Um refúgio de luxo em São Paulo dedicado
                a transformar sua autoestima com técnicas exclusivas e atendimento impecável.
              </p>
              <HeroCta href="#agendar">
                Agendar Experiência
                <span className="arrow">→</span>
              </HeroCta>
            </HeroLeft>

            <HeroRight>
              <div className="offset-bg" />
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/480ee7895b-7f80c1b41f88850f56c4.png"
                alt="Interior luxuoso do salão Maison Éclat"
              />
            </HeroRight>
          </HeroGrid>

          <HeroDivider />
        </HeroSection>

        <AboutSection id="sobre">
          <AboutGrid>
            <AboutImgWrap>
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/8b9ee37f81-14bf61dc7e051a2c271c.png"
                alt="Retrato editorial de cliente"
              />
            </AboutImgWrap>

            <AboutContent>
              <h2>Elegância que<br />vem de dentro.</h2>
              <div className="body">
                <p>
                  Na Maison Éclat, acreditamos que a beleza é uma forma de expressão pessoal profunda.
                  Nosso espaço foi meticulosamente desenhado para ser um santuário de cuidado e renovação.
                </p>
                <p>
                  Nossa equipe de especialistas não apenas domina as técnicas mais avançadas do mundo
                  da beleza, mas possui a sensibilidade de entender o que torna você única. Cada mecha,
                  cada corte, cada tratamento é uma obra de arte personalizada.
                </p>
                <p>
                  Permita-se vivenciar um momento de pausa, onde o luxo encontra o bem-estar, e saia
                  não apenas mais bonita, mas profundamente confiante.
                </p>
              </div>

              <AboutStats>
                <div>
                  <span className="number">10+</span>
                  <span className="label">Anos de Excelência</span>
                </div>
                <div className="divider" />
                <div>
                  <span className="number">5k+</span>
                  <span className="label">Transformações</span>
                </div>
              </AboutStats>
            </AboutContent>
          </AboutGrid>
        </AboutSection>

        <ServicesSection id="servicos">
          <ServicesInner>
            <ServicesSectionHeader>
              <span className="eyebrow">Nosso Menu</span>
              <h2>Serviços Assinatura</h2>
            </ServicesSectionHeader>

            <ServicesGrid>
              <ServiceCard>
                <ServiceImgWrap>
                  <ServiceImg
                    className="service-img"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/011c0c9acf-36cdf36bf2f1446888fd.png"
                    alt="Corte Visagista"
                  />
                  <ServiceOverlay>
                    <span>Agendar</span>
                  </ServiceOverlay>
                </ServiceImgWrap>
                <ServiceMeta>
                  <h3>Corte Visagista</h3>
                  <span className="price">a partir de R$ 350</span>
                </ServiceMeta>
                <ServiceDesc>
                  Um estudo completo do seu rosto para criar um corte que realça seus melhores
                  traços e reflete sua personalidade.
                </ServiceDesc>
                <ServiceTime>⏱ 60 min</ServiceTime>
              </ServiceCard>

              <ServiceCard>
                <ServiceImgWrap>
                  <ServiceImg
                    className="service-img"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/fd51f7407e-e83302ca1ca3e63b3af6.png"
                    alt="Illuminage Color"
                  />
                  <ServiceOverlay>
                    <span>Agendar</span>
                  </ServiceOverlay>
                </ServiceImgWrap>
                <ServiceMeta>
                  <h3>Illuminage Color</h3>
                  <span className="price">a partir de R$ 890</span>
                </ServiceMeta>
                <ServiceDesc>
                  Nossa técnica exclusiva de mechas que cria pontos de luz estratégicos,
                  entregando um resultado natural e sofisticado.
                </ServiceDesc>
                <ServiceTime>⏱ 240 min</ServiceTime>
              </ServiceCard>

              <ServiceCard>
                <ServiceImgWrap>
                  <ServiceImg
                    className="service-img"
                    src="https://storage.googleapis.com/uxpilot-auth.appspot.com/56d83e7a7c-8a6dd4be8f190b1e9958.png"
                    alt="Spa Capilar"
                  />
                  <ServiceOverlay>
                    <span>Agendar</span>
                  </ServiceOverlay>
                </ServiceImgWrap>
                <ServiceMeta>
                  <h3>Spa Capilar</h3>
                  <span className="price">a partir de R$ 450</span>
                </ServiceMeta>
                <ServiceDesc>
                  Um ritual completo de reconstrução e nutrição profunda usando produtos da
                  mais alta tecnologia mundial.
                </ServiceDesc>
                <ServiceTime>⏱ 90 min</ServiceTime>
              </ServiceCard>
            </ServicesGrid>

            <ServicesFooter>
              <a href="#">Ver Menu Completo de Serviços →</a>
            </ServicesFooter>
          </ServicesInner>
        </ServicesSection>

        <DiffSection id="galeria">
          <DiffBanner>
            <DiffContent>
              <h2>A Diferença Éclat</h2>
              <p>
                Não vendemos apenas serviços de beleza. Entregamos uma experiência sensorial completa,
                onde cada detalhe foi pensado para o seu conforto absoluto.
              </p>

              <DiffList>
                <li>
                  <span className="check">✓</span>
                  <div>
                    <h4>Diagnóstico Preciso</h4>
                    <p>Análise minuciosa do seu fio e couro cabeludo antes de qualquer procedimento.</p>
                  </div>
                </li>
                <li>
                  <span className="check">✓</span>
                  <div>
                    <h4>Marcas Globais</h4>
                    <p>Trabalhamos exclusivamente com Kérastase, L&apos;Oréal Professionnel e Wella.</p>
                  </div>
                </li>
                <li>
                  <span className="check">✓</span>
                  <div>
                    <h4>Ambiente Privativo</h4>
                    <p>Espaços desenhados para garantir sua privacidade e relaxamento total.</p>
                  </div>
                </li>
              </DiffList>
            </DiffContent>

            <DiffImg>
              <img
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/f488c82757-80a3c47a90092a43cfa6.png"
                alt="Área de lavagem do salão"
              />
            </DiffImg>
          </DiffBanner>
        </DiffSection>

        <CtaSection id="agendar">
          <span className="eyebrow">Seu Momento</span>
          <h2>Pronta para revelar<br />sua melhor versão?</h2>
          <p>
            Nossa agenda é exclusiva e as vagas são limitadas para garantir o padrão de excelência
            em cada atendimento. Fale com nossa concierge agora.
          </p>
          <CtaBtnEl href="https://wa.me/5511999999999">
            Falar com Concierge 💬
          </CtaBtnEl>
        </CtaSection>

        <FooterEl id="experiencia">
          <FooterGrid>
            <FooterBrandEl>
              <span className="logo">MAISON ÉCLAT</span>
              <p>
                O destino definitivo para mulheres que buscam sofisticação, técnica impecável
                e uma experiência de beleza inesquecível.
              </p>
            </FooterBrandEl>

            <FooterColEl>
              <h4>Contato</h4>
              <ul>
                <li>Rua Oscar Freire, 1000 - Jardins</li>
                <li>São Paulo - SP, 01426-000</li>
                <li>+55 11 99999-9999</li>
                <li><a href="#">concierge@maisoneclat.com</a></li>
              </ul>
            </FooterColEl>

            <FooterColEl>
              <h4>Horários</h4>
              <ul>
                <li className="hours-row"><span>Ter - Sex:</span><span>09:00 - 20:00</span></li>
                <li className="hours-row"><span>Sábado:</span><span>08:00 - 19:00</span></li>
                <li className="hours-row"><span>Dom - Seg:</span><span className="closed">Fechado</span></li>
              </ul>
            </FooterColEl>

            <FooterColEl>
              <h4>Social</h4>
              <FooterSocial>
                <a href="#">Instagram</a>
                <a href="#">TikTok</a>
                <a href="#">Pinterest</a>
              </FooterSocial>
            </FooterColEl>
          </FooterGrid>

          <FooterBottomEl>
            <p>© 2026 Maison Éclat. Todos os direitos reservados.</p>
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
