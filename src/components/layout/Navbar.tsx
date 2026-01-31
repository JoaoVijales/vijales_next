'use client'

import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  display: none;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  background: rgba(0, 0, 0, 0.9);
  border-bottom: 2px solid rgba(0, 200, 255, 0.5); /* #00C8FF80 */
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 30px rgba(255, 69, 0, 0.1);
  transition: transform 0.3s ease-in-out;
`

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`

const LogoV = styled.div`
  width: 50px;
  height: 50px;
  
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 5px #ff4500);
  }
`

const LogoText = styled.div`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`

const NavLinks = styled.ul`
  display: none;
  list-style: none;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }

  li a {
    text-decoration: none;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    transition: all 0.3s ease;
    position: relative;
    padding: 5px 0;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #ff4500;
      transition: width 0.3s ease;
      box-shadow: 0 0 10px #ff4500;
    }

    &:hover {
      color: #ff4500;
      text-shadow: 0 0 8px #ff4500;
      
      &::after {
        width: 100%;
      }
    }
  }
`

const MenuButton = styled.button`
  display: block;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1002;
  padding: 10px;

  @media (min-width: 768px) {
    display: none;
  }
`

const Hamburger = styled.span`
  display: block;
  width: 30px;
  height: 3px;
  background-color: #ff4500;
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 5px #ff4500;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #ff4500;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 0 5px #ff4500;
  }

  &::before {
    transform: translateY(-10px);
  }

  &::after {
    transform: translateY(10px);
  }

  /* Valid for non-styled-components prop handling too if we passed isOpen */
  &.open {
    background-color: transparent;
    box-shadow: none;
    
    &::before {
      transform: rotate(45deg);
    }
    
    &::after {
      transform: rotate(-45deg);
    }
  }
`

const NavDrawer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 280px;
  height: 100vh;
  background: rgba(10, 10, 10, 0.95);
  border-left: 2px solid #ff4500;
  z-index: 1001;
  padding: 80px 20px;
  transform: translateX(${props => (props.$isOpen ? '0' : '100%')});
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -5px 0 30px rgba(255, 69, 0, 0.2);
`

const DrawerList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  li a {
    text-decoration: none;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    display: block;
    padding: 10px;
    border-bottom: 1px solid rgba(255, 69, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
      color: #ff4500;
      padding-left: 20px;
      background: rgba(255, 69, 0, 0.1);
      border-bottom-color: #ff4500;
    }
  }
`

const Backdrop = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 1000;
  opacity: ${props => (props.$isOpen ? 1 : 0)};
  visibility: ${props => (props.$isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s;
`

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <Nav>
        <LogoContainer>
          <LogoV className="logo-v">
            <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <line x1="10" y1="15" x2="20" y2="30" stroke="#ff4500" strokeWidth="3" strokeLinecap="round" />
              <line x1="20" y1="30" x2="30" y2="45" stroke="#ff4500" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="15" x2="40" y2="30" stroke="#ff4500" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="30" x2="30" y2="45" stroke="#ff4500" strokeWidth="4" strokeLinecap="round" />
              <circle cx="10" cy="15" r="3" fill="#ff4500" />
              <circle cx="20" cy="30" r="2.5" fill="#ff4500" />
              <circle cx="50" cy="15" r="3" fill="#ff4500" />
              <circle cx="40" cy="30" r="2.5" fill="#ff4500" />
              <circle cx="30" cy="45" r="3.5" fill="#ff4500" />
            </svg>
          </LogoV>
          <LogoText>IJALES</LogoText>
        </LogoContainer>

        <NavLinks>
          <li><Link href="#home">Home</Link></li>
          <li><Link href="#services">Serviços</Link></li>
          <li><Link href="#portfolio">Portfolio</Link></li>
          <li><Link href="#contact">Contato</Link></li>
        </NavLinks>

        <MenuButton
          onClick={toggleMenu}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
        >
          <Hamburger className={isOpen ? 'open' : ''} aria-hidden="true" />
        </MenuButton>
      </Nav>

      <Backdrop $isOpen={isOpen} onClick={closeMenu} />

      <NavDrawer $isOpen={isOpen} aria-hidden={!isOpen}>
        <DrawerList>
          <li><Link href="#home" onClick={closeMenu}>Home</Link></li>
          <li><Link href="#services" onClick={closeMenu}>Serviços</Link></li>
          <li><Link href="#portfolio" onClick={closeMenu}>Portfolio</Link></li>
          <li><Link href="#contact" onClick={closeMenu}>Contato</Link></li>
        </DrawerList>
        <button
          onClick={closeMenu}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '2rem',
            cursor: 'pointer'
          }}
        >
          &times;
        </button>
      </NavDrawer>
    </>
  )
}
