import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css"; // Keeping default nextjs globals for now, might remove later if conflicting with GlobalStyles
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyles from "@/styles/GlobalStyles";

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
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
