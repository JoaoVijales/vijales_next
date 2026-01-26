'use client'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
  background-color: #f0f0f0;
`

const Title = styled.h1`
  font-size: 3rem;
  color: #0070f3;
  margin: 0;
`

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #333;
`

const Button = styled.button`
  padding: 10px 20px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }
`

export default function Home() {
  return (
    <Container>
      <Title>Olá! Next.js + Styled Components</Title>
      <Subtitle>Seu projeto foi iniciado com sucesso.</Subtitle>
      <Button onClick={() => alert('Funcionando!')}>Clique em mim</Button>
    </Container>
  )
}
