'use client'

import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import * as THREE from 'three'

// ─── Animations ───────────────────────────────────────────────────────────────

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(5, 150, 105, 0.4); }
  50%       { box-shadow: 0 0 50px rgba(5, 150, 105, 0.8), 0 0 100px rgba(5, 150, 105, 0.15); }
`

const lineDown = keyframes`
  0%   { height: 0;    opacity: 1; }
  100% { height: 50px; opacity: 0; }
`

const scanline = keyframes`
  0%   { top: -2px; }
  100% { top: 100%; }
`

// ─── Layout ───────────────────────────────────────────────────────────────────

const Container = styled.div`
  background: #000;
  color: #fff;
  font-family: var(--font-montserrat), sans-serif;
  overflow-x: hidden;
`

// ─── Nav ──────────────────────────────────────────────────────────────────────

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  transition: all 0.4s ease;
  background:      ${p => p.$scrolled ? 'rgba(0,0,0,0.95)' : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(12px)'       : 'none'};
  border-bottom:   ${p => p.$scrolled ? '1px solid rgba(5,150,105,0.2)' : 'none'};
`

const NavInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 640px) { padding: 0 1.2rem; }
`

const NavLogo = styled.span`
  font-family: var(--font-orbitron), monospace;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #fff;

  em { color: #059669; font-style: normal; }
`

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 640px) { gap: 1rem; }
`

const NavLink = styled.a`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: #059669; }

  @media (max-width: 640px) { display: none; }
`

const BackLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: #059669; }
`

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = styled.section`
  position: relative;
  height: 100vh;
  min-height: 680px;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const ThreeMount = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    135deg,
    rgba(0,0,0,0.85) 0%,
    rgba(0,0,0,0.3) 55%,
    rgba(0,0,0,0.65) 100%
  );

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(5,150,105,0.2), transparent);
    animation: ${scanline} 8s linear infinite;
  }
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  animation: ${fadeInUp} 1.2s ease both;

  @media (max-width: 640px) { padding: 0 1.2rem; }
`

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: rgba(5,150,105,0.1);
  border: 1px solid rgba(5,150,105,0.45);
  color: #34d399;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  padding: 0.5rem 1.2rem;
  margin-bottom: 2rem;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%);
`

const HeroTitle = styled.h1`
  font-family: var(--font-orbitron), monospace;
  font-size: clamp(2.2rem, 5.5vw, 4.8rem);
  font-weight: 900;
  line-height: 1.05;
  text-transform: uppercase;
  letter-spacing: -1px;
  margin-bottom: 1.5rem;

  .green { color: #059669; }
  .mint  { color: #6ee7b7; }
`

const HeroSub = styled.p`
  font-size: clamp(0.95rem, 1.8vw, 1.2rem);
  color: rgba(255,255,255,0.65);
  max-width: 580px;
  line-height: 1.9;
  font-weight: 300;
  margin-bottom: 3rem;
`

const HeroStats = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 480px) { gap: 1.5rem; }
`

const Stat = styled.div`
  .value {
    display: block;
    font-family: var(--font-orbitron), monospace;
    font-size: 2rem;
    font-weight: 700;
    color: #059669;
    line-height: 1;
    margin-bottom: 0.3rem;
  }
  .label {
    font-size: 0.65rem;
    color: rgba(255,255,255,0.45);
    letter-spacing: 3px;
    text-transform: uppercase;
  }
`

const ScrollHint = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.3);
  font-size: 0.6rem;
  letter-spacing: 4px;
  text-transform: uppercase;

  &::after {
    content: '';
    width: 1px;
    background: linear-gradient(to bottom, rgba(5,150,105,0.9), transparent);
    animation: ${lineDown} 1.8s ease-in-out infinite;
  }
`

// ─── Sections base ────────────────────────────────────────────────────────────

const SectionWrap = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 7rem 2rem;

  @media (max-width: 768px) { padding: 4rem 1.5rem; }
`

const SectionLabel = styled.p`
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #059669;
  margin-bottom: 0.8rem;
`

const SectionTitle = styled.h2`
  font-family: var(--font-orbitron), monospace;
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.1;
  margin-bottom: 1.2rem;
`

const SectionDivider = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #059669, #6ee7b7);
  margin-bottom: 3.5rem;
`

// ─── Overview ─────────────────────────────────────────────────────────────────

const OverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const OverviewText = styled.div`
  p {
    color: rgba(255,255,255,0.65);
    line-height: 1.95;
    font-size: 0.98rem;
    font-weight: 300;
    margin-bottom: 1.4rem;

    strong {
      color: rgba(255,255,255,0.9);
      font-weight: 600;
    }
  }
`

