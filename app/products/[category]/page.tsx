
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getAllProductsIncludingAccessPoints } from "../../../lib/productUtils";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;
    const categorySlug = category;

    // Helper to normalize strings for comparison
    const normalize = (str: string) => str.toLowerCase().replace(/ /g, '-');

    const products = getAllProductsIncludingAccessPoints();
    const switchProducts = products.filter(
        p => normalize(p.category) !== "access-point-controllers" && normalize(p.category) !== "access-point"
    );
    const isSwitchesCategory = categorySlug === "switches";
    const isAaaCategory = categorySlug === "aaa";

    // Find the matching category title
    const categoryTitle = isSwitchesCategory
        ? "Switches"
        : isAaaCategory
            ? "AAA"
        : products.find(p => normalize(p.category) === categorySlug)?.category;

    const filteredProducts = isSwitchesCategory
        ? switchProducts
        : isAaaCategory
            ? products.filter((p) => p.model === "U-5050")
        : products.filter((p) => normalize(p.category) === categorySlug);

    if (filteredProducts.length === 0) {
        return notFound();
    }

    return (
        <>
            <main className="w-full bg-[#f8fafc] pt-20">
                {/* HERO SECTION */}
                <div className="relative w-full h-[300px] bg-blue-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    <div className="relative z-20 text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{categoryTitle}</h1>
                        <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-white">Products</Link>
                            <span>/</span>
                            <span className="text-white">{categoryTitle}</span>
                        </div>
                    </div>
                </div>

                {/* PRODUCT GRID */}
                <section className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
                    {categorySlug==="access-point-controllers" ? (
                        <>
                         {filteredProducts.filter((p) => !p.model.endsWith("-VA")).map((p, i) => {
                        const productCategorySlug = normalize(p.category);
                        const modelSlug = p.model.toLowerCase();
                        return (
                            <Link href={`/products/${productCategorySlug}/${modelSlug}`} key={i} className="block group h-full">
                                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="relative w-full aspect-[4/3] bg-gray-50 p-6">
                                        <Image
                                            src={p.img || "/slide-1.jpg"}
                                            alt={p.title}
                                            fill
                                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">{p.category}</div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{p.title}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{p.model}</p>
                                        <div className="mt-auto flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                                            View Details <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                        </>
                    ):(
                        <>
                         {filteredProducts.map((p, i) => {
                        const productCategorySlug = normalize(p.category);
                        const modelSlug = p.model.toLowerCase();
                        return (
                            <Link href={`/products/${productCategorySlug}/${modelSlug}`} key={i} className="block group h-full">
                                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="relative w-full aspect-[4/3] bg-gray-50 p-6">
                                        <Image
                                            src={p.img || "/slide-1.jpg"}
                                            alt={p.title}
                                            fill
                                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">{p.category}</div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{p.title}</h3>
                                        <p className="text-sm text-gray-500 mb-4">{p.model}</p>
                                        <div className="mt-auto flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                                            View Details <ArrowRight size={16} className="ml-2" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                        </>
                    )}
                   
                </section>
            </main>
        </>
    );
}
