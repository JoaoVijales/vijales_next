import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
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
      <body className={`${orbitron.variable} ${orbitron.className}`}>
        <StyledComponentsRegistry>
          <GlobalStyles />


          <BackgroundEffects />
          <ThreeBackground />
          {/* Sidebar moved to page.tsx for specific scroll control */}

          <Navbar />
          <main style={{ position: 'relative', zIndex: 2 }}>
            {children}
          </main>
          <Footer />

        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
