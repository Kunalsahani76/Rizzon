import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';
import Hero from "./components/Hero";
import CertificationsSection from "./components/CertificationsSection";
import Enterprise from "./components/Enterprise";
import Slider from "./components/Slider";
import ProductGrid from "./components/ProductGrid";
import NewsEvents from "./components/NewsEvents";
import AboutSection from "./components/AboutSection";
// import NewsletterSection from "./components/NewsletterSection";

export const metadata: Metadata = generateMetadata({
  title: "Advanced Networking Solutions & WiFi 6 Access Points",
  description: "Rizonn delivers cutting-edge networking solutions including WiFi 6 access points, network controllers, and enterprise wireless infrastructure. Trusted by businesses worldwide for reliable, secure, and scalable network solutions.",
  keywords: [
    "WiFi 6 access points",
    "network controllers",
    "enterprise networking",
    "wireless infrastructure",
    "network security solutions",
    "bandwidth management",
    "hotspot controllers",
    "cloud managed WiFi",
    "network access control",
    "wireless LAN controllers"
  ],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex flex-col gap-y-16">
        <Hero />
        <CertificationsSection />
        <Enterprise />
        <Slider />
        <ProductGrid />
        <NewsEvents />
        <AboutSection />
        {/* <NewsletterSection /> */}
      </main>
    </div>
  );
}
