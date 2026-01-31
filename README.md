# Vijales - Software House do Futuro

Bem-vindo ao repositório do **Vijales**, um portfólio web moderno e interativo desenvolvido com **Next.js 15**, focado em oferecer uma experiência visual imersiva com animações 3D e design retro-futurista.

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as tecnologias mais recentes do ecossistema React:

-   **[Next.js 15](https://nextjs.org/)** - Framework React para produção (App Router).
-   **[React 19](https://react.dev/)** - Biblioteca JavaScript para construção de interfaces.
-   **[Three.js](https://threejs.org/)** - Renderização de gráficos 3D no navegador.
-   **[Styled Components](https://styled-components.com/)** - Estilização de componentes com CSS-in-JS.
-   **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado.
-   **[Lucide React](https://lucide.dev/)** - Iconografia moderna e leve.

## ✨ Funcionalidades

-   **Design Retro-Futurista**: Estética cyberpunk/tron com cores neon e elementos geométricos.
-   **Navegação Imersiva**: Scroll de página inteira (Full Page Scroll) com transições suaves e efeitos de profundidade 3D.
-   **Background 3D Interativo**: Elementos visuais renderizados com Three.js que reagem ao ambiente.
-   **Componentização Robusta**: Estrutura de código limpa e modular com Next.js App Router.
-   **Responsividade**: Layout adaptável para diferentes tamanhos de tela (Mobile First).

## 🛠️ Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/vijales_next.git
    cd vijales_next
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou
    yarn install
    ```

3.  **Execute o servidor de desenvolvimento:**

    ```bash
    npm run dev
    # ou
    yarn dev
    ```

4.  **Acesse o projeto:**

    Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📂 Estrutura do Projeto

A estrutura de pastas segue o padrão do Next.js App Router:

```
src/
├── app/                  # Rotas e layouts da aplicação (App Router)
│   ├── api/              # Rotas de API (ex: formulário de contato)
│   ├── globals.css       # Estilos globais CSS
│   ├── layout.tsx        # Layout raiz
│   └── page.tsx          # Página principal com lógica de scroll
├── components/           # Componentes React reutilizáveis
│   ├── effects/          # Efeitos visuais (Three.js, Backgrounds)
│   ├── layout/           # Componentes de layout (Navbar, Sidebar, Footer)
│   └── sections/         # Seções da página (Hero, Portfolio, Contato, etc.)
├── hooks/                # Custom React Hooks
│   ├── useIntersectionObserver.ts
│   └── usePageScroll.ts
├── lib/                  # Utilitários e configurações de bibliotecas
└── styles/               # Definições de estilos globais (Styled Components)
```

## 📝 Scripts Disponíveis

-   `npm run dev`: Inicia o servidor de desenvolvimento.
-   `npm run build`: Cria a build de produção otimizada.
-   `npm run start`: Inicia o servidor de produção.
-   `npm run lint`: Executa a verificação de código com ESLint.

---

Desenvolvido por **João Pedro Vijales Schneider**.
