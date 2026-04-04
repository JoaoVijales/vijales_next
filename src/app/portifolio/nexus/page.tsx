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
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.4); }
  50%       { box-shadow: 0 0 50px rgba(99, 102, 241, 0.8), 0 0 100px rgba(99, 102, 241, 0.15); }
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
  background: #020617;
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
  background:      ${p => p.$scrolled ? 'rgba(2,6,23,0.95)' : 'transparent'};
  backdrop-filter: ${p => p.$scrolled ? 'blur(12px)'        : 'none'};
  border-bottom:   ${p => p.$scrolled ? '1px solid rgba(99,102,241,0.2)' : 'none'};
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

  em { color: #6366f1; font-style: normal; }
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

  &:hover { color: #6366f1; }

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
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  transition: color 0.2s, opacity 0.2s;
  border: 1px solid rgba(99,102,241,0.4);
  padding: 0.4rem 0.8rem;
  border-radius: 2px;

  &:hover {
    color: #6366f1;
    border-color: #6366f1;
  }
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
    rgba(2,6,23,0.85) 0%,
    rgba(2,6,23,0.3) 55%,
    rgba(2,6,23,0.65) 100%
  );

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(99,102,241,0.2), transparent);
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
  background: rgba(99,102,241,0.1);
  border: 1px solid rgba(99,102,241,0.45);
  color: #818cf8;
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

  .indigo { color: #6366f1; }
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
    color: #6366f1;
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
    background: linear-gradient(to bottom, rgba(99,102,241,0.9), transparent);
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
  color: #6366f1;
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
  background: linear-gradient(90deg, #6366f1, #00C8FF);
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
    background: linear-gradient(135deg, #6366f1, #00C8FF, #6366f1);
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
    background: #6366f1;
    clip-path: polygon(100% 0, 100% 100%, 0 100%);
    transition: background 0.3s;
  }

  &:hover {
    border-color: rgba(99,102,241,0.35);
    background: rgba(99,102,241,0.04);
    transform: translateY(-5px);
    box-shadow: 0 24px 48px rgba(99,102,241,0.08);
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
    color: #6366f1;
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
  border: 1px solid ${p => p.$cyan ? 'rgba(0,200,255,0.35)' : 'rgba(99,102,241,0.3)'};
  color: ${p => p.$cyan ? '#00C8FF' : '#818cf8'};
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
    background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%);
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

  span { color: #6366f1; }
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
  background: #6366f1;
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
    background: #818cf8;
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
    border-color: #6366f1;
    color: #818cf8;
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
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color 0.2s;

  &:hover { color: #6366f1; }
`

// ─── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: '🏋️',
    title: 'Catálogo de Modalidades',
    desc: 'Apresentação completa das aulas — Musculação, Yoga, Cross Training, Boxe, Cardio e Spinning — com descrições e imagens.',
  },
  {
    icon: '💳',
    title: 'Planos e Preços',
    desc: 'Três planos (Básico, Premium, Elite) com comparação de benefícios e botão de matrícula direto para conversão.',
  },
  {
    icon: '📅',
    title: 'Grade de Horários',
    desc: 'Tabela semanal interativa com todas as aulas, instrutores e horários disponíveis para facilitar o planejamento do aluno.',
  },
  {
    icon: '👥',
    title: 'Time de Instrutores',
    desc: 'Perfis dos profissionais com foto, especialidade e credenciais para gerar credibilidade e conexão com o visitante.',
  },
  {
    icon: '⭐',
    title: 'Depoimentos',
    desc: 'Seção de testemunhos de alunos reais com foto, nome e resultado alcançado para aumentar a taxa de conversão.',
  },
  {
    icon: '📍',
    title: 'Localização e Contato',
    desc: 'Mapa integrado, endereço, telefone e formulário de contato para facilitar o primeiro passo do visitante.',
  },
]

const ARCH_DESIGN = [
  'Layout responsivo mobile-first',
  'Navegação fixa com transparência ao scroll',
  'Seções em carrossel horizontal para modalidades',
  'Cards de plano com destaque no Premium',
  'Galeria de depoimentos com avatar e rating',
  'Animações de entrada com fadeInUp',
]

const ARCH_UX = [
  'CTA primário no hero direcionado à matrícula',
  'Grade de horários com filtro por dia',
  'Perfis de instrutores com hover interativo',
  'Formulário de contato com validação',
  'Footer com links rápidos e redes sociais',
  'Paleta escura com accent índigo/azul',
]

const TECH = [
  { label: 'Next.js',           cyan: false },
  { label: 'React 19',          cyan: false },
  { label: 'TypeScript',        cyan: false },
  { label: 'Styled-Components', cyan: true  },
  { label: 'Material Symbols',  cyan: true  },
  { label: 'CSS Animations',    cyan: true  },
]

// ─── Three.js Gym Scene ───────────────────────────────────────────────────────

function useGymScene(mountRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020617, 0.022)

    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 500)
    camera.position.set(0, 12, 48)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const INDIGO = new THREE.Color(0x6366f1)
    const CYAN   = new THREE.Color(0x00c8ff)

    const grid = new THREE.GridHelper(200, 40, 0x6366f1, 0x0a0a1a)
    ;(grid.material as THREE.Material).opacity = 0.25
    ;(grid.material as THREE.Material).transparent = true
    grid.position.y = -8
    scene.add(grid)

    const rings: THREE.LineSegments[] = []
    const ringData = [
      [-16, 4, -4, 14, true ],
      [  0, 6, -8, 20, false],
      [ 16, 3, -3, 12, true ],
      [ -8, 8,  4, 10, false],
      [  8, 5,  5, 16, true ],
    ] as const

    for (const [x, y, z, r, isIndigo] of ringData) {
      const geo = new THREE.TorusGeometry(r * 0.4, 0.08, 6, 6)
      const edges = new THREE.EdgesGeometry(geo)
      const mat = new THREE.LineBasicMaterial({
        color: isIndigo ? INDIGO : CYAN,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
      })
      const ring = new THREE.LineSegments(edges, mat)
      ring.position.set(x, y - 8, z)
      scene.add(ring)
      rings.push(ring)
      geo.dispose()
    }

    const count = 900
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 120
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 120
      const c = Math.random() > 0.5 ? INDIGO : CYAN
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }

    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3))

    const pMat = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
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
      t += 0.004

      scene.rotation.y = t * 0.1 + mouseX * 0.07
      camera.position.y = 12 + Math.sin(t * 0.4) * 1.5 + mouseY * -2
      camera.lookAt(0, 0, 0)

      rings.forEach((r, i) => {
        r.rotation.x = t * 0.3 + i * 0.5
        r.rotation.z = t * 0.2 + i * 0.3
        ;(r.material as THREE.LineBasicMaterial).opacity = 0.3 + Math.sin(t + i * 0.9) * 0.2
      })

      particles.rotation.y = t * 0.04
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

      rings.forEach(r => {
        scene.remove(r)
        r.geometry.dispose()
        ;(r.material as THREE.Material).dispose()
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

export default function NexusPage() {
  const [scrolled, setScrolled] = useState(false)
  const mountRef = useRef<HTMLDivElement>(null)

  useGymScene(mountRef)

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
          <HeroBadge>Template Web · Academia & Fitness</HeroBadge>
          <HeroTitle>
            Nexus<br />
            <span className="indigo">Fitness</span><br />
            <span className="cyan">Club</span>
          </HeroTitle>
          <HeroSub>
            Landing page de alto impacto para academias — do catálogo de
            modalidades à grade de horários — desenvolvida para converter
            visitantes em alunos.
          </HeroSub>
          <HeroStats>
            <Stat>
              <span className="value">6</span>
              <span className="label">Modalidades</span>
            </Stat>
            <Stat>
              <span className="value">3</span>
              <span className="label">Planos</span>
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
            <SectionTitle>Uma academia que converte</SectionTitle>
            <SectionDivider />
            <p>
              O <strong>Nexus Fitness Club</strong> é um template web completo
              para academias e estúdios de fitness que precisam de uma presença
              digital profissional e orientada à conversão. Cada seção foi
              projetada para conduzir o visitante do interesse à matrícula.
            </p>
            <p>
              O design segue uma paleta escura com accents em índigo e azul,
              criando uma identidade visual moderna, energética e confiante.
              A navegação é fluida e as seções são construídas para guiar a
              jornada do usuário de forma intuitiva.
            </p>
            <p>
              O objetivo é claro: <strong>apresentar as modalidades, mostrar
              os planos e facilitar o primeiro contato</strong> — tudo em
              uma única página de alta performance.
            </p>
          </OverviewText>
          <Screenshot>
            <img src="/assets/main/nexus_fit.png" alt="Screenshot do Nexus Fitness Club" />
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
        <SectionTitle>Construído para converter</SectionTitle>
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
            <h3>UX & Conversão</h3>
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
              <TechBadge key={t.label} $cyan={t.cyan}>{t.label}</TechBadge>
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
          Acesse o template completo e navegue pela experiência real —
          ou fale com a gente para desenvolver uma solução personalizada
          para a sua academia.
        </CTASub>
        <CTAButtons>
          <CTABtn href="/portifolio/nexus/site">Ver o projeto →</CTABtn>
          <CTABtnOutline href="/#contact">Fale com a gente</CTABtnOutline>
        </CTAButtons>
      </CTASection>

      <Footer>
        <FooterBack href="/#portfolio">← Voltar ao portfólio</FooterBack>
      </Footer>
    </Container>
  )
}
