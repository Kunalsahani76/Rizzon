import Image from "next/image";

export default function CertificationsSection() {
  return (
    <section className="w-full bg-white">
      <Image
        src="/banner-images/certification.jpg"
        alt="Rizonn certifications"
        width={1536}
        height={1024}
        className="h-auto w-full"
        priority
      />
    </section>
  );
}
