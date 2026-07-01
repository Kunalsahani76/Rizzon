
"use client";


import Link from "next/link";
import { ArrowRight } from "lucide-react";

const networkingCategories = [
    {
        title: "Indio Cloud",
        href: "/networking/indio-cloud",
        description: "Full Featured, Cloud-based Wi-Fi Management Platform.",
    },
    {
        title: "Indio Connect",
        href: "/networking/indio-connect",
        description: "Effortlessly Manage & Monitor Community Wi-Fi",
    },
    {
        title: "Wireless Access Points",
        href: "/networking/wireless-access-points",
        description: "Powered by OpenWiFi Technology, Designed for Modern Enterprise Networks.",
    },
    {
        title: "UniBox Controllers",
        href: "/networking/unibox-controllers",
        description: "Network Access and Hotspot Controller",
    },
    {
        title: "Managed PoE Switches",
        href: "/networking/managed-poe-switches",
        description: "Designed to Provide High Throughput in Demanding Networks",
    },
    {
        title: "4G 5G Routers",
        href: "/networking/4g-5g-routers",
        description: "Seamless Connectivity on the Go",
    },
];

export default function NetworkingPage() {
    return (
        <>
            <main className="w-full bg-[#f8fafc] pt-20">
                {/* HERO SECTION */}
                <div className="relative w-full h-[400px] bg-blue-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-black/80 z-10" />
                    <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Networking Solutions</h1>
                        <p className="text-xl text-gray-300">
                            Advanced networking infrastructure for the modern enterprise.
                        </p>
                    </div>
                </div>

                {/* GRID */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {networkingCategories.map((item, i) => (
                            <Link href={item.href} key={i} className="group block h-full">
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                                        {item.description}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                                        Explore <ArrowRight className="ml-2 w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
