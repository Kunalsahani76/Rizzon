import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Partner Application - Apply to Join Rizonn's Network",
  description: "Apply to become a Rizonn partner and access exclusive pricing, training, and support for WiFi 6 access points and networking solutions. Start your partnership application today.",
  keywords: [
    "partner application",
    "become a partner",
    "reseller application",
    "distributor application",
    "networking partner signup",
    "WiFi solutions partnership",
    "business partnership application"
  ],
  canonical: "https://rizonn.in/partner/apply",
});

export default function PartnerApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}