# Melhorias Identificadas

## Crítico

### 1. Memory leak no Three.js — `ThreeBackground.tsx`
Geometrias e materiais nunca são descartados. O cleanup precisa chamar `.dispose()`.
```ts
// Adicionar no cleanup do useEffect:
particles?.geometry.dispose()
particles?.material.dispose()
gridRunners.forEach(runner => {
  runner.line.geometry.dispose()
  runner.line.material.dispose()
})
```
- [ ] Resolvido

---

### 2. Memory leak nos event listeners — `usePageScroll.ts`
`handleWheel`/`handleTouchMove` são recriados via `useCallback` quando `processMovement` muda, mas os listeners antigos não são removidos. Listeners duplicados acumulam com o tempo.
- [ ] Resolvido

---

### 3. API de contato sem implementação — `api/contact/route.ts`
- Sem validação de formato de email
- Sem rate limiting
- `setTimeout(1000ms)` artificial sem propósito
- Nenhum serviço de email integrado — o formulário não envia nada
- [ ] Resolvido

---

## Segurança

### 4. Número de WhatsApp hardcoded no cliente — `ContactSection.tsx`
```ts
const WHATSAPP_NUMBER = '5548988699159' // visível no bundle
```
Mover para variável de ambiente (`NEXT_PUBLIC_WHATSAPP_NUMBER`).
- [ ] Resolvido

---

## Performance

### 5. Animações CSS rodando fora da tela — `ContactSection.tsx`
`orbitPing`, `glowScan`, `float` rodam continuamente mesmo quando a seção não está visível.
Usar `animation-play-state: paused` condicionado ao prop `isActive`.
- [ ] Resolvido

### 6. Ref callbacks inline recriados a cada render — `page.tsx`
```tsx
ref={el => { sectionRefs.current[0] = el }} // recriado todo render
```
Estabilizar com `useCallback`.
- [ ] Resolvido

---

## Acessibilidade

### 7. Canvas decorativo sem `aria-hidden` — `ThreeBackground.tsx`
```tsx
// Adicionar:
aria-hidden="true"
```
- [ ] Resolvido

### 8. Links externos sem `rel` — `Sidebar.tsx`
```tsx
<a href="https://github.com" target="_blank"> // faltando rel="noopener noreferrer"
<a href="https://linkedin.com" target="_blank">
```
- [ ] Resolvido

### 9. Dots de navegação com tag errada — `Sidebar.tsx`
Âncoras com `e.preventDefault()` deveriam ser `<button>` com atributos ARIA adequados.
- [ ] Resolvido

---

## Código Morto

### 10. Navbar comentada — `layout.tsx:62`
```tsx
{/* <Navbar /> */}
```
Remover ou implementar.
- [ ] Resolvido

### 11. Comentário de código substituído — `HeroSection.tsx:153`
```ts
// const [ref, isVisible] = useIntersectionObserver(...) -> Replaced by isActive prop
```
Remover comentário.
- [ ] Resolvido

### 12. Keyframe `glitchText` no global — `GlobalStyles.tsx`
Definido em GlobalStyles mas só usado em HeroSection. Mover para o componente.
- [ ] Resolvido
