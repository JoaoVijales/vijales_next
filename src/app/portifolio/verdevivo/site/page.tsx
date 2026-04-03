'use client'

import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

// --- Animations ---

const blob = keyframes`
  0% { transform: translate(0px, 0px) scale(1);}
  33% { transform: translate(30px, -50px) scale(1.1);}
  66% { transform: translate(-20px, 20px) scale(0.9);}
  100% { transform: translate(0px, 0px) scale(1);}
`;

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px);}
  to { opacity: 1; transform: translateY(0);}
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1);}
  50% { transform: none; animation-timing-function: cubic-bezier(0, 0, 0.2, 1);}
`;

// --- Styled Components ---

const Container = styled.div`
  background-color: #fafaf9;
  color: #292524;
  font-family: var(--font-montserrat), sans-serif;
  scroll-behavior: smooth;
  overflow-x: hidden;
  
  &::selection {
    background-color: #a7f3d0;
    color: #064e3b;}
`;

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  width: 100%;
  z-index: 50;
  transition: all 0.3s ease-in-out;
  background-color: ${props => props.$scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(12px)' : 'none'};
  box-shadow: ${props => props.$scrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 640px) { padding: 0 1.5rem;}
  @media (min-width: 1024px) { padding: 0 2rem;}
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  .icon {
    font-size: 2.25rem;
    color: #059669;}

  span {
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: -0.025em;
    color: #292524;

    .accent { color: #059669;}}
`;

const NavLinks = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: baseline;
    gap: 2rem;}
`;

const NavLink = styled.a`
  font-weight: 500;
  font-size: 0.875rem;
  color: #292524;
  transition: color 0.2s;
  padding: 0.5rem 0.75rem;

  &:hover {
    color: #059669;}
`;

const BudgetBtn = styled.a`
  background-color: #059669;
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s;
  box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);

  &:hover {
    background-color: #047857;
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.3);}
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
    object-fit: cover;}

  .gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2), #fafaf9);}
`;

const MobileNavToggle = styled.div`
  display: block;
  @media (min-width: 768px) {
    display: none;}
`;

const MobileMenuDropdown = styled.div`
  display: block;
  background: white;
  border-top: 1px solid #e7e5e4;
  padding: 1rem;
  @media (min-width: 768px) {
    display: none;
  }
`;

const BounceArrow = styled.div`
position: absolute;
bottom: 2.5rem;
left: 50%;
transform: translateX(-50%);
color: rgba(255, 255, 255, 0.8);
animation: ${bounce} 1s infinite;
display: flex;
align-items: center;
justify-content: center;
`;

const HeroContent = styled.div`
position: relative;
z-index: 10;
text-align: center;
padding: 0 1rem;
max-width: 56rem;
margin: 4rem auto 0;
`;

const HeroBadge = styled.span`
display: inline-block;
padding: 0.25rem 0.75rem;
border-radius: 9999px;
background-color: rgba(255, 255, 255, 0.2);
backdrop-filter: blur(12px);
color: white;
border: 1px solid rgba(255, 255, 255, 0.3);
font-size: 0.75rem;
font-weight: 600;
letter-spacing: 0.05em;
text-transform: uppercase;
margin-bottom: 1rem;
animation: ${fadeInUp} 0.8s ease-out;
`;

const HeroTitle = styled.h1`
font-family: var(--font-playfair), serif;
font-size: 3rem;
font-weight: 700;
color: white;
margin-bottom: 1.5rem;
line-height: 1.25;
text-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

