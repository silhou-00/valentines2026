import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const norwester = localFont({
  src: "../public/font/norwester.otf",
  variable: "--font-norwester",
});

export const metadata: Metadata = {
  title: "Valentine's Extraction",
  description: "A Lobotomy Corporation style Valentine's experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${norwester.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
