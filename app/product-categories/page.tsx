"use client";

import Header from "../components/Header";


// Product categories data
const productCategories = [
  {
    id: 1,
    title: "Featured",
    description: "Our most popular and innovative products"
  },
  {
    id: 2,
    title: "Microsoft Teams Rooms",
    description: "Complete room solutions for Microsoft Teams"
  },
  {
    id: 3,
    title: "Interactive Flat Panel",
    description: "Advanced interactive displays for collaboration"
  },
  {
    id: 4,
    title: "Commercial Display",
    description: "High-quality displays for business environments"
  },
  {
    id: 5,
    title: "LED Display",
    description: "Energy-efficient LED display solutions"
  },
  {
    id: 6,
    title: "Unified Communication",
    description: "Integrated communication systems"
  },
  {
    id: 7,
    title: "Capture System",
    description: "Advanced video and audio capture solutions"
  },
  {
    id: 8,
    title: "Accessories",
    description: "Complementary accessories for all products"
  },
  {
    id: 9,
    title: "Software",
    description: "Innovative software solutions"
  },
  {
    id: 10,
    title: "All Products",
    description: "Browse our complete product catalog"
  },
];

export default function ProductCategoriesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <div className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Products
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Explore our wide range of innovative solutions designed to enhance your digital experience
            </p>
          </div>
        </div>
      </div>

      {/* Product Categories Grid */}
      <main className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productCategories.map((category) => (
              <div
                key={category.id}
                className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-100 text-blue-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>


    </div>
  );
}