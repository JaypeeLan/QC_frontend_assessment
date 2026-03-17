import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Business Registration Portal | Government of QC",
  description:
    "Official portal for government business registration and assessment. Secure, reliable, and offline-resilient.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-[var(--color-bg-light)] text-[var(--color-text-900)] font-[var(--font-family-sans)]">
        <NextTopLoader color="#005EA2" showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
