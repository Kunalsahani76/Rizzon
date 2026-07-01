import Image from "next/image";

const certifications = [
  {
    title: "CE Mark logo",
    image: "/banner-images/CE Mark logo main.jpeg",
  },
  {
    title: "FCC logo",
    image: "/banner-images/FCC logo.png",
  },
  {
    title: "ISO 9001 2015 logo",
    image: "/banner-images/ISO 9001 2015 logo.png",
  },
  {
    title: "ISO 14001 2015 logo",
    image: "/banner-images/ISO 14001 2015 logo.png",
  },
  {
    title: "RoHS compliance logo",
    image: "/banner-images/RoHS compliance logo.png",
  },
];

export default function CertificationsSection() {
  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-6 sm:px-8">
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {certifications.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="relative flex h-36 w-full max-w-[190px] items-center justify-center rounded-sm bg-black shadow-[0_10px_28px_rgba(15,23,42,0.12)] ring-1 ring-gray-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={155}
                  height={115}
                  className="h-auto max-h-28 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