@media(min-width: 768px) { font-size: 4.5rem;}

  .accent {
  font-style: italic;
  color: #6ee7b7;}
`;

const HeroDesc = styled.p`
font-size: 1.125rem;
font-weight: 300;
color: #f5f5f4;
margin-bottom: 2rem;
max-width: 42rem;
margin-left: auto;
margin-right: auto;
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

@media(min-width: 768px) { font-size: 1.25rem;}
`;

const HeroActions = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
justify-content: center;

@media(min-width: 640px) { flex-direction: row;}
`;

const GlassBtn = styled.a`
padding: 1rem 2rem;
background: rgba(255, 255, 255, 0.85);
backdrop-filter: blur(12px);
color: #064e3b;
border-radius: 9999px;
font-weight: 600;
transition: all 0.3s;
box-shadow: 0 10px 15px-3px rgba(0, 0, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;

  &:hover {
  background: white;
  transform: translateY(-0.25rem);
  box-shadow: 0 20px 25px -5px rgba(255, 255, 255, 0.5);}
`;

const Section = styled.section`
padding: 6rem 0;
position: relative;
`;

const LeafPattern = styled.div`
position: absolute;
inset: 0;
z-index: 0;
background-image: radial-gradient(#10b981 1px, transparent 1px);
background-size: 20px 20px;
opacity: 0.1;
`;

const SectionHeader = styled.div`
text-align: center;
margin-bottom: 4rem;
position: relative;
z-index: 10;

  h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem;
  font-weight: 700;
  color: #292524;
  margin-bottom: 1rem;}

  .divider {
  width: 6rem;
  height: 0.25rem;
  background-color: #10b981;
  margin: 0 auto;
  border-radius: 9999px;}

  p {
  margin-top: 1rem;
  color: #57534e;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;}
`;

const ServicesGrid = styled.div`
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
gap: 2rem;
max-width: 1280px;
margin: 0 auto;
padding: 0 1rem;
position: relative;
z-index: 10;

@media(min-width: 768px) { grid-template-columns: repeat(2, minmax(0, 1fr));}
@media(min-width: 1024px) { grid-template-columns: repeat(3, minmax(0, 1fr));}
`;

const ServiceCard = styled.div`
background-color: white;
border-radius: 1rem;
overflow: hidden;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
border: 1px solid #f5f5f4;
transition: all 0.3s;

  &:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: translateY(-0.125rem);}

  .img-container {
  height: 12rem;
  overflow: hidden;
  position: relative;}

  img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;}

  &:hover img {
  transform: scale(1.1);}

  .icon-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #059669;
  color: white;
  padding: 0.5rem;
  border-top-right-radius: 0.75rem;}

  .content {
  padding: 2rem;}

  h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #292524;
  margin-bottom: 0.75rem;
  transition: color 0.2s;}

  &:hover h3 {
  color: #059669;}

  p {
  color: #57534e;
  line-height: 1.625;
  margin-bottom: 1rem;}

  ul {
  font-size: 0.875rem;
  color: #78716c;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;}

  li {
  display: flex;
  align-items: center;
  gap: 0.5rem;

    .icon {
    color: #10b981;
    font-size: 0.875rem;}}
`;

const StylesSection = styled(Section)`
background-color: #1c1917;
color: white;
transition: all 0.7s;
`;

const StylistContainer = styled.div`
max-width: 1280px;
margin: 0 auto;
padding: 0 1rem;
display: flex;
flex-direction: column;
gap: 3rem;
position: relative;
z-index: 20;

@media(min-width: 768px) {
  flex-direction: row;
  align-items: center;
  padding: 0 1.5rem;}
`;

const StyleControls = styled.div`
width: 100%;
@media(min-width: 768px) { width: 50%;}

  .badge {
  color: #34d399;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: block;}

  h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.25;

  @media(min-width: 768px) { font-size: 3rem;}

    span {
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    background-image: linear-gradient(to right, #34d399, #99f6e4);}}

  .desc {
  color: #d6d3d1;
  font-size: 1.125rem;
  margin-bottom: 2.5rem;}
`;

const StyleBtn = styled.button<{ $active: boolean }>`
width: 100%;
padding: 1.5rem;
border-radius: 0.75rem;
border: 1px solid ${props => props.$active ? '#10b981' : '#44403c'};
background-color: ${props => props.$active ? 'rgba(6, 78, 59, 0.3)' : 'rgba(41, 37, 36, 0.5)'};
text-align: left;
display: flex;
align-items: center;
gap: 1rem;
transition: all 0.3s;
margin-bottom: 1rem;

  &:hover {
  background-color: rgba(6, 78, 59, 0.3);
  border-color: #10b981;}

  .circle {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: ${props => props.$active ? '#10b981' : 'rgba(120, 113, 108, 0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;

    .icon {
    color: ${props => props.$active ? 'white' : '#d6d3d1'};
    transition: color 0.3s;}}

  h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.$active ? '#6ee7b7' : 'white'};
  transition: color 0.3s;}

  p {
  font-size: 0.875rem;
  color: #a8a29e;}
`;

const StylePreview = styled.div`
width: 100%;
height: 500px;
position: relative;
border-radius: 1rem;
overflow: hidden;
box-shadow: 0 25px 50px-12px rgba(0, 0, 0, 0.25);
border: 1px solid #44403c;

@media(min-width: 768px) { width: 50%;}

  img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s;
    &:hover { transform: scale(1.05);}}

  .content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding: 2rem;}

  h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;}

  p {
  color: #d6d3d1;
  font-size: 0.875rem;}
`;

const WhyUsSection = styled(Section)`
background-color: #ecfdf5;
`;

const WhyUsGrid = styled.div`
max-width: 1280px;
margin: 0 auto;
padding: 0 1rem;
display: grid;
grid-template-columns: repeat(1, minmax(0, 1fr));
gap: 3rem;
align-items: center;

@media(min-width: 768px) { grid-template-columns: repeat(2, minmax(0, 1fr));}
`;

const WhyUsImgWrapper = styled.div`
position: relative;

  .blob {
  position: absolute;
  width: 6rem;
  height: 6rem;
  border-radius: 9999px;
  mix-blend-mode: multiply;
  filter: blur(24px);
  opacity: 0.7;
  animation: ${blob} 7s infinite;}

  .blob-1 { top: -1rem; left: -1rem; background-color: #d1fae5;}
  .blob-2 { bottom: -1rem; right: -1rem; background-color: #ccfbf1; animation-delay: 2s;}

  img {
  position: relative;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: rotate(2deg);
  transition: all 0.5s;
  width: 100%;

    &:hover { transform: rotate(0);}}
`;

const WhyUsItem = styled.div`
display: flex;
align-items: flex-start;
gap: 1rem;
margin-bottom: 1.5rem;

  .icon-wrapper {
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background-color: #d1fae5;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #059669;}

  h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: #292524;}

  p {
  font-size: 0.875rem;
  color: #57534e;}
`;

const ContactSection = styled(Section)`
background-color: rgba(250, 250, 249, 0.9);

  .bg-img {
  position: absolute;
  inset: 0;
  z-index: 0;
    
    img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
    filter: grayscale(100%);}

    .overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.9);}}
`;

const ContactCard = styled.div`
background-color: white;
border-radius: 1.5rem;
box-shadow: 0 25px 50px-12px rgba(0, 0, 0, 0.25);
padding: 2rem;
border: 1px solid #f5f5f4;
max-width: 48rem;
margin: 0 auto;
position: relative;
z-index: 10;

@media(min-width: 768px) { padding: 3rem;}

  .header {
  text-align: center;
  margin-bottom: 2.5rem;

    .badge {
    color: #059669;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.75rem;}

    h2 {
    font-size: 1.875rem;
    font-weight: 700;
    color: #292524;
    margin-top: 0.5rem;}

    p {
    color: #78716c;
    margin-top: 0.5rem;}}

  form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;}

  .grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.5rem;
  @media(min-width: 768px) { grid-template-columns: repeat(2, minmax(0, 1fr));}}

  label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #44403c;
  margin-bottom: 0.25rem;}

input, select, textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background-color: #fafaf9;
  border: 1px solid #e7e5e4;
  outline: none;
  transition: all 0.2s;

    &:focus {
    border-color: #10b981;
    box-shadow: 0 0 0 2px rgba(167, 243, 208, 1);}}

  button {
  width: 100%;
  background-color: #059669;
  color: white;
  font-weight: 700;
  padding: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s;
  box-shadow: 0 10px 15px-3px rgba(16, 185, 129, 0.3);

    &:hover {
    background-color: #047857;
    transform: translateY(-0.125rem);
    box-shadow: 0 20px 25px-5px rgba(16, 185, 129, 0.4);}}
`;

const Footer = styled.footer`
background-color: #1c1917;
color: #a8a29e;
padding: 3rem 0;
border-top: 1px solid #292524;

  .container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media(min-width: 768px) {
    flex-direction: row;
    padding: 0 2rem;}}

  .links {
  display: flex;
  gap: 1.5rem;}

a:hover { color: #10b981;}
`;

// --- Data ---

const stylesData = {
  tropical: {
    title: "Refúgio Tropical",
    desc: "Plantas nativas como Heliconias e Bromélias criam um microclima fresco e uma estética impactante.",
    img: "/assets/verdevivo/galeria_tropical.png",
    bg: "/assets/verdevivo/galeria_tropical_bg.png"
  },
  minimalist: {
    title: "Oásis Urbano",
    desc: "Geometria pura, caminhos de concreto flutuante e suculentas. Menos é mais.",
    img: "/assets/verdevivo/galeria_moderno.png",
    bg: "/assets/verdevivo/galeria_moderno_bg.png"
  },
  zen: {
    title: "Serenidade Oriental",
    desc: "A harmonia perfeita entre pedras, água e musgos. Um espaço para meditação.",
    img: "/assets/verdevivo/galeria_zen.png",
    bg: "/assets/verdevivo/galeria_zen_bg.png"
  }
};

export default function VerdeVivoPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeStyle, setActiveStyle] = useState('tropical');
  const [previewOpacity, setPreviewOpacity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeStyle = (key: string) => {
    setPreviewOpacity(0);
    setTimeout(() => {
      setActiveStyle(key);
      setPreviewOpacity(1);
    }, 300);
  };

  const currentData = stylesData[activeStyle as keyof typeof stylesData];

  return (
    <Container>
      <Nav $scrolled={scrolled}>
        <NavContainer>
          <Logo onClick={() => window.scrollTo(0, 0)}>
            <span className="material-symbols-outlined icon">yard</span>
            <span>Verde<span className="accent">Vivo</span></span>
          </Logo>
          <NavLinks>
            <NavLink href="#servicos">Serviços</NavLink>
            <NavLink href="#estilos">Inspiração</NavLink>
            <NavLink href="#sobre">Sobre</NavLink>
            <BudgetBtn href="#contato">Orçamento</BudgetBtn>
          </NavLinks>
          <MobileNavToggle>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ padding: '0.5rem', color: '#57534e', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <span className="material-symbols-outlined">menu</span>
            </button>
          </MobileNavToggle>
        </NavContainer>
        {isMenuOpen && (
          <MobileMenuDropdown>
            <NavLink href="#servicos" onClick={() => setIsMenuOpen(false)} style={{ display: 'block' }}>Serviços</NavLink>
            <NavLink href="#estilos" onClick={() => setIsMenuOpen(false)} style={{ display: 'block' }}>Inspiração</NavLink>
            <NavLink href="#sobre" onClick={() => setIsMenuOpen(false)} style={{ display: 'block' }}>Sobre</NavLink>
            <NavLink href="#contato" onClick={() => setIsMenuOpen(false)} style={{ display: 'block', fontWeight: 'bold', color: '#059669' }}>Solicitar Orçamento</NavLink>
          </MobileMenuDropdown>
        )}
      </Nav>

      <Hero>
        <HeroBg>
          <img src="/assets/verdevivo/hero.png" alt="Jardim Luxuoso" />
          <div className="gradient"></div>
        </HeroBg>
        <HeroContent>
          <HeroBadge>Design Biofílico & Paisagismo</HeroBadge>
          <HeroTitle>
            Transforme seu espaço em um <span className="accent">santuário</span> natural.
          </HeroTitle>
          <HeroDesc>
            Criamos e mantemos jardins que respiram vida, unindo estética moderna com a tranquilidade da natureza.
          </HeroDesc>
          <HeroActions>
            <GlassBtn href="#estilos">
              <span className="material-symbols-outlined">explore</span> Explorar Estilos
            </GlassBtn>
            <GlassBtn href="#contato">Falar com Especialista</GlassBtn>
          </HeroActions>
        </HeroContent>
        <BounceArrow>
          <span className="material-symbols-outlined" style={{ fontSize: '2.25rem' }}>keyboard_arrow_down</span>
        </BounceArrow>
      </Hero>

      <Section id="servicos">
        <LeafPattern />
        <SectionHeader>
          <h2>Nossos Serviços</h2>
          <div className="divider"></div>
          <p>Do planejamento à manutenção, cuidamos de cada folha do seu jardim com precisão técnica e olhar artístico.</p>
        </SectionHeader>
        <ServicesGrid>
          {[
            { title: 'Design & Paisagismo', img: 'feature_desing.png', icon: 'architecture', desc: 'Projetos exclusivos que harmonizam arquitetura e natureza. Visualização 3D e seleção botânica personalizada.' },
            { title: 'Manutenção Premium', img: 'feature_manutencao.png', icon: 'content_cut', desc: 'Cuidado constante para que seu jardim esteja sempre impecável. Podas técnicas, adubação e controle de pragas.' },
            { title: 'Irrigação Inteligente', img: 'feature_irrigacao.png', icon: 'water_drop', desc: 'Sistemas automatizados que economizam água e garantem a saúde das plantas, controlados pelo seu smartphone.' },
          ].map((s, i) => (
            <ServiceCard key={i}>
              <div className="img-container">
                <img src={`/assets/verdevivo/${s.img}`} alt={s.title} />
                <div className="icon-badge">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
              </div>
              <div className="content">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>
                  <li><span className="material-symbols-outlined icon">check_circle</span> Consultoria no local</li>
                  <li><span className="material-symbols-outlined icon">check_circle</span> Projetos 3D</li>
                </ul>
              </div>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </Section>

      <StylesSection id="estilos" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4, zIndex: 0 }}>
          <img
            src={currentData.bg}
            alt="bg"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.7s', opacity: previewOpacity * 0.4 }}
          />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #1c1917, rgba(28, 25, 23, 0.9), transparent)', zIndex: 10 }}></div>
        <StylistContainer>
          <StyleControls>
            <span className="badge">Galeria Interativa</span>
            <h2>Qual é a sua <br /> <span>Natureza?</span></h2>
            <p className="desc">Selecione um estilo abaixo para visualizar como podemos transformar seu ambiente.</p>
            <div>
              {[
                { key: 'tropical', title: 'Tropical Brasileiro', icon: 'forest', desc: 'Exuberante, vibrante e cheio de vida.' },
                { key: 'minimalist', title: 'Moderno Minimalista', icon: 'crop_square', desc: 'Linhas retas, concreto e pouca manutenção.' },
                { key: 'zen', title: 'Zen Oriental', icon: 'spa', desc: 'Equilíbrio, pedras, água e serenidade.' },
              ].map(s => (
                <StyleBtn key={s.key} $active={activeStyle === s.key} onClick={() => changeStyle(s.key)}>
                  <div className="circle">
                    <span className="material-symbols-outlined icon">{s.icon}</span>
                  </div>
                  <div>
                    <h4>{s.title}</h4>
                    <p>{s.desc}</p>
                  </div>
                </StyleBtn>
              ))}
            </div>
          </StyleControls>
          <StylePreview style={{ opacity: previewOpacity }}>
            <img src={currentData.img} alt={currentData.title} />
            <div className="content">
              <h3>{currentData.title}</h3>
              <p>{currentData.desc}</p>
            </div>
          </StylePreview>
        </StylistContainer>
      </StylesSection>

      <WhyUsSection id="sobre">
        <WhyUsGrid>
          <WhyUsImgWrapper>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <img src="/assets/verdevivo/equipe.png" alt="Nossa Equipe" />
          </WhyUsImgWrapper>
          <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#292524', marginBottom: '1.5rem', fontFamily: 'var(--font-playfair), serif' }}>
              Por que escolher a VerdeVivo?
            </h2>
            <div>
              {[
                { title: 'Sustentabilidade em 1º Lugar', icon: 'eco', desc: 'Utilizamos adubos orgânicos e técnicas que respeitam a biodiversidade local.' },
                { title: 'Pontualidade e Limpeza', icon: 'schedule', desc: 'Respeitamos seu tempo e deixamos seu espaço mais limpo do que encontramos.' },
                { title: 'Garantia Verde', icon: 'verified', desc: 'Garantia de replantio caso alguma muda não se adapte nas primeiras semanas.' },
              ].map((item, i) => (
                <WhyUsItem key={i}>
                  <div className="icon-wrapper">
                    <span className="material-symbols-outlined">{item.icon}</span>
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </WhyUsItem>
              ))}
            </div>
          </div>
        </WhyUsGrid>
      </WhyUsSection>

      <ContactSection id="contato">
        <div className="bg-img">
          <img src="/assets/verdevivo/contato.png" alt="bg" />
          <div className="overlay"></div>
        </div>
        <ContactCard>
          <div className="header">
            <span className="badge">Vamos conversar</span>
            <h2>Comece seu projeto hoje</h2>
            <p>Preencha o formulário e receba um pré-orçamento em 24h.</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); alert('Obrigado! Entraremos em contato em breve.'); }}>
            <div className="grid">
              <div>
                <label>Nome</label>
                <input type="text" placeholder="Seu nome" />
              </div>
              <div>
                <label>Telefone</label>
                <input type="tel" placeholder="(00) 00000-0000" />
              </div>
            </div>
            <div>
              <label>Tipo de Serviço</label>
              <select>
                <option>Manutenção Recorrente</option>
                <option>Projeto de Paisagismo</option>
                <option>Poda de Árvores</option>
                <option>Instalação de Irrigação</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label>Mensagem</label>
              <textarea rows={4} placeholder="Conte um pouco sobre seu jardim..."></textarea>
            </div>
            <button type="submit">Enviar Solicitação</button>
          </form>
        </ContactCard>
      </ContactSection>

      <Footer>
        <div className="container">
          <Logo onClick={() => window.scrollTo(0, 0)}>
            <span className="material-symbols-outlined icon">yard</span>
            <span style={{ color: 'white' }}>Verde<span className="accent">Vivo</span></span>
          </Logo>
          <div style={{ fontSize: '0.875rem' }}>
            © 2024 VerdeVivo Paisagismo. Todos os direitos reservados.
          </div>
          <div className="links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Whatsapp</a>
          </div>
        </div>
      </Footer>
    </Container>
  )
}
