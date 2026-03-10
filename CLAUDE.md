# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Meta:** Ao editar este arquivo, sempre refatore — remova redundâncias, mantenha conciso. Não apenas acrescente.

---

## Commands

```bash
npm run dev              # Dev server em localhost:3000
npm run build            # Build de produção
npm run lint             # ESLint
npm run test             # Jest (todos os testes)
npm run test:watch       # Jest em modo watch
npm run test:coverage    # Relatório de cobertura
npx jest <caminho>       # Rodar um único arquivo de teste
```

---

## Princípios de Desenvolvimento

### Clean Code
- Nomes revelam intenção: variáveis, funções e componentes com nomes claros e descritivos
- Funções fazem uma coisa só — se precisar de "e" para descrever, dividir
- Sem comentários explicando *o que* o código faz; comentários explicam *por quê* quando necessário
- Sem código morto: remover `console.log`, imports não usados, código comentado

### SOLID
- **S** — Cada componente/hook tem uma responsabilidade única
- **O** — Extender comportamento via props/composição, não modificar componentes existentes
- **L** — Componentes filhos substituíveis sem quebrar o pai
- **I** — Props específicas por uso; evitar prop bags genéricas
- **D** — Depender de abstrações (interfaces, hooks) não de implementações concretas

### TDD
Fluxo obrigatório para novas funcionalidades e correções de bugs:

```
1. Red   — escrever o teste que falha
2. Green  — escrever o mínimo de código para passar
3. Refactor — limpar sem quebrar os testes
```

- Testes ficam em `__tests__/` próximo ao componente/hook testado
- Nomenclatura: `<Componente>.test.tsx` ou `<hook>.test.ts`
- Cobrir: comportamento visível ao usuário, não detalhes de implementação
- Mocks de Three.js e eventos de scroll já estão configurados em `jest.setup.ts`

---

## Git Workflow

### Branches
Nunca commitar direto na `main`. Sempre criar branch antes de qualquer mudança:

```bash
git checkout -b <tipo>/<descricao-curta>
# feat/whatsapp-env  |  fix/threejs-memory-leak  |  refactor/use-page-scroll  |  chore/update-deps
```

### Commits — Conventional Commits
```
<tipo>(<escopo>): <descrição no imperativo em português>
```

| Tipo | Quando usar |
|------|-------------|
| `feat` | nova funcionalidade |
| `fix` | correção de bug |
| `refactor` | mudança interna sem alterar comportamento |
| `perf` | melhoria de performance |
| `test` | adição ou correção de testes |
| `chore` | deps, configs, sem impacto no produto |
| `docs` | documentação |

```bash
# Exemplos
feat(contact): mover número WhatsApp para variável de ambiente
fix(three): adicionar dispose de geometrias no cleanup
test(contact): adicionar testes para ContactSection
```

Máximo 72 caracteres na primeira linha. Um commit por mudança lógica.

### Versionamento — SemVer
`MAJOR.MINOR.PATCH` — `PATCH` bugfix · `MINOR` nova feature · `MAJOR` quebra de API

```bash
git tag -a v1.2.0 -m "feat: integração com serviço de email"
git push origin v1.2.0
```

### Fluxo
```
main (produção, sempre estável)
  └── feat/xyz → desenvolvimento → PR → build + lint ok → merge
```

Antes de abrir PR: `npm run build && npm run lint && npm run test`.

---

## Arquitetura

**Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Styled-Components + Three.js
**Path alias:** `@/*` → `./src/*`

### Navegação
`src/app/page.tsx` implementa um carrossel de página cheia com 4 seções: Hero → Services → Portfolio → Contact. O hook `usePageScroll` intercepta eventos de wheel/touch, acumula delta (threshold 275px) e dispara transições com animação cubic-bezier de 1.2s e transforms 3D. Os dots da `Sidebar.tsx` também controlam a seção ativa diretamente.

### Rendering
- `layout.tsx` é server component; envolve tudo no `StyledComponentsRegistry` (`src/lib/registry.tsx`) para hidratação SSR do styled-components
- Componentes interativos usam `'use client'`
- `ThreeBackground.tsx` — cena Three.js com partículas e grid runners animados, reage a mouse e scroll

### Styling
Styled-components em todo o projeto. Estilos globais em `src/styles/GlobalStyles.tsx`.

| Token | Valor |
|-------|-------|
| Accent primário | `#ff4500` (laranja neon) |
| Accent secundário | `#00C8FF` (ciano) |
| Background | `#000` |

Breakpoints: `768px`, `1024px`. Sidebar oculta abaixo de 1024px.

### Arquivos-chave

| Arquivo | Responsabilidade |
|---------|-----------------|
| `src/app/page.tsx` | Página principal com carrossel de seções |
| `src/hooks/usePageScroll.ts` | Lógica de navegação por scroll |
| `src/components/effects/ThreeBackground.tsx` | Cena 3D Three.js |
| `src/components/sections/ContactSection.tsx` | Seção de contato + WhatsApp CTA |
| `src/app/api/contact/route.ts` | Endpoint POST /api/contact |
| `src/lib/registry.tsx` | Registry SSR do styled-components |

### Observações
- Pasta de portfolio usa grafia `portifolio` (não `portfolio`) — não corrigir sem atualizar todas as rotas
- `Navbar.tsx` existe mas está desativada em `layout.tsx`
