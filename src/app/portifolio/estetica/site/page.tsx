'use client'

import React, { useEffect, useRef } from 'react'
import styled, { createGlobalStyle, keyframes } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
`

const nude = '#F5F2EE'
const dark = '#232323'
const gold = '#9F824C'
const beige = '#C6A27B'
const rosegold = '#D1BEA8'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`

const scaleIn = keyframes`
  from { transform: scale(1.05); }
  to { transform: scale(1); }
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
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${p => p.$scrolled ? '0.5rem 3rem' : '1rem 3rem'};
  background: rgba(245, 242, 238, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: ${p => p.$scrolled ? `1px solid rgba(35,35,35,0.1)` : 'none'};
  transition: all 0.4s ease;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }
`

const Logo = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1em;
`

const Nav = styled.nav`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }

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
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background: ${dark};
  color: #fff;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 9999px;
  text-decoration: none;
  transition: background 0.3s;
  cursor: pointer;

  &:hover { background: ${gold}; }

  @media (max-width: 768px) {
    display: none;
  }
`

const Hero = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.05) translateY(-5%);
  opacity: 0.9;
  animation: ${scaleIn} 1.2s ease-out forwards;
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(245,242,238,0.3), transparent 40%, rgba(245,242,238,0.8));
`

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 56rem;
  padding: 0 1.5rem;
  margin-top: 5rem;
  animation: ${fadeIn} 1s ease-out 0.2s both;

  .eyebrow {
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: rgba(35,35,35,0.7);
    margin-bottom: 1.5rem;
  }

  h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 8vw, 6rem);
    line-height: 1.1;
    margin-bottom: 2rem;
    color: ${dark};
  }

  p {
    font-size: 1.125rem;
    font-weight: 300;
    color: rgba(35,35,35,0.8);
    max-width: 42rem;
    margin: 0 auto 3rem;
  }
`

const HeroLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${dark};
  text-decoration: none;
  color: ${dark};
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    color: ${gold};
    border-color: ${gold};
  }
`

const ProceduresSection = styled.section`
  padding: 8rem 3rem;
  max-width: 1440px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem;
  }
`

const SectionTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .left {
    max-width: 36rem;

    .eyebrow {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${gold};
      display: block;
      margin-bottom: 1rem;
    }

    h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 4vw, 3rem);
      line-height: 1.2;
      margin: 0;
    }
  }

  a {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border-bottom: 1px solid ${dark};
    padding-bottom: 0.25rem;
    color: ${dark};
    transition: color 0.2s;
    cursor: pointer;
    white-space: nowrap;

    &:hover { color: ${gold}; }
  }
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  cursor: pointer;

  &:hover .card-img { transform: scale(1.03); }
  &:hover .card-label { color: ${dark}; }
`

const CardImgWrap = styled.div`
  overflow: hidden;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  aspect-ratio: 4/5;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  position: relative;
`

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  display: block;
`

const CardTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  margin: 0 0 0.5rem;
`

const CardDesc = styled.p`
  font-size: 0.875rem;
  color: rgba(35,35,35,0.7);
  font-weight: 300;
  line-height: 1.625;
  margin-bottom: 1rem;
`

const CardLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: ${gold};
  transition: color 0.2s;
`

const GallerySection = styled.section`
  padding: 6rem 0;
  background: #fff;
  overflow: hidden;
`

const GalleryInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 3rem;
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
  }
`

const GalleryText = styled.div`
  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.75rem);
    line-height: 1.2;
    margin-bottom: 2rem;

    .italic { font-style: italic; color: ${beige}; }
  }

  p {
    font-size: 1.125rem;
    font-weight: 300;
    color: rgba(35,35,35,0.8);
    max-width: 28rem;
    margin-bottom: 2.5rem;
  }
`

const GalleryStats = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;

  .stat-number {
    display: block;
    font-family: 'Playfair Display', serif;
    font-size: 1.875rem;
    margin-bottom: 0.25rem;
  }

  .stat-label {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(35,35,35,0.6);
  }
`

const GalleryImages = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 3rem;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`

const GalleryImgWrap = styled.div<{ $offset?: boolean }>`
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(31,38,135,0.07);
  padding-top: ${p => p.$offset ? '3rem' : '0'};

  img {
    width: 100%;
    height: ${p => p.$offset ? '400px' : '500px'};
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover { transform: scale(1.03); }
  }
`

const CtaSection = styled.section`
  background-color: ${nude};
  padding: 8rem 3rem 3rem;
  border-top: 1px solid rgba(35,35,35,0.1);

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 2rem;
  }
`

const CtaInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`

const CtaContent = styled.div`
  text-align: center;
  max-width: 48rem;
  margin: 0 auto 10rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }

  h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.125rem;
    color: rgba(35,35,35,0.7);
    font-weight: 300;
    margin-bottom: 2.5rem;
  }
`

const CtaBtn = styled.button`
  padding: 1rem 2rem;
  background: ${dark};
  color: #fff;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);

  &:hover {
    background: ${rosegold};
    color: ${dark};
    transform: translateY(-2px);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  }
`

const Footer = styled.footer`
  border-top: 1px solid rgba(35,35,35,0.2);
  padding-top: 4rem;
  margin-top: 5rem;
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const FooterLogoBlock = styled.div`
  grid-column: span 1;

  .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.875rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    display: block;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 0.875rem;
    color: rgba(35,35,35,0.6);
    font-weight: 300;
    max-width: 20rem;
    line-height: 1.625;
  }
`

const FooterCol = styled.div`
  h4 {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1.5rem;
  }

  p, address {
    font-size: 0.875rem;
    color: rgba(35,35,35,0.7);
    font-weight: 300;
    line-height: 1.8;
    font-style: normal;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    a {
      font-size: 0.875rem;
      color: rgba(35,35,35,0.7);
      text-decoration: none;
      font-weight: 300;
      transition: color 0.2s;

      &:hover { color: ${gold}; }
    }
  }
