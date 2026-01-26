'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  /* Reset css */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }

  body, h1, h2, h3, h4, p, figure, blockquote, dl, dd {
    margin-block-end: 0;
  }

  ul[role='list'], ol[role='list'] {
    list-style: none;
  }

  body {
    min-height: 100vh;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: #000;
    color: #fff;
    scroll-behavior: smooth;
    
    /* Scroll Snap Config */
    scroll-snap-type: y mandatory;
    scroll-padding-top: 80px; /* Offset for sticky nav */
    scrollbar-width: none; /* Firefox */
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
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

  /* Custom Selection Color */
  ::selection {
    background: #ff4500;
    color: #fff;
  }
`

export default GlobalStyles
