'use client'

import React, { useState } from 'react'
import styled from 'styled-components'

const ContactWrapper = styled.section`
  padding: 4rem 5%;
  position: relative;
  z-index: 10;

  @media (max-width: 768px) {
    padding: 2rem 5%;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }

  .v-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 2rem;
    filter: drop-shadow(0 0 20px rgba(255, 69, 0, 0.8));
    
    @media (max-width: 768px) {
      width: 60px;
      height: 60px;
      margin-bottom: 1rem;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  }

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 15px;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 69, 0, 0.5);

    @media (max-width: 768px) {
      font-size: 1.5rem;
      letter-spacing: 8px;
    }
  }

  p {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    letter-spacing: 2px;
    font-weight: 300;
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3rem;
  background: rgba(10, 10, 10, 0.7);
  border: 1px solid rgba(255, 69, 0, 0.15);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 4px;
  filter: drop-shadow(0 0 25px rgba(0, 0, 0, 0.9));
  position: relative;
  clip-path: polygon(40px 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%, 0 40px);

  @media (max-width: 768px) {
    padding: 1.5rem;
    clip-path: polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    border-top: 3px solid #ff4500;
    border-right: 3px solid #ff4500;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 30px;
    height: 30px;
    border-bottom: 3px solid #ff4500;
    border-left: 3px solid #ff4500;
    pointer-events: none;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`;

const FormGroup = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  background: rgba(10, 10, 10, 0.4);
  border: 1px solid rgba(255, 69, 0, 0.1);
  border-left: 2px solid rgba(255, 69, 0, 0.3);
  padding: 1rem 1.2rem;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 1px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);

  &:focus, &:not(:placeholder-shown) {
    background: rgba(255, 69, 0, 0.05);
    border-color: rgba(255, 69, 0, 0.6);
    border-left-width: 4px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:focus ~ label, &:not(:placeholder-shown) ~ label {
    top: -1.6rem;
    left: 0;
    font-size: 0.75rem;
    color: #ff4500;
    text-shadow: 0 0 10px rgba(255, 69, 0, 0.6);
    font-weight: 700;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  background: rgba(10, 10, 10, 0.4);
  border: 1px solid rgba(255, 69, 0, 0.1);
  border-left: 2px solid rgba(255, 69, 0, 0.3);
  padding: 1rem 1.2rem;
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  letter-spacing: 1px;
  resize: vertical;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);

  &:focus, &:not(:placeholder-shown) {
    background: rgba(255, 69, 0, 0.05);
    border-color: rgba(255, 69, 0, 0.6);
    border-left-width: 4px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }

  &:focus ~ label, &:not(:placeholder-shown) ~ label {
    top: -1.6rem;
    left: 0;
    font-size: 0.75rem;
    color: #ff4500;
    text-shadow: 0 0 10px rgba(255, 69, 0, 0.6);
    font-weight: 700;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 1.2rem;
  top: 1rem;
  color: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 2px;
`;

const SubmitBtn = styled.button`
  align-self: flex-start;
  padding: 1.2rem 3.5rem;
  background: rgba(255, 69, 0, 0.1);
  border: 1px solid #ff4500;
  color: #ff4500;
  font-family: inherit;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
  margin-top: 1.5rem;
  font-size: 0.9rem;
  clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px);

  &:hover {
    background: #ff4500;
    color: #000;
    box-shadow: 0 0 30px rgba(255, 69, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    letter-spacing: 6px;
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;



interface ContactSectionProps {
  isActive?: boolean;
}

export default function ContactSection({ isActive = false }: ContactSectionProps) {
  // const [ref, isVisible] = useIntersectionObserver(...) -> Replaced
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  return (
    <ContactWrapper id="contact" className={isActive ? 'active' : ''}>
      <SectionHeader>
        <div className="v-icon">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ff4500" strokeWidth="2" opacity="0.4" />
            <g transform="translate(25, 30) scale(1)">
              <rect x="0" y="0" width="50" height="35" rx="3" fill="none" stroke="#ff4500" strokeWidth="3" />
              <polyline points="0,0 25,20 50,0" fill="none" stroke="#ff4500" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <circle cx="50" cy="50" r="48" fill="none" stroke="#ff4500" strokeWidth="1" opacity="0">
              <animate attributeName="r" values="45;55" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;0.3;0" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
        <h2>CONTATO</h2>
        <p>Conecte-se com o futuro</p>
      </SectionHeader>

      <Container className="contact-container">
        <Form onSubmit={handleSubmit} className="contact-form">
          <FormRow className="form-row">
            <FormGroup className="form-group">
              <Input
                type="text"
                id="name"
                name="name"
                required
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
              />
              <Label htmlFor="name">Nome</Label>
            </FormGroup>
            <FormGroup className="form-group">
              <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
              />
              <Label htmlFor="email">Email</Label>
            </FormGroup>
          </FormRow>
          <FormGroup className="form-group">
            <Input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder=" "
              value={formData.subject}
              onChange={handleChange}
            />
            <Label htmlFor="subject">Assunto</Label>
          </FormGroup>
          <FormGroup className="form-group">
            <TextArea
              id="message"
              name="message"
              required
              placeholder=" "
              rows={5}
              value={formData.message}
              onChange={handleChange}
            />
            <Label htmlFor="message">Mensagem</Label>
          </FormGroup>

          <SubmitBtn type="submit" className="submit-btn" disabled={status === 'loading'}>
            <span className="btn-text">
              {status === 'loading' ? 'ENVIANDO...' : 'ENVIAR TRANSMISSÃO'}
            </span>
            {status === 'success' && <p style={{ color: '#00ff00', marginTop: '1rem' }}>Sinal enviado com sucesso!</p>}
            {status === 'error' && <p style={{ color: '#ff0000', marginTop: '1rem' }}>Erro na transmissão. Tente novamente.</p>}
          </SubmitBtn>
        </Form>
      </Container>
    </ContactWrapper>
  )
}