const Screenshot = styled.div`
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, #059669, #6ee7b7, #059669);
    background-size: 200% 200%;
    z-index: -1;
    opacity: 0.5;
  }

  img {
    width: 100%;
    display: block;
    filter: brightness(0.88) contrast(1.05);
  }
`

// ─── Features ─────────────────────────────────────────────────────────────────

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 580px)  { grid-template-columns: 1fr; }
`

const FeatureCard = styled.div`
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.07);
  padding: 2rem 1.8rem;
  position: relative;
  transition: all 0.3s ease;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 18px;
    height: 18px;
    background: #059669;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    transition: background 0.3s;
  }

  &:hover {
    border-color: rgba(5,150,105,0.35);
    background: rgba(5,150,105,0.04);
    transform: translateY(-5px);
    box-shadow: 0 24px 48px rgba(5,150,105,0.08);
  }

  &:hover::after { background: #6ee7b7; }

  .icon {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
    display: block;
  }

  h3 {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 0.8rem;
  }

  p {
    color: rgba(255,255,255,0.5);
    font-size: 0.875rem;
    line-height: 1.75;
    font-weight: 300;
  }
`

// ─── Architecture ─────────────────────────────────────────────────────────────

const ArchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const ArchBlock = styled.div`
  h3 {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: #6ee7b7;
    margin-bottom: 1.5rem;
  }
`

const ArchList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`

const ArchItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  color: rgba(255,255,255,0.65);
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.6;

  &::before {
    content: '▸';
    color: #059669;
    flex-shrink: 0;
    margin-top: 1px;
  }
`

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const TechWrap = styled.section`
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 5rem 2rem;
`

const TechInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

const TechBadge = styled.div<{ $mint?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.2rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid ${p => p.$mint ? 'rgba(110,231,183,0.35)' : 'rgba(5,150,105,0.3)'};
  color: ${p => p.$mint ? '#6ee7b7' : '#34d399'};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  transition: background 0.2s;

  &:hover { background: rgba(255,255,255,0.06); }
`

// ─── CTA ──────────────────────────────────────────────────────────────────────

const CTASection = styled.section`
  position: relative;
  padding: 8rem 2rem;
  text-align: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
`

const CTATitle = styled.h2`
  font-family: var(--font-orbitron), monospace;
  font-size: clamp(1.8rem, 4vw, 3.2rem);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.1;
  margin-bottom: 1.5rem;

  span { color: #059669; }
`

const CTASub = styled.p`
  color: rgba(255,255,255,0.55);
  font-size: 1.05rem;
  line-height: 1.9;
  font-weight: 300;
  max-width: 520px;
  margin: 0 auto 3rem;
`

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`

const CTABtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: #059669;
  color: #fff;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.2rem 3rem;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  transition: all 0.3s ease;
  animation: ${glowPulse} 3s ease-in-out infinite;

  &:hover {
    background: #047857;
    transform: translateY(-3px);
  }
`

const CTABtnOutline = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: transparent;
  color: rgba(255,255,255,0.7);
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 1.2rem 3rem;
  border: 1px solid rgba(255,255,255,0.15);
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%);
  transition: all 0.3s ease;

  &:hover {
    border-color: #059669;
    color: #34d399;
    transform: translateY(-3px);
  }
`

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = styled.footer`
  border-top: 1px solid rgba(255,255,255,0.05);
  padding: 2.5rem 2rem;
  text-align: center;
`

const FooterBack = styled.a`
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: #059669; }
`

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '🌿',
    title: 'Design & Paisagismo',
    desc: 'Projetos exclusivos que harmonizam arquitetura e natureza, com visualização 3D e seleção botânica personalizada.',
  },
  {
    icon: '✂️',
    title: 'Manutenção Premium',
    desc: 'Podas técnicas, adubação e controle de pragas para que o jardim esteja sempre impecável.',
  },
  {
    icon: '💧',
    title: 'Irrigação Inteligente',
    desc: 'Sistemas automatizados controlados por smartphone que economizam água e garantem a saúde das plantas.',
  },
  {
    icon: '🎨',
    title: 'Galeria de Estilos',
    desc: 'Galeria interativa com três estilos — Tropical, Moderno Minimalista e Zen Oriental — para o cliente visualizar a transformação.',
  },
  {
    icon: '🌱',
    title: 'Diferenciais da Marca',
    desc: 'Seção "Por que escolher a VerdeVivo?" com sustentabilidade, pontualidade e garantia verde como pilares.',
  },
  {
    icon: '📋',
    title: 'Formulário de Orçamento',
    desc: 'Captação de leads direto na página com tipo de serviço, mensagem e retorno de pré-orçamento em 24h.',
  },
]

const ARCH_DESIGN = [
  'Hero com imagem de fundo e gradiente orgânico',
  'Navbar transparente com transição ao scroll',
  'Grid de serviços com cards com imagem e ícone',
  'Galeria interativa com troca de imagem ao selecionar estilo',
  'Seção escura com background parallax e controles de estilo',
  'Seção "Por que nós" com blobs animados e lista de diferenciais',
]

const ARCH_UX = [
  'Paleta clara (fundo #fafaf9) com accent verde esmeralda',
  'Tipografia Playfair Display para títulos elegantes',
  'Botões arredondados com sombra esmeralda',
  'Formulário de orçamento com validação de campos',
  'Menu mobile com dropdown animado',
  'Footer com logo, links e redes sociais',
]

const TECH = [
  { label: 'Next.js',           mint: false },
  { label: 'React 19',          mint: false },
  { label: 'TypeScript',        mint: false },
  { label: 'Styled-Components', mint: true  },
  { label: 'Material Symbols',  mint: true  },
  { label: 'CSS Animations',    mint: true  },
]

// ─── Three.js Nature Scene ────────────────────────────────────────────────────

function useNatureScene(mountRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.018)

    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 500)
    camera.position.set(0, 14, 50)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const GREEN = new THREE.Color(0x059669)
    const MINT  = new THREE.Color(0x6ee7b7)

    // Grid
    const grid = new THREE.GridHelper(200, 40, 0x059669, 0x0a1a0a)
    ;(grid.material as THREE.Material).opacity = 0.2
    ;(grid.material as THREE.Material).transparent = true
    grid.position.y = -8
    scene.add(grid)

    // Leaf-like icosahedrons floating
    const leaves: THREE.LineSegments[] = []
    const leafData = [
      [-18,  2, -6, 3.5, true ],
      [ -7,  5, -9, 5.0, false],
      [  5,  3, -5, 4.0, true ],
      [ 16,  6, -7, 3.0, false],
      [ -3,  9,  3, 4.5, true ],
      [ 12,  1,  4, 2.5, false],
      [-12,  7,  6, 3.5, true ],
    ] as const

    for (const [x, y, z, r, isGreen] of leafData) {
      const geo = new THREE.IcosahedronGeometry(r * 0.5, 0)
      const edges = new THREE.EdgesGeometry(geo)
      const mat = new THREE.LineBasicMaterial({
        color: isGreen ? GREEN : MINT,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      })
      const leaf = new THREE.LineSegments(edges, mat)
      leaf.position.set(x, y - 8, z)
      scene.add(leaf)
      leaves.push(leaf)
      geo.dispose()
    }

    // Particles
    const count = 1000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 130
      pos[i * 3 + 1] = (Math.random() - 0.5) * 70
      pos[i * 3 + 2] = (Math.random() - 0.5) * 130
      const c = Math.random() > 0.4 ? GREEN : MINT
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(pGeo, pMat)
    scene.add(particles)

    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth)  * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    document.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      if (!el) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    let frameId: number
    let t = 0

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.003

      scene.rotation.y = t * 0.08 + mouseX * 0.06
      camera.position.y = 14 + Math.sin(t * 0.35) * 2 + mouseY * -2
      camera.lookAt(0, 0, 0)

      leaves.forEach((leaf, i) => {
        leaf.rotation.x = t * 0.25 + i * 0.6
        leaf.rotation.y = t * 0.18 + i * 0.4
        ;(leaf.material as THREE.LineBasicMaterial).opacity = 0.25 + Math.sin(t * 0.8 + i) * 0.2
      })

      particles.rotation.y = t * 0.03
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)

      scene.remove(grid)
      grid.geometry.dispose()
      ;(grid.material as THREE.Material).dispose()

      leaves.forEach(leaf => {
        scene.remove(leaf)
        leaf.geometry.dispose()
        ;(leaf.material as THREE.Material).dispose()
      })

      scene.remove(particles)
      pGeo.dispose()
      pMat.dispose()
      scene.clear()

      renderer.dispose()
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [mountRef])
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function VerdeVivoPage() {
  const [scrolled, setScrolled] = useState(false)
  const mountRef = useRef<HTMLDivElement>(null)

  useNatureScene(mountRef)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Container>
      <Nav $scrolled={scrolled}>
        <NavInner>
          <NavLogo>V<em>.</em>IJALES</NavLogo>
          <NavLinks>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#design">Design</NavLink>
            <BackLink href="/#portfolio">← Portfólio</BackLink>
          </NavLinks>
        </NavInner>
      </Nav>

      <Hero>
        <ThreeMount ref={mountRef} aria-hidden="true" />
        <HeroOverlay />
        <HeroContent>
          <HeroBadge>Template Web · Paisagismo & Jardins</HeroBadge>
          <HeroTitle>
            Verde<br />
            <span className="green">Vivo</span><br />
            <span className="mint">Paisagismo</span>
          </HeroTitle>
          <HeroSub>
            Site institucional para empresas de paisagismo — dos serviços
            à galeria interativa de estilos — desenvolvido para transformar
            visitantes em clientes.
          </HeroSub>
          <HeroStats>
            <Stat>
              <span className="value">3</span>
              <span className="label">Serviços</span>
            </Stat>
            <Stat>
              <span className="value">3</span>
              <span className="label">Estilos</span>
            </Stat>
            <Stat>
              <span className="value">100%</span>
              <span className="label">Responsivo</span>
            </Stat>
          </HeroStats>
        </HeroContent>
        <ScrollHint>scroll</ScrollHint>
      </Hero>

      <SectionWrap>
        <OverviewGrid>
          <OverviewText>
            <SectionLabel>Sobre o Projeto</SectionLabel>
            <SectionTitle>Um jardim que vende</SectionTitle>
            <SectionDivider />
            <p>
              A <strong>VerdeVivo Paisagismo</strong> é um template web completo
              para empresas de jardinagem e paisagismo que precisam de uma
              presença digital elegante e orientada à geração de leads.
              Cada seção foi criada para transmitir naturalidade, confiança e sofisticação.
            </p>
            <p>
              O design mistura uma paleta clara e orgânica com elementos
              visuais de alto impacto — hero com imagem de jardim, galeria
              interativa de estilos e seção escura com parallax — para criar
              uma experiência imersiva e memorável.
            </p>
            <p>
              O objetivo é direto: <strong>apresentar os serviços, inspirar
              com a galeria e capturar orçamentos</strong> — em uma única
              página que reflete a qualidade do trabalho.
            </p>
          </OverviewText>
          <Screenshot>
            <img src="/assets/main/verdevivo.png" alt="Screenshot do VerdeVivo Paisagismo" />
          </Screenshot>
        </OverviewGrid>
      </SectionWrap>

      <SectionWrap id="features">
        <SectionLabel>Funcionalidades</SectionLabel>
        <SectionTitle>O que o template entrega</SectionTitle>
        <SectionDivider />
        <FeaturesGrid>
          {FEATURES.map(f => (
            <FeatureCard key={f.title}>
              <span className="icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </SectionWrap>

      <SectionWrap id="design">
        <SectionLabel>Design & UX</SectionLabel>
        <SectionTitle>Elegância que converte</SectionTitle>
        <SectionDivider />
        <ArchGrid>
          <ArchBlock>
            <h3>Layout & Componentes</h3>
            <ArchList>
              {ARCH_DESIGN.map(item => (
                <ArchItem key={item}>{item}</ArchItem>
              ))}
            </ArchList>
          </ArchBlock>
          <ArchBlock>
            <h3>UX & Identidade Visual</h3>
            <ArchList>
              {ARCH_UX.map(item => (
                <ArchItem key={item}>{item}</ArchItem>
              ))}
            </ArchList>
          </ArchBlock>
        </ArchGrid>
      </SectionWrap>

      <TechWrap>
        <TechInner>
          <SectionLabel>Stack Tecnológico</SectionLabel>
          <SectionTitle>Tecnologias utilizadas</SectionTitle>
          <SectionDivider />
          <TechGrid>
            {TECH.map(t => (
              <TechBadge key={t.label} $mint={t.mint}>{t.label}</TechBadge>
            ))}
          </TechGrid>
        </TechInner>
      </TechWrap>

      <CTASection>
        <SectionLabel>Próximo Passo</SectionLabel>
        <CTATitle>
          Quer ver o projeto<br />
          <span>em ação?</span>
        </CTATitle>
        <CTASub>
          Acesse o template completo e explore a experiência real —
          ou fale com a gente para desenvolver uma solução personalizada
          para o seu negócio de paisagismo.
        </CTASub>
        <CTAButtons>
          <CTABtn href="/portifolio/verdevivo/site">Ver o projeto →</CTABtn>
          <CTABtnOutline href="/#contact">Fale com a gente</CTABtnOutline>
        </CTAButtons>
      </CTASection>

      <Footer>
        <FooterBack href="/#portfolio">← Voltar ao portfólio</FooterBack>
      </Footer>
    </Container>
  )
}