`

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid rgba(35,35,35,0.1);
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

export default function EsteticaSite() {
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
          <Logo>AURA.</Logo>
          <Nav>
            <a href="#procedures">Procedimentos</a>
            <a href="#gallery">Galeria</a>
            <a href="#about">Filosofia</a>
          </Nav>
          <HeaderCta href="#cta">Agendar Consulta</HeaderCta>
        </Header>

        <Hero>
          <HeroImg
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/d4be4a9ab6-7978702809258893a9e9.png"
            alt="Interior clínica de estética premium"
          />
          <HeroOverlay />
          <HeroContent>
            <span className="eyebrow">Luxo Discreto</span>
            <h1>Refinando sua elegância natural.</h1>
            <p>Um santuário exclusivo onde estética avançada encontra sofisticação editorial.</p>
            <HeroLink href="#procedures">
              Descubra os Tratamentos <span>→</span>
            </HeroLink>
          </HeroContent>
        </Hero>

        <ProceduresSection id="procedures">
          <SectionTopRow>
            <div className="left">
              <span className="eyebrow">(Nossa Expertise)</span>
              <h2>Protocolos exclusivos para beleza atemporal.</h2>
            </div>
            <a href="#">Ver Todos os Serviços</a>
          </SectionTopRow>

          <CardsGrid>
            <Card>
              <CardImgWrap>
                <CardImg
                  className="card-img"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/ec83842e74-0860fe53f7e2d72cb1fd.png"
                  alt="Harmonização Facial"
                />
              </CardImgWrap>
              <CardTitle>Harmonização Facial</CardTitle>
              <CardDesc>Realces sutis para restaurar equilíbrio e destacar suas características naturais.</CardDesc>
              <CardLabel className="card-label">Explorar →</CardLabel>
            </Card>

            <Card>
              <CardImgWrap>
                <CardImg
                  className="card-img"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/64372f8ee6-8981eacf46c7f6d2d6b3.png"
                  alt="Qualidade de Pele Avançada"
                />
              </CardImgWrap>
              <CardTitle>Qualidade de Pele Avançada</CardTitle>
              <CardDesc>Bioestimuladores e lasers avançados para um acabamento luminoso e efeito glass-skin.</CardDesc>
              <CardLabel className="card-label">Explorar →</CardLabel>
            </Card>

            <Card>
              <CardImgWrap>
                <CardImg
                  className="card-img"
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/49ab100fdb-b3399ce3cc1aede73442.png"
                  alt="Contorno Corporal"
                />
              </CardImgWrap>
              <CardTitle>Contorno Corporal</CardTitle>
              <CardDesc>Tecnologias não invasivas para esculpir e refinar sua silhueta com precisão.</CardDesc>
              <CardLabel className="card-label">Explorar →</CardLabel>
            </Card>
          </CardsGrid>
        </ProceduresSection>

        <GallerySection id="gallery">
          <GalleryInner>
            <GalleryText>
              <h2>
                A arte da<br />
                <span className="italic">sutileza.</span>
              </h2>
              <p>
                Nossa abordagem está profundamente enraizada em precisão anatômica e visão artística.
                Acreditamos que o melhor trabalho estético é aquele que permanece invisível.
              </p>
              <GalleryStats>
                <div>
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Anos de Exp</span>
                </div>
                <div>
                  <span className="stat-number">5k+</span>
                  <span className="stat-label">Pacientes</span>
                </div>
              </GalleryStats>
            </GalleryText>

            <GalleryImages id="about">
              <GalleryImgWrap $offset>
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/9d60625f69-c5a64579832c07cfb209.png"
                  alt="Interior clínica"
                />
              </GalleryImgWrap>
              <GalleryImgWrap>
                <img
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/a9fb05687e-299ffa1354a7761b4137.png"
                  alt="Textura skincare"
                />
              </GalleryImgWrap>
            </GalleryImages>
          </GalleryInner>
        </GallerySection>

        <CtaSection id="cta">
          <CtaInner>
            <CtaContent>
              <h2>Pronta para elevar sua jornada estética?</h2>
              <p>Agende uma consulta privada para desenvolver seu plano de tratamento personalizado.</p>
              <CtaBtn>Solicitar Agendamento</CtaBtn>
            </CtaContent>

            <Footer>
              <FooterGrid>
                <FooterLogoBlock>
                  <span className="logo">AURA.</span>
                  <p>O ápice da medicina estética, entregue com elegância e cuidado incomparáveis.</p>
                </FooterLogoBlock>

                <FooterCol>
                  <h4>Localização</h4>
                  <address>
                    Avenida Faria Lima, 3000<br />
                    Suite 150<br />
                    São Paulo, SP
                  </address>
                </FooterCol>

                <FooterCol>
                  <h4>Contato</h4>
                  <ul>
                    <li><a href="#">concierge@auraclinic.com</a></li>
                    <li><a href="#">+55 11 99999-0000</a></li>
                  </ul>
                </FooterCol>

                <FooterCol>
                  <h4>Social</h4>
                  <ul>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">TikTok</a></li>
                    <li><a href="#">LinkedIn</a></li>
                  </ul>
                </FooterCol>
              </FooterGrid>

              <FooterBottom>
                <p>© 2026 Clínica AURA. Todos os direitos reservados.</p>
                <div>
                  <a href="#">Política de Privacidade</a>
                  <a href="#">Termos de Serviço</a>
                </div>
              </FooterBottom>
            </Footer>
          </CtaInner>
        </CtaSection>
      </Page>
    </>
  )
}
