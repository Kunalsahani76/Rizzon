"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { getAllProducts, getAllCategories, getAccessPoints, Product } from "../../lib/productUtils";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const allProducts = getAllProducts();
    const accessPoints = getAccessPoints();
    const allCategories = getAllCategories();

    // Merge regular products with access points
    setProducts([...allProducts, ...accessPoints]);

    // Add "Access Point" to categories if not already present
    if (!allCategories.includes("Access Point")) {
      setCategories([...allCategories, "Access Point"]);
    } else {
      setCategories(allCategories);
    }
  }, []);

  const filteredProducts =
    activeCategory === "All Products"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <>
      <main className="w-full bg-[#f8fafc] pt-20"> {/* Added pt-20 for header spacing */}

        {/* HERO SECTION WITH IMAGE BACKGROUND */}
        <div
          className="relative w-full h-[400px] bg-cover bg-center flex items-center"
        >
          <Image
            src="/s1.jpeg"            // Keep hero image here
            alt="Industrial Solutions"
            fill
            priority
            className="object-cover brightness-50" // Darkened for text readability
          />

          {/* TEXT OVERLAY */}
          <div className="relative max-w-[1200px] mx-auto px-6 text-white z-10 text-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Our Products
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Professional Industrial Network Solutions for every need.
            </p>
          </div>
        </div>


        {/* CATEGORY TABS */}
        <div className="max-w-[1200px] mx-auto px-6 py-10 flex flex-wrap justify-center gap-4 border-b border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCT GRID */}
        <section className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 pt-10">
          {filteredProducts.map((p, i) => {
            // Construct the URL: /products/[category-slug]/[model-slug]
            const categorySlug = p.category.toLowerCase().replace(/ /g, '-');
            const modelSlug = p.model.toLowerCase();

            return (
              <Link href={`/products/${categorySlug}/${modelSlug}`} key={i} className="block group h-full">
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
        </section>
      </main>
    </>
  );
}
