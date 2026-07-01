import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: "Partner Program - Join Rizonn's Network Solutions Ecosystem",
  description: "Join Rizonn's partner program and unlock exclusive benefits, resources, and support to grow your business. Become an authorized partner for WiFi 6 access points and networking solutions.",
  keywords: [
    "partner program",
    "reseller program",
    "networking partners",
    "WiFi solutions partner",
    "distributor program",
    "system integrator",
    "technology partner",
    "business partnership",
    "channel partner"
  ],
  canonical: "https://rizonn.in/partner",
});

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}