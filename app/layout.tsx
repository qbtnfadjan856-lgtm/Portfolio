import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Além da Web — Sites e Sistemas",
  description: "Sites e sistemas sob medida, com design moderno, performance e estratégias digitais para negócios que querem evoluir.",
  openGraph: {
    title: "Além da Web — Sites e Sistemas",
    description: "Seu negócio em outro nível. Desenvolvimento digital sob medida.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}