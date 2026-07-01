import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Contact Sales - Get Expert Networking Solutions",
  description: "Contact Rizonn's sales team for expert advice on WiFi 6 access points, network controllers, and enterprise wireless solutions. Get personalized recommendations for your business needs.",
  keywords: [
    "contact sales",
    "networking consultation",
    "WiFi solutions expert",
    "enterprise networking support",
    "network infrastructure consultation",
    "technical support",
    "sales inquiry",
    "business networking solutions"
  ],
  canonical: "https://rizonn.in/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}