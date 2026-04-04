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

  /* Seção emerge do tunnel — brightness flash que estabiliza */
  @keyframes materialize {
    0%   { opacity: 0; filter: brightness(8) blur(16px) saturate(4); }
    25%  { opacity: 0.7; filter: brightness(2.5) blur(6px) saturate(2); }
    65%  { opacity: 0.95; filter: brightness(1.3) blur(1px) saturate(1.2); }
    100% { opacity: 1; filter: brightness(1) blur(0px) saturate(1); }
  }

  /* Filhos da seção se materializam em cascata após o tunnel */
  @keyframes contentReveal {
    0%   { opacity: 0; transform: translateY(18px); filter: blur(6px) brightness(3); }
    40%  { filter: blur(2px) brightness(1.5); }
    100% { opacity: 1; transform: translateY(0); filter: blur(0) brightness(1); }
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
