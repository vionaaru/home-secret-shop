import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap"
});

const display = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://home-secret.shop"),
  title: "Home Secret — ароматы и свечи",
  description:
    "Новый сайт Home Secret Shop на Next.js: свечи, духи, диффузоры, доставка и сеть офлайн-магазинов по городам России."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-[var(--bg)] text-[var(--ink)]">{children}</body>
    </html>
  );
}
