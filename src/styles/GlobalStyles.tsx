'use client'

import { createGlobalStyle } from 'styled-components'
import { usePathname } from 'next/navigation'

const StyledGlobalStyles = createGlobalStyle<{ $isHome: boolean }>`
  /* Reset css */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
    height: 100%;
    overflow: ${props => props.$isHome ? 'hidden' : 'auto'};
    overscroll-behavior: ${props => props.$isHome ? 'none' : 'auto'};
  }

  body, h1, h2, h3, h4, p, figure, blockquote, dl, dd {
    margin-block-end: 0;
  }

  ul[role='list'], ol[role='list'] {
    list-style: none;
  }

  body {
    height: 100%;
    min-height: 100vh;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: ${props => props.$isHome ? 'hidden' : 'auto'};
    position: ${props => props.$isHome ? 'fixed' : 'static'};
    overscroll-behavior: ${props => props.$isHome ? 'none' : 'auto'};
    background-color: #000;
    color: #fff;
    scrollbar-width: ${props => props.$isHome ? 'none' : 'auto'};
  }

  body::-webkit-scrollbar {
    display: none;
  }

  h1, h2, h3, h4, button, input, label {
    line-height: 1.1;
  }

  h1, h2, h3, h4 {
    text-wrap: balance;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
    color: currentColor;
  }

  img, picture {
    max-width: 100%;
    display: block;
  }

  input, button, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }

  textarea:not([rows]) {
    min-height: 10em;
  }

  :target {
    scroll-margin-block: 5ex;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(0deg);
    }
    50% {
      transform: translateY(-30px) rotate(5deg);
    }
  }

  /* Seção emerge do tunnel — glitch digital sem desvio de matiz */
  @keyframes materialize {
    0%   { opacity: 0;    filter: brightness(8) contrast(3) saturate(3);  transform: translateX(0); }
    6%   { opacity: 0.45; filter: brightness(6) contrast(2) saturate(4);  transform: translateX(-8px); }
    11%  { opacity: 0.35; filter: brightness(7) contrast(3) saturate(5);  transform: translateX(8px); }
    16%  { opacity: 0.6;  filter: brightness(4) contrast(2) saturate(3);  transform: translateX(-4px); }
    22%  { opacity: 0.75; filter: brightness(2) contrast(1.5) saturate(2); transform: translateX(0); }
    50%  { opacity: 0.9;  filter: brightness(1.4) contrast(1.1); }
    100% { opacity: 1;    filter: brightness(1) contrast(1);               transform: translateX(0); }
  }

  /* Elementos revelados da esquerda — feel de dados sendo carregados */
  @keyframes drawIn {
    0%   { clip-path: inset(0 100% 0 0); filter: brightness(4); }
    60%  { clip-path: inset(0 0% 0 0);   filter: brightness(1.8); }
    100% { clip-path: inset(0 0% 0 0);   filter: brightness(1); }
  }

  /* Anel externo girando no vórtice de scroll */
  @keyframes vortexSpin {
    to { transform: rotate(360deg); }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}`

export default function GlobalStyles() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  return <StyledGlobalStyles $isHome={isHome} />
}
