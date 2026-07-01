"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// Define the business solutions data structure
interface BusinessSolution {
  title: string;
  description: string;
  features: string[];
  image: string;
}

interface BusinessSolutionCategory {
  id: string;
  title: string;
  solutions: BusinessSolution[];
}

const businessSolutionsData: BusinessSolutionCategory[] = [
  {
    id: "huddle",
    title: "Huddle",
    solutions: [
      {
        title: "Huddle Room Solution",
        description: "Perfect for small team collaborations and quick meetings with integrated audio and video capabilities.",
        features: [
          "All-in-one collaboration hub",
          "Wireless screen sharing",
          "Integrated cameras and microphones",
          "Easy setup and management"
        ],
        image: "/slide-1.jpg"
      }
    ]
  },
  {
    id: "small",
    title: "Small",
    solutions: [
      {
        title: "Small Meeting Room Solution",
        description: "Designed for individual offices and small conference rooms with reliable connectivity and clear audio.",
        features: [
          "HD video conferencing",
          "360-degree audio coverage",
          "Smart room scheduling",
          "Enterprise-grade security"
        ],
        image: "/slide-2.jpg"
      }
    ]
  },
  {
    id: "medium",
    title: "Medium",
    solutions: [
      {
        title: "Medium Conference Room Solution",
        description: "Advanced solution for medium-sized meeting rooms with enhanced collaboration features.",
        features: [
          "4K video conferencing",
          "AI-powered noise cancellation",
          "Interactive whiteboarding",
          "Room analytics dashboard"
        ],
        image: "/slider-3.jpeg"
      }
    ]
  },
  {
    id: "large",
    title: "Large",
    solutions: [
      {
        title: "Large Auditorium Solution",
        description: "Comprehensive solution for large auditoriums and boardrooms with premium audio and video quality.",
        features: [
          "Ultra-HD video walls",
          "Professional-grade acoustics",
          "Multi-room management",
          "Advanced analytics and reporting"
        ],
        image: "/slider-4.jpeg"
      }
    ]
  }
];

export default function BusinessSolutionsPage() {
  const [hoveredSolution, setHoveredSolution] = useState<BusinessSolution | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("Huddle");
  const [isBusinessSolutionsHovered, setIsBusinessSolutionsHovered] = useState(true);

  // Set default hovered solution when category changes
  const handleCategoryChange = (categoryTitle: string) => {
    setActiveCategory(categoryTitle);
    const category = businessSolutionsData.find(cat => cat.title === categoryTitle);
    if (category && category.solutions.length > 0) {
      setHoveredSolution(category.solutions[0]);
    }
  };

  // Handle hash changes in URL
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const category = businessSolutionsData.find(cat => cat.id === hash);
        if (category) {
          setActiveCategory(category.title);
          if (category.solutions.length > 0) {
            setHoveredSolution(category.solutions[0]);
          }
        }
      }
    };

    // Check hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Set default hovered solution on initial load
  useEffect(() => {
    const defaultCategory = businessSolutionsData[0];
    if (defaultCategory && defaultCategory.solutions.length > 0) {
      setHoveredSolution(defaultCategory.solutions[0]);
      setActiveCategory(defaultCategory.title);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Business Solutions</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of collaboration solutions designed for every space and team size.
          </p>
        </div>

        {/* Business Solutions Dropdown Layout - Similar to ProductDropdown */}
        <div className="fixed top-20 left-0 right-0 z-[9999] bg-black/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto bg-white rounded-none shadow-xl border-t border-gray-200">
            {/* Grid layout similar to ProductDropdown */}
            <div
              className="grid grid-cols-1 lg:grid-cols-[260px_360px_440px] gap-0 items-start border-t pt-4"
              onMouseLeave={() => setIsBusinessSolutionsHovered(false)}
            >
              {/* LEFT COLUMN - Solutions Categories */}
              <div className="bg-white border-r border-gray-200 shadow-sm h-full">
                <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                  <div
                    className="hover:bg-gray-50 transition duration-200"
                    onMouseEnter={() => setIsBusinessSolutionsHovered(true)}
                  >
                    <div className="flex items-center justify-between py-2 px-4 text-sm text-gray-700 cursor-pointer">
                      <span>Business Solutions</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="hover:bg-gray-50 transition duration-200">
                    <a
                      href="/alliance"
                      className="flex items-center justify-between py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 transition duration-200"
                    >
                      <span>Alliance</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* MIDDLE COLUMN - Business Solutions Subcategories */}
              {isBusinessSolutionsHovered && (
                <div className="bg-white border-r border-gray-200 h-full">
                  <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 py-2">
                    {businessSolutionsData.map((category) => (
                      <div
                        key={category.id}
                        className={`py-1 cursor-pointer ${activeCategory === category.title ? "bg-gray-50" : ""
                          }`}
                        onClick={() => handleCategoryChange(category.title)}
                      >
                        <div
                          className={`block px-4 py-2 text-sm ${activeCategory === category.title
                              ? "text-blue-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {category.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RIGHT COLUMN - Solution Details */}
              <div className="bg-white h-full p-6">
                {hoveredSolution ? (
                  <div className="h-full flex flex-col">
                    <div className="bg-gray-50 p-4 border border-gray-200 rounded-md mb-6 flex-grow">
                      <img
                        src={hoveredSolution.image}
                        alt={hoveredSolution.title}
                        className="w-full h-48 object-contain"
                      />
                    </div>

                    <div className="bg-white p-5 border border-gray-100 shadow-sm flex-grow">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{hoveredSolution.title}</h3>
                      <p className="text-gray-700 mb-4">{hoveredSolution.description}</p>

                      <h4 className="text-base font-semibold text-gray-900 mb-2">Key Features</h4>
                      <ul className="space-y-2 mb-6">
                        {hoveredSolution.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-blue-500 mr-2">✓</span>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-auto">
                        <Link
                          href="#contact"
                          className="inline-block cursor-pointer bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <p>Select a solution category</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}