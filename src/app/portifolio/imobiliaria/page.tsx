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
  0%, 100% { box-shadow: 0 0 20px rgba(255, 69, 0, 0.4); }
  50%       { box-shadow: 0 0 50px rgba(255, 69, 0, 0.8), 0 0 100px rgba(255, 69, 0, 0.15); }
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
  border-bottom:   ${p => p.$scrolled ? '1px solid rgba(255,69,0,0.2)' : 'none'};
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

  em { color: #ff4500; font-style: normal; }
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

  &:hover { color: #ff4500; }

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

  &:hover { color: #ff4500; }
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
    rgba(0,0,0,0.75) 0%,
    rgba(0,0,0,0.25) 55%,
    rgba(0,0,0,0.55) 100%
  );

  /* scanline effect */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(0,200,255,0.15), transparent);
    animation: ${scanline} 6s linear infinite;
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
  background: rgba(255,69,0,0.1);
  border: 1px solid rgba(255,69,0,0.45);
  color: #ff4500;
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

  .orange { color: #ff4500; }
  .cyan   { color: #00C8FF; }
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
    color: #ff4500;
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
    background: linear-gradient(to bottom, rgba(255,69,0,0.9), transparent);
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
  color: #ff4500;
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
  background: linear-gradient(90deg, #ff4500, #00C8FF);
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
    background: linear-gradient(135deg, #ff4500, #00C8FF, #ff4500);
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
    background: #ff4500;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    transition: background 0.3s;
  }

  &:hover {
    border-color: rgba(255,69,0,0.35);
    background: rgba(255,69,0,0.04);
    transform: translateY(-5px);
    box-shadow: 0 24px 48px rgba(255,69,0,0.08);
  }

  &:hover::after { background: #00C8FF; }

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
    color: #00C8FF;
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
    color: #ff4500;
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

const TechBadge = styled.div<{ $cyan?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.2rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid ${p => p.$cyan ? 'rgba(0,200,255,0.35)' : 'rgba(255,69,0,0.3)'};
  color: ${p => p.$cyan ? '#00C8FF' : '#ff4500'};
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
    background: radial-gradient(circle, rgba(255,69,0,0.07) 0%, transparent 65%);
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

  span { color: #ff4500; }
`

const CTASub = styled.p`
  color: rgba(255,255,255,0.55);
  font-size: 1.05rem;
  line-height: 1.9;
  font-weight: 300;
  max-width: 520px;
  margin: 0 auto 3rem;
`

const CTABtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  background: #ff4500;
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
    background: #ff6030;
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

  &:hover { color: #ff4500; }
`

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '🏢',
    title: 'Catálogo de Imóveis',
    desc: 'Listagem paginada de apartamentos, casas, comerciais, terrenos e rurais — com suporte a venda e aluguel.',
  },
  {
    icon: '🔍',
    title: 'Busca Avançada',
    desc: 'Filtros por cidade, bairro, faixa de preço, quartos, banheiros, vagas e área total em m².',
  },
  {
    icon: '📋',
    title: 'Detalhes Completos',
    desc: 'Página dedicada por imóvel com specs, galeria de fotos, preço por m² e imóveis similares.',
  },
  {
    icon: '📩',
    title: 'Sistema de Consultas',
    desc: 'Formulário de interesse integrado por imóvel. Leads capturados e redirecionados para o corretor responsável.',
  },
  {
    icon: '⭐',
    title: 'Imóveis em Destaque',
    desc: 'Homepage curada com propriedades featured e lançamentos recentes para maximizar conversão.',
  },
  {
    icon: '⚙️',
    title: 'Admin Completo',
    desc: 'Painel de gerenciamento via Django Admin para CRUD de imóveis, mídias e controle de destaques.',
  },
]

const ARCH_BACKEND = [
  'Service Layer desacoplado das views Django',
  'Repository Pattern para acesso ao banco',
  'PropertyManager com queryset semântico',
  'Slug automático com de-duplicação por contador',
  'Cálculo de preço por m² como property',
  'Soft-delete via flag is_active',
]

const ARCH_FRONTEND = [
  'Templates Django com herança (base.html)',
  'Bootstrap responsivo e customizado',
  'Filtros de busca sem reload via GET params',
  'Paginação nativa com 12 itens por página',
  'Feedback visual de mensagens com Django messages',
  'Formulário de consulta com validação server-side',
]

const TECH = [
  { label: 'Python 3',  cyan: false },
  { label: 'Django',    cyan: false },
  { label: 'SQLite',    cyan: false },
  { label: 'Bootstrap', cyan: true  },
  { label: 'HTML5',     cyan: true  },
  { label: 'CSS3',      cyan: true  },
  { label: 'Django ORM',cyan: false },
  { label: 'pytest',    cyan: true  },
]

// ─── Three.js Cityscape ───────────────────────────────────────────────────────

function useCityscape(mountRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    // Scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.018)

    // Camera
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 500)
    camera.position.set(0, 18, 55)
    camera.lookAt(0, 0, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    // ── Ground grid ──
    const gridHelper = new THREE.GridHelper(200, 40, 0xff4500, 0x111111)
    ;(gridHelper.material as THREE.Material).opacity = 0.3;
    ;(gridHelper.material as THREE.Material).transparent = true
    gridHelper.position.y = -8
    scene.add(gridHelper)

    // ── Buildings ──
    const ORANGE = new THREE.Color(0xff4500)
    const CYAN   = new THREE.Color(0x00c8ff)

    const buildings: THREE.LineSegments[] = []

    const buildingData = [
      // [x, z, width, depth, height, orange?]
      [-18, -5,  4, 4, 22, true ],
      [ -9, -2,  3, 3, 16, false],
      [  0, -8,  5, 5, 30, true ],
      [  9, -3,  3, 4, 18, false],
      [ 18, -6,  4, 4, 24, true ],
      [-22,  4,  3, 3, 12, false],
      [ -5,  6,  3, 3, 14, true ],
      [  5,  5,  4, 3, 10, false],
      [ 22,  3,  3, 3, 15, true ],
      [-12,  8,  2, 2,  8, false],
      [ 13,  7,  2, 3,  9, true ],
      [  0,  9,  3, 2, 11, false],
    ] as const

    for (const [x, z, w, d, h, isOrange] of buildingData) {
      const geo = new THREE.BoxGeometry(w, h, d)
      const edges = new THREE.EdgesGeometry(geo)
      const color = isOrange ? ORANGE : CYAN
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
      })
      const building = new THREE.LineSegments(edges, mat)
      building.position.set(x, h / 2 - 8, z)
      scene.add(building)
      buildings.push(building)
      geo.dispose()
    }

    // ── Particles ──
    const particleCount = 800
    const positions = new Float32Array(particleCount * 3)
    const colors    = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 120
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120

      const c = Math.random() > 0.5 ? ORANGE : CYAN
      colors[i * 3]     = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particleGeo.setAttribute('color',    new THREE.BufferAttribute(colors,    3))

    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // ── Mouse parallax ──
    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth)  * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    document.addEventListener('mousemove', onMouseMove)

    // ── Resize ──
    const onResize = () => {
      if (!el) return
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    // ── Animate ──
    let frameId: number
    let t = 0

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      t += 0.004

      // Slow auto-rotation of the whole city
      scene.rotation.y = t * 0.12 + mouseX * 0.08

      // Camera subtle bob
      camera.position.y = 18 + Math.sin(t * 0.5) * 1.5 + mouseY * -2
      camera.lookAt(0, 0, 0)

      // Pulse opacity on each building
      buildings.forEach((b, i) => {
        const mat = b.material as THREE.LineBasicMaterial
        mat.opacity = 0.35 + Math.sin(t + i * 0.7) * 0.2
      })

      particles.rotation.y = t * 0.05

      renderer.render(scene, camera)
    }
    animate()

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(frameId)
      document.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)

      scene.remove(gridHelper)
      gridHelper.geometry.dispose()
      ;(gridHelper.material as THREE.Material).dispose()

      buildings.forEach(b => {
        scene.remove(b)
        b.geometry.dispose()
        ;(b.material as THREE.Material).dispose()
      })

      scene.remove(particles)
      particleGeo.dispose()
      particleMat.dispose()

      scene.clear()

      renderer.dispose()
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement)
      }
    }
  }, [mountRef])
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImobiliariaPage() {
  const [scrolled, setScrolled] = useState(false)
  const mountRef = useRef<HTMLDivElement>(null)

  useCityscape(mountRef)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Container>
      {/* Nav */}
      <Nav $scrolled={scrolled}>
        <NavInner>
          <NavLogo>V<em>.</em>IJALES</NavLogo>
          <NavLinks>
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#arquitetura">Arquitetura</NavLink>
            <BackLink href="/#portfolio">← Portfólio</BackLink>
          </NavLinks>
        </NavInner>
      </Nav>

      {/* Hero */}
      <Hero>
        <ThreeMount ref={mountRef} aria-hidden="true" />
        <HeroOverlay />
        <HeroContent>
          <HeroBadge>Plataforma Web · Imobiliário</HeroBadge>
          <HeroTitle>
            Plataforma<br />
            <span className="orange">Imobiliária</span><br />
            <span className="cyan">Full&#8209;Stack</span>
          </HeroTitle>
          <HeroSub>
            Sistema completo para imobiliárias — do catálogo inteligente
            ao painel administrativo — desenvolvido em Django com arquitetura
            desacoplada e pronto para escalar.
          </HeroSub>
          <HeroStats>
            <Stat>
              <span className="value">6+</span>
              <span className="label">Módulos</span>
            </Stat>
            <Stat>
              <span className="value">5</span>
              <span className="label">Tipos de Imóvel</span>
            </Stat>
            <Stat>
              <span className="value">100%</span>
              <span className="label">Responsivo</span>
            </Stat>
          </HeroStats>
        </HeroContent>
        <ScrollHint>scroll</ScrollHint>
      </Hero>

      {/* Overview */}
      <SectionWrap>
        <OverviewGrid>
          <OverviewText>
            <SectionLabel>Sobre o Projeto</SectionLabel>
            <SectionTitle>Uma solução real para imobiliárias</SectionTitle>
            <SectionDivider />
            <p>
              O <strong>Imobi Template</strong> é uma plataforma web desenvolvida em
              Python/Django pensada para imobiliárias que precisam de um sistema robusto,
              elegante e de fácil gestão. Desde o primeiro acesso do visitante até o
              fechamento da consulta, cada fluxo foi desenhado para converter.
            </p>
            <p>
              A arquitetura segue o padrão <strong>Service Layer + Repository</strong>,
              separando regras de negócio, acesso a dados e camada de apresentação.
              Isso garante manutenibilidade, testabilidade e facilidade de evolução
              do produto conforme as necessidades da imobiliária crescem.
            </p>
            <p>
              O objetivo é claro: <strong>mostrar imóveis, capturar leads e facilitar
              a gestão</strong> — tudo em uma única plataforma sem dependências externas
              caras.
            </p>
          </OverviewText>
          <Screenshot>
            <img src="/assets/main/Imobiliaria.png" alt="Screenshot da plataforma Imobi Template" />
          </Screenshot>
        </OverviewGrid>
      </SectionWrap>

      {/* Features */}
      <SectionWrap id="features">
        <SectionLabel>Funcionalidades</SectionLabel>
        <SectionTitle>O que a plataforma entrega</SectionTitle>
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

      {/* Architecture */}
      <SectionWrap id="arquitetura">
        <SectionLabel>Arquitetura</SectionLabel>
        <SectionTitle>Código que escala</SectionTitle>
        <SectionDivider />
        <ArchGrid>
          <ArchBlock>
            <h3>Backend</h3>
            <ArchList>
              {ARCH_BACKEND.map(item => (
                <ArchItem key={item}>{item}</ArchItem>
              ))}
            </ArchList>
          </ArchBlock>
          <ArchBlock>
            <h3>Frontend / UX</h3>
            <ArchList>
              {ARCH_FRONTEND.map(item => (
                <ArchItem key={item}>{item}</ArchItem>
              ))}
            </ArchList>
          </ArchBlock>
        </ArchGrid>
      </SectionWrap>

      {/* Tech Stack */}
      <TechWrap>
        <TechInner>
          <SectionLabel>Stack Tecnológico</SectionLabel>
          <SectionTitle>Tecnologias utilizadas</SectionTitle>
          <SectionDivider />
          <TechGrid>
            {TECH.map(t => (
              <TechBadge key={t.label} $cyan={t.cyan}>{t.label}</TechBadge>
            ))}
          </TechGrid>
        </TechInner>
      </TechWrap>

      {/* CTA */}
      <CTASection>
        <SectionLabel>Próximo Passo</SectionLabel>
        <CTATitle>
          Quer uma plataforma<br />
          <span>assim para o seu negócio?</span>
        </CTATitle>
        <CTASub>
          Desenvolvemos soluções digitais sob medida para imobiliárias,
          com identidade visual própria e funcionalidades adaptadas ao
          seu fluxo de trabalho.
        </CTASub>
        <CTABtn href="/#contact">Fale com a gente</CTABtn>
      </CTASection>

      {/* Footer */}
      <Footer>
        <FooterBack href="/#portfolio">← Voltar ao portfólio</FooterBack>
      </Footer>
    </Container>
  )
}
