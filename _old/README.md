# Vijales - Software House do Futuro

Bem-vindo ao repositório da **Vijales**, uma software house focada em criar o futuro através de soluções digitais inovadoras. Este projeto contém o código-fonte do site institucional/portfolio da marca.

## 🚀 Sobre o Projeto

Este é um site portfolio altamente interativo e imersivo, projetado com uma estética futurista inspirada em **Tron** e no estilo **Cyberpunk**. O site serve como vitrine para os serviços de desenvolvimento de software da Vijales, demonstrando capacidade técnica através de animações complexas, ambientes 3D e design responsivo.

## ✨ Funcionalidades Principais

- **Visual 3D Imersivo**: Implementação de um background interativo usando **Three.js**, apresentando partículas flutuantes e "Grid Runners" (traços de luz que percorrem o grid).
- **Animações SVG Customizadas**: Sistema próprio (`VijalesSVGAnimator`) para animar logos e ícones vetorizados, criando um efeito de "desenho" e materialização progressiva.
- **Design Responsivo & Moderno**: Layout fluido que se adapta a diferentes tamanhos de tela, com tipografia moderna e paleta de cores neon (destaque para o laranja `#ff4500`).
- **Navegação Intuitiva**: Menu de navegação retrátil (drawer) para uma experiência de usuário limpa em desktop e mobile.
- **Showcase de Projetos**: Seção dedicada para exibição de cases de sucesso como *NexusFit* e *Verde Vivo*.
- **Elementos Interativos**: Cursor personalizado com rastro, micro-interações em botões e efeitos de hover.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web modernas e performáticas:

- **HTML5 Semantic**: Estruturação de conteúdo.
- **CSS3**: Estilização avançada, animações keyframe, transformações e layout flex/grid.
- **JavaScript (ES6+)**: Lógica de interação e controle de animações.
- **[Three.js](https://threejs.org/) (r128)**: Renderização de gráficos 3D acelerados por hardware.
- **Google Fonts & Analytics**: Recursos externos para tipografia e monitoramento.

## 📂 Estrutura do Projeto

```
/
├── index.html          # Página principal (Single Page Application feel)
├── styles.css          # Folhas de estilo globais e responsividade
├── script-animate.js   # Classe responsável pela orquestração das animações SVG
├── default.php         # Script backend (fallback/configuração)
├── portifolio/         # Páginas detalhadas dos projetos do portfolio
│   ├── nexus/          # Projeto NexusFit
│   └── verdevivo/      # Projeto Verde Vivo
├── img/                # Assets de imagem
└── reference_files/    # Arquivos de referência e design
```

## 🚀 Como Rodar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/vijales-site.git
   ```

2. **Abra o projeto:**
   Como o projeto utiliza recursos modernos do navegador e scripts módulos/CORS, é recomendável rodá-lo através de um servidor local simples ao invés de abrir o arquivo diretamente.

   Se você usa o **VS Code**, instale a extensão **Live Server** e clique em "Go Live".

   Ou utilize o Python:
   ```bash
   # Navegue até a pasta do projeto
   cd vijales-site

   # Inicie um servidor HTTP simples (Python 3)
   python -m http.server 8000
   ```

3. **Acesse no navegador:**
   Abra `http://localhost:8000`

## 📬 Contato

Está pronto para transformar sua visão em realidade tecnológica?

- **Email**: [vijales2000@gmail.com](mailto:vijales2000@gmail.com)
- **WhatsApp**: [+55 48 99869-9159](https://wa.me/5548998699159)

---

<div align="center">
  <p>© 2025 Vijales. <i>The Future is Now.</i></p>
</div>
