import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import QueryProvider from "../providors/query-provider";

import "../style/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Zonefolio",
  description: "Your one-stop solution for managing your SaaS applications",
  keywords: ["SaaS", "portfolio management", "application management"],
  openGraph: {
    title: "Zonefolio",
    description: "Your one-stop solution for managing your SaaS applications",
    url: "https://www.zonefolio.com",
    siteName: "Zonefolio",
    images: [
      {
        url: "https://www.zonefolio.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Zonefolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zonefolio",
    description: "Your one-stop solution for managing your SaaS applications",
    images: ["https://www.zonefolio.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
