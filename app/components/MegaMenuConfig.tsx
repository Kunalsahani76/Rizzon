"use client";

import Link from "next/link";
import { productCategories } from "./ProductCategories";

// Products Mega Menu Configuration
export const getProductsMenuColumns = (
    activeCategory: any,
    hoveredSubItem: string | null,
    setOpenCategory: (cat: string) => void,
    setHoveredSubItem: (item: string | null) => void
) => {
    const accessPointControllers = productCategories.find(category => category.title === "Access Point Controllers");
    const accessPoint = productCategories.find(category => category.title === "Access Point");
    const productMenuItems = [
        ...(accessPoint ? [{ title: "Access Points", href: accessPoint.href, activeTitle: accessPoint.title }] : []),
        ...(accessPointControllers ? [{ title: "Controller", href: accessPointControllers.href, activeTitle: accessPointControllers.title }] : []),
        { title: "AAA", href: "/products/aaa", activeTitle: "AAA" },
        { title: "Switches", href: "/products/switches", activeTitle: "Switches" },
        { title: "NMS", href: "/products/nms", activeTitle: "NMS" },
        { title: "DCIM", href: "/products/dcim", activeTitle: "DCIM" },
        { title: "HMS", href: "/products/hms", activeTitle: "HMS" },
        { title: "UVSS", href: "/products/uvss", activeTitle: "UVSS" },
    ];

    return [
        // Column 1: Sidebar
        {
            title: "",
            content: (
                <div>
                    <div className="mb-8">
                        <div className="space-y-1 px-1">
                            {productMenuItems.map((category, idx) => {
                                const isActive = activeCategory?.title === category.activeTitle;
                                const handleCategoryHover = () => {
                                    if (!category.activeTitle) return;
                                    setOpenCategory(category.activeTitle);
                                    if (category.activeTitle === "DCIM" || category.activeTitle === "HMS") setHoveredSubItem(null);
                                };
                                const className = `flex items-center justify-between py-3 px-4 rounded-xl text-sm transition-all duration-300 border ${isActive
                                    ? "bg-blue-50 text-blue-700 font-medium shadow-sm border-blue-100"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent"
                                    }`;

                                const content = (
                                    <>
                                        <span>{category.title}</span>
                                        <svg className={`w-4 h-4 transition-colors ${isActive ? "text-blue-600" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </>
                                );

                                return (
                                    <Link
                                        key={idx}
                                        href={category.href}
                                        onMouseEnter={category.activeTitle ? handleCategoryHover : undefined}
                                        onFocus={category.activeTitle ? handleCategoryHover : undefined}
                                        className={className}
                                    >
                                        {content}
                                    </Link>
                                );
                            })}
                        </div>

                    </div>
                </div>
            ),
        },
        // Column 2: XBar Series
        // {
        //     title: "XBar Series",
        //     content: (
        //         <div className="space-y-2">
        //             {["XBar W70 Kit - Windows", "XBar V50 Kit - Android", "XBar U50 - USB"].map((item, idx) => (
        //                 <Link
        //                     key={idx}
        //                     href="#"
        //                     className="flex items-center justify-between text-gray-600 hover:text-blue-600 text-sm py-3 px-3 rounded-lg hover:bg-blue-50 transition-all group border border-transparent hover:border-blue-100"
        //                 >
        //                     <span className="text-sm font-medium">{item}</span>
        //                     <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        //                     </svg>
        //                 </Link>
        //             ))}
        //         </div>
        //     ),
        // },
        // Column 3: Available Models
        // {
        //     title: "Available Models",
        //     content: (
        //         <div className="space-y-2 overflow-y-auto max-h-[500px] px-2 custom-scrollbar">
        //             {activeCategory?.subItems?.map((subItem: any, i: number) => (
        //                 <Link
        //                     key={i}
        //                     href={subItem.href}
        //                     onMouseEnter={() => setHoveredSubItem(subItem.title)}
        //                     className={`block p-3 rounded-xl text-sm transition-all duration-300 border ${hoveredSubItem === subItem.title ? "bg-white border-blue-200 shadow-md text-blue-700 transform scale-[1.02]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border-transparent"
        //                         }`}
        //                 >
        //                     <div className="flex items-center justify-between gap-3">
        //                         <span className="line-clamp-2 leading-relaxed font-medium">{subItem.title}</span>
        //                         {hoveredSubItem === subItem.title && (
        //                             <svg className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        //                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        //                             </svg>
        //                         )}
        //                     </div>
        //                 </Link>
        //             ))}
        //         </div>
        //     ),
        // },
        // Column 4: Product Preview
        {
            title: "",
            content: (() => {
                // Find the hovered access point controller product
                const hoveredAccessPointControllerProduct = hoveredSubItem ?
                    productCategories
                        .filter(category => category.title === "Access Point Controllers")
                        .flatMap(category => category.subItems || [])
                        .find(product => product.title === hoveredSubItem) : null;

                // Find the hovered access point product
                const hoveredAccessPointProduct = hoveredSubItem ?
                    productCategories
                        .filter(category => category.title === "Access Point")
                        .flatMap(category => category.subItems || [])
                        .find(product => product.title === hoveredSubItem) : null;

                // Use hovered product or fallback to active category's first item
                const displayProduct = hoveredAccessPointControllerProduct || hoveredAccessPointProduct || activeCategory?.subItems?.[0];

                return displayProduct ? (
                    <Link href={displayProduct.href} className="w-full h-full flex flex-col justify-center px-12 cursor-pointer group/preview">
                        <div className="bg-white rounded-2xl p-8 mb-8 flex-grow flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            {displayProduct.video ? (
                                <video
                                    src={displayProduct.video}
                                    className="w-full h-80 object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    aria-label={displayProduct.title}
                                />
                            ) : (
                                <img
                                    src={displayProduct.img || "/slide-1.jpg"}
                                    alt={displayProduct.title}
                                    className="w-full h-80 object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                                />
                            )}
                        </div>
                        <div className="flex gap-4 justify-center mb-8">
                            <img
                                src="/microsoft-teams-badge.png"
                                alt="Certified for Microsoft Teams"
                                className="h-8 opacity-90 hover:opacity-100 transition-opacity"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                            <img
                                src="/windows-11-badge.png"
                                alt="Windows 11"
                                className="h-8 opacity-90 hover:opacity-100 transition-opacity"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                }}
                            />
                        </div>
                        <div className="text-center max-w-2xl mx-auto">
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">{displayProduct.title}</h4>
                            <p className="text-base text-gray-500 leading-relaxed line-clamp-3">{displayProduct.description || displayProduct.title}</p>

                            <span className="inline-flex items-center gap-2 text-blue-600 font-semibold mt-6 group-hover/preview:gap-3 transition-all">
                                View Details
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                        </div>
                    </Link>
                ) : (
                    <div className="text-center text-gray-400 flex flex-col justify-center items-center h-full border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="text-sm font-medium text-gray-500">Hover over a product to preview</p>
                    </div>
                );
            })(),
        },
    ];
};

// Solutions Mega Menu Configuration
export const getSolutionsMenuColumns = (isBusinessHovered: boolean) => [
    // Column 1: Solutions Categories
    {
        title: "Solutions Categories",
        items: [
            { label: "Business Solutions", href: "/solutions/business" },
            { label: "Alliance", href: "/solutions/alliance" },
        ],
    },
    // Column 2: Business Options Header
    {
        title: "Business Options",
        content: <div />,
    },
    // Column 3: Room Solutions
    {
        title: "",
        content: isBusinessHovered ? (
            <div className="space-y-2">
                {["Huddle", "Small", "Medium", "Large"].map((size) => (
                    <Link
                        key={size}
                        href={`/solutions/${size.toLowerCase()}`}
                        className="block p-3 rounded-xl text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-100 hover:shadow-sm transition-all duration-300 group"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium">{size} Room Solutions</span>
                            <svg className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        ) : (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                <p className="text-xs font-medium text-gray-500">Select a category</p>
            </div>
        ),
    },
    // Column 4: Preview
    {
        title: "",
        content: isBusinessHovered ? (
            <div className="w-full text-center h-full flex flex-col">
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 mb-6 flex-grow flex items-center justify-center relative overflow-hidden group shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <svg className="w-24 h-24 mx-auto text-blue-200 group-hover:text-blue-500 transition-colors transform group-hover:scale-110 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                    </svg>
                </div>
                <h4 className="text-base font-bold text-gray-900 mb-2">Business Solutions</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Comprehensive collaboration solutions for every space and team size.</p>
            </div>
        ) : (
            <div className="text-center text-gray-400 flex flex-col justify-center items-center h-full border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
                <p className="text-sm font-medium text-gray-500">Select a solution to preview</p>
            </div>
        ),
    },
];
