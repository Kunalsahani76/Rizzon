
"use client";


import Link from "next/link";
import { ArrowRight } from "lucide-react";

const solutions = [
    {
        title: "Huddle Room Solutions",
        href: "/solutions/huddle",
        description: "Perfect for quick sync-ups and small group collaborations. Maximize space efficiency with top-tier audio and video.",
    },
    {
        title: "Small Room Solutions",
        href: "/solutions/small",
        description: "Optimized for small teams, ensuring everyone is seen and heard clearly with wide-angle cameras and crystal-clear audio.",
    },
    {
        title: "Medium Room Solutions",
        href: "/solutions/medium",
        description: "Professional-grade video conferencing for standard meeting rooms with intelligent framing and noise cancellation.",
    },
    {
        title: "Large Room Solutions",
        href: "/solutions/large",
        description: "Cinema-quality video and immersive audio for boardrooms and large conference spaces.",
    },
    {
        title: "Strategic Alliance",
        href: "/solutions/alliance",
        description: "Partnering with industry leaders to deliver integrated and certified solutions.",
    },
];

export default function SolutionsPage() {
    return (
        <>
            <main className="w-full bg-[#f8fafc] pt-20">
                {/* HERO SECTION */}
                <div className="relative w-full h-[400px] bg-indigo-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900/80 z-10" />
                    <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Business Solutions</h1>
                        <p className="text-xl text-gray-300">
                            Tailored collaboration solutions for every space and team size.
                        </p>
                    </div>
                </div>

                {/* GRID */}
                <section className="max-w-7xl mx-auto px-6 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {solutions.map((item, i) => (
                            <Link href={item.href} key={i} className="group block h-full">
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                                        {item.description}
                                    </p>
                                    <div className="flex cursor-pointer items-center text-indigo-600 font-semibold group-hover:translate-x-2 transition-transform">
                                        Learn More <ArrowRight className="ml-2 w-5 h-5" />
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
