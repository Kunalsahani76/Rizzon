import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rizonn - Advanced Networking Solutions & Access Point Controllers",
    template: "%s | Rizonn"
  },
  description: "Rizonn delivers cutting-edge networking solutions including WiFi 6 access points, network controllers, and enterprise wireless infrastructure. Trusted by businesses worldwide for reliable, secure, and scalable network solutions.",
  keywords: [
    "networking solutions",
    "WiFi 6 access points",
    "network controllers",
    "wireless infrastructure",
    "enterprise networking",
    "access point controllers",
    "network security",
    "bandwidth management",
    "hotspot solutions",
    "cloud managed WiFi",
    "network access control",
    "wireless LAN controllers",
    "enterprise WiFi",
    "network management",
    "WiFi solutions"
  ],
  authors: [{ name: "Rizonn Technologies" }],
  creator: "Rizonn Technologies",
  publisher: "Rizonn Technologies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://rizonn.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Rizonn - Advanced Networking Solutions & Access Point Controllers",
    description: "Leading provider of WiFi 6 access points, network controllers, and enterprise wireless infrastructure. Delivering secure, scalable networking solutions for businesses worldwide.",
    url: 'https://rizonn.in',
    siteName: 'Rizonn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rizonn - Advanced Networking Solutions',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Rizonn - Advanced Networking Solutions & Access Point Controllers",
    description: "Leading provider of WiFi 6 access points, network controllers, and enterprise wireless infrastructure.",
    images: ['/twitter-image.jpg'],
    creator: '@rizonn',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/logo.jpg", sizes: "96x96", type: "image/jpeg" },
    ],
    apple: [
      { url: "/logo.jpg", sizes: "96x96", type: "image/jpeg" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#2563eb",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#ffffff',
  },
  verification: {
    google: 'googleedad4fd883bcd292',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import StructuredData from "./components/StructuredData";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
