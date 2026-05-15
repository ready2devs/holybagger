import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "HolyBagger | Multibagger Stock Screener",
  description: "Discover and analyze stocks, ETFs, and cryptocurrencies that have multiplied their price x5, x10, or more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-text-primary`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
