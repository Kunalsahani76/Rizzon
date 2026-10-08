
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
    const getProductCategoryLabel = (model: string, productCategory: string) =>
        ["U-50", "U-100", "U-200", "U-500", "U-1000", "U-2500", "U-5050"].includes(model) ? "AAA" : productCategory;

    const products = getAllProductsIncludingAccessPoints();
    const switchProducts = products.filter(
        p => !["access-point-controllers", "access-point", "nms", "uvss"].includes(normalize(p.category))
            && !["UM-325AX", "UC-500"].includes(p.model)
    );
    const isSwitchesCategory = categorySlug === "switches";
    const isAaaCategory = categorySlug === "aaa";
    const aaaProductImages: Record<string, string> = {
        "U-50": "/products/AAA/Rizonn_UniBox%20U-50.jpg",
        "U-100": "/products/AAA/Rizonn_UniBox%20U-100.jpg",
        "U-200": "/products/AAA/Rizonn_UniBox%20U-200.jpeg",
        "U-500": "/products/AAA/Rizonn_UniBox%20U-500.jpeg",
        "U-1000": "/products/AAA/Rizonn_UniBox%20U-1000.jpeg",
        "U-2500": "/products/AAA/Rizonn_UniBox%20U-2500.jpeg",
    };
    const getCardImage = (product: (typeof products)[number]) =>
        (isAaaCategory && aaaProductImages[product.model]) || product.img || "/slide-1.jpg";
    const aaaModelOrder = ["U-50", "U-100", "U-200", "U-500", "U-1000", "U-2500", "U-5050"];
    const controllerModelOrder = ["UC-50", "UC-100", "UC-200", "UC-500", "UC-500-WLAN", "UC-1000"];
    const switchModelOrder = ["US-4MP", "US-8M", "US-8MP", "US-16M", "US-16MP", "US-24M", "US-24MP", "ECS4150-28T", "ECS4150-54T", "ECS4155-30T", "ECS5550-30X", "NAV-I-4R2S-X", "NAV-I-8R2S-X"];

    // Find the matching category title
    const categoryTitle = isSwitchesCategory
        ? "Switches"
        : isAaaCategory
            ? "AAA"
        : products.find(p => normalize(p.category) === categorySlug)?.category;
    const pageTitle = categorySlug === "access-point-controllers" ? "Controllers" : categoryTitle;

    const filteredProducts = isSwitchesCategory
        ? switchProducts
            .filter((p) => switchModelOrder.includes(p.model))
            .sort((a, b) => switchModelOrder.indexOf(a.model) - switchModelOrder.indexOf(b.model))
        : isAaaCategory
            ? products
                .filter((p) => aaaModelOrder.includes(p.model))
                .sort((a, b) => aaaModelOrder.indexOf(a.model) - aaaModelOrder.indexOf(b.model))
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
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{pageTitle}</h1>
                        <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                            <Link href="/" className="hover:text-white">Home</Link>
                            <span>/</span>
                            <Link href="/products" className="hover:text-white">Products</Link>
                            <span>/</span>
                            <span className="text-white">{pageTitle}</span>
                        </div>
                    </div>
                </div>

                {/* PRODUCT GRID */}
                <section className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
                    {isSwitchesCategory ? (
                        <>
                            {filteredProducts.map((p, i) => {
                                const productCategorySlug = normalize(p.category);
                                const modelSlug = p.model.toLowerCase();
                                return (
                                    <Link href={`/products/${productCategorySlug}/${modelSlug}`} key={p.model} className="block group h-full">
                                        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                            <div className="relative w-full aspect-[4/3] bg-gray-50 p-6">
                                                <Image src={getCardImage(p)} alt={p.title} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                                            </div>
                                            <div className="p-6 flex flex-col flex-grow">
                                                <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">{getProductCategoryLabel(p.model, p.category)}</div>
                                                <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{p.title}</h3>
                                                <p className="text-sm text-gray-500 mb-4">{p.displayModel || p.model}</p>
                                                <div className="mt-auto flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">View Details <ArrowRight size={16} className="ml-2" /></div>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </>
                    ) : categorySlug==="access-point-controllers" ? (
                        <>
                         {filteredProducts.filter((p) => normalize(p.category) !== "access-point" && !p.model.endsWith("-VA") && !["NAV-50", "NAV-100", "NAV-500", "NAV-1000", "NAV-2500", "U-50", "U-100", "U-200", "U-500", "U-1000", "U-2500", "U-5050"].includes(p.model)).sort((a, b) => {
                            const aOrder = controllerModelOrder.indexOf(a.model);
                            const bOrder = controllerModelOrder.indexOf(b.model);
                            return (aOrder === -1 ? Infinity : aOrder) - (bOrder === -1 ? Infinity : bOrder);
                         }).map((p, i) => {
                        const productCategorySlug = normalize(p.category);
                        const modelSlug = p.model.toLowerCase();
                        return (
                            <Link href={`/products/${productCategorySlug}/${modelSlug}`} key={i} className="block group h-full">
                                <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm group-hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                                    <div className="relative w-full aspect-[4/3] bg-gray-50 p-6">
                                        <Image
                                            src={getCardImage(p)}
                                            alt={p.title}
                                            fill
                                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">{getProductCategoryLabel(p.model, p.category)}</div>
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
                                            src={getCardImage(p)}
                                            alt={p.title}
                                            fill
                                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">{getProductCategoryLabel(p.model, p.category)}</div>
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
