'use client'

import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  position: relative;
  display: none;
  width: 100%;
  padding: 4rem 10% 2rem;
  background: #000;
  border-top: 1px solid rgba(255, 69, 0, 0.3);
  overflow: hidden;
  scroll-snap-align: end;
  z-index: 10;
`

const FooterGridBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 69, 0, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 69, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;
  z-index: -1;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h4 {
    color: #ff4500;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 0.5rem;
  }
`

const ContactList = styled.ul`
  list-style: none;
  
  li {
    margin-bottom: 0.5rem;
    
    a {
      color: #ccc;
      text-decoration: none;
      transition: color 0.3s;
      
      &:hover {
        color: #ff4500;
      }
    }
  }
`

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  
  a {
    width: 40px;
    height: 40px;
    border: 1px solid rgba(255, 69, 0, 0.5);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff4500;
    text-decoration: none;
    transition: all 0.3s;
    font-weight: bold;
    font-size: 0.9rem;
    
    &:hover {
      background: rgba(255, 69, 0, 0.1);
      box-shadow: 0 0 15px rgba(255, 69, 0, 0.3);
      transform: translateY(-2px);
    }
  }
`

const FooterBottom = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const FooterLogoV = styled.div`
  width: 30px;
  height: 30px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`

const FooterLogoText = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 2px;
  color: #fff;
`

const Copyright = styled.div`
  color: #666;
  font-size: 0.9rem;
`

export default function Footer() {
  return (
    <FooterContainer>
      <FooterGridBg />
      <FooterContent>
        <FooterColumn>
          <h4>Contato</h4>
          <ContactList>
            <li><a href="mailto:vijales2000@gmail.com">vijales2000@gmail.com</a></li>
            <li><a href="https://wa.me/5548998699159" target="_blank" rel="noopener noreferrer">+55 48 99869-9159</a></li>
          </ContactList>
          <SocialIcons>
            <a href="#" aria-label="Facebook">F</a>
            <a href="#" aria-label="LinkedIn">IN</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="GitHub">GH</a>
          </SocialIcons>
        </FooterColumn>
      </FooterContent>

      <FooterBottom>
        <FooterLogo>
          <FooterLogoV className="footer-logo-v">
            <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <line x1="10" y1="15" x2="20" y2="30" stroke="#ff4500" strokeWidth="3" strokeLinecap="round" />
              <line x1="20" y1="30" x2="30" y2="45" stroke="#ff4500" strokeWidth="4" strokeLinecap="round" />
              <line x1="50" y1="15" x2="40" y2="30" stroke="#ff4500" strokeWidth="3" strokeLinecap="round" />
              <line x1="40" y1="30" x2="30" y2="45" stroke="#ff4500" strokeWidth="4" strokeLinecap="round" />
              <circle cx="30" cy="45" r="3.5" fill="#ff4500" />
            </svg>
          </FooterLogoV>
          <FooterLogoText>VIJALES</FooterLogoText>
        </FooterLogo>

        <Copyright>
          © 2025 Vijales. The Future is Now.
        </Copyright>
      </FooterBottom>
    </FooterContainer>
  )
}
