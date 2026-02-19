import type { Metadata } from "next";
import { Orbitron, Montserrat, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";

// Components
import Navbar from "@/components/layout/Navbar";
// Sidebar moved to page.tsx
import Footer from "@/components/layout/Footer";
import BackgroundEffects from "@/components/effects/BackgroundEffects";
import ThreeBackground from "@/components/effects/ThreeBackground";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vijales - Software House do Futuro",
  description: "Desenvolvemos o futuro. Arquitetamos soluções digitais que transcendem o código e transformam visões em realidade tecnológica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" rel="stylesheet" />
      </head>
      <body className={`${orbitron.variable} ${montserrat.variable} ${openSans.variable} ${playfairDisplay.variable} ${orbitron.className}`}>
        <StyledComponentsRegistry>
          <GlobalStyles />


          <BackgroundEffects />
          <ThreeBackground />
          {/* Sidebar moved to page.tsx for specific scroll control */}

          {/* <Navbar /> */}
          <main style={{ position: 'relative', zIndex: 2 }}>
            {children}
          </main>
          <Footer />

        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
