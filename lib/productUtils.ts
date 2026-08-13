import productData from "../productdata.json";
import accessPointData from "../accesspoint.json";
import accessPoint1Data from "../accesspoint1.json";
import { getProductDetailBySlug, ProductDetail } from "@/app/lib/productDetails";

export interface Product {
    title: string;
    model: string;
    category: string;
    description: string;
    img?: string;
    video?: string;
}

// Map product models to their nav images
const getProductImage = (model: string): string => {
    const imageMap: { [key: string]: string } = {
        // Core Routing Switch
        'NAV-C24S2Q': '/nav-images/Rizonn _ NAV-C24S2Q.png',
        'NAV-C24S20': '/nav-images/Rizonn _ NAV-C24S2Q.png', // Variant
        'NAV-C48S2Q-4Q': '/nav-images/Rizonn _ NAV-C48S2Q-4Q.png',
        'NAV-C48S2Q-40': '/nav-images/Rizonn _ NAV-C48S2Q-4Q.png', // Variant
        // Distribution Switches  
        'NAV-D24R4S': '/nav-images/Rizonn _ NAV-D24R4S.png',
        'NAV-D8R12S': '/nav-images/Rizonn _ NAV-D8R12S.png',
        // Industrial Managed Switch
        'NAV-I-10R4S': '/nav-images/Rizonn _ NAV-I-10R4S.png',
        'NAV-I-16R2S': '/nav-images/Rizonn _ NAV-I-16R2S.png',
        'NAV-I-8P2S': '/nav-images/Rizonn _ NAV-I-8P2S.png',
        'NAV-I-8R2S': '/nav-images/Rizonn _ NAV-I-8R2S.png',
        // PoE Fiber Switch
        'NAV-P-24P2S': '/nav-images/Rizonn _ NAV-P-24P2S.png',
        'NAV-P-24P2S-at': '/nav-images/Rizonn _ NAV-P-24P2S.png', // Variant
        'NAV-P-24P4S': '/nav-images/Rizonn _ NAV-P-24P4S.png',
        'NAV-P-24P4S-at': '/nav-images/Rizonn _ NAV-P-24P4S.png', // Variant
        'NAV-P-24P8S-4S': '/nav-images/Rizonn _ NAV-P-24P8S-4S.png',
        'NAV-P-24P8S-4S-at': '/nav-images/Rizonn _ NAV-P-24P8S-4S.png', // Variant
        'NAV-P48P4S': '/nav-images/Rizonn _ NAV-P48P4S.png',
        // Access Point Controllers
        'NAV-50': '/nav-images/Rizonn _ NAV-500.png',
        'NAV-100': '/nav-images/Rizonn _ NAV-500.png',
        'NAV-500': '/nav-images/Rizonn _ NAV-500.png',
        'NAV-1000': '/nav-images/Rizonn _ NAV-1000.png',
        'NAV-2500': '/nav-images/Rizonn _ NAV-2500.png',
        'U-5050': '/banner-images/AAA.jpg',
        'NAV-519-VA': '/nav-images/Rizonn _ NAV-519-VA.png',
        'NAV-219-VA': '/nav-images/Rizonn _ NAV-219-VA.png',
        'NAV-319-VA': '/nav-images/Rizonn _ NAV-319-VA.png',
        'NMS': '/banner-images/product-3.png',
        'UVSS': '/banner-images/UVSS.png',
    };

    const imagePath = imageMap[model] || "/slide-1.jpg";
    return imagePath;
};

export const getAllProducts = (): Product[] => {
    const products: Product[] = [];
    const data = productData as any[];
    const accessData = accessPointData as any[];

    // Process regular product data
    data.forEach((item) => {
        if (item.category && item.products) {
            // Category group
            item.products.forEach((prod: any) => {
                products.push({
                    title: prod.title || prod.model,
                    model: prod.model,
                    category: item.category,
                    description: prod.description || "",
                    img: getProductImage(prod.model),
                    video: prod.video
                });
            });
        } else if (item.productType && item.model) {
            // Standalone product
            products.push({
                title: item.productType,
                model: item.model,
                category: item.productType, // Use productType as category
                description: typeof item.productOverview === 'string' ? item.productOverview : (item.description || ""),
                img: getProductImage(item.model),
                video: item.video
            });
        }
    });

    // Include access point controllers in main products page
    // accessData.forEach((item) => {
    //     if (item.category && item.products) {
    //         // Category group
    //         item.products.forEach((prod: any) => {
    //             products.push({
    //                 title: prod.title || prod.model,
    //                 model: prod.model,
    //                 category: item.category,
    //                 description: prod.description || "",
    //                 img: getProductImage(prod.model)
    //             });
    //         });
    //     }
    // });

    return products;
};

// Separate function for access point controllers
export const getAccessPointControllers = (): Product[] => {
    const products: Product[] = [];
    const accessData = accessPointData as any[];

    // Process access point data only
    accessData.forEach((item) => {
        if (item.category && item.products) {
            // Category group
            item.products.forEach((prod: any) => {
                products.push({
                    title: prod.title || prod.model,
                    model: prod.model,
                    category: item.category,
                    description: prod.description || "",
                    img: getProductImage(prod.model)
                });
            });
        }
    });

    return products;
};

// Separate function for access points (NAV-519-VA, NAV-219-VA, NAV-319-VA)
export const getAccessPoints = (): Product[] => {
    const products: Product[] = [];
    const accessData = accessPoint1Data as any[];

    // Process access point data only
    accessData.forEach((item) => {
        if (item.category && item.products) {
            // Category group
            item.products.forEach((prod: any) => {
                products.push({
                    title: prod.title || prod.model,
                    model: prod.model,
                    category: item.category,
                    description: prod.description || "",
                    img: getProductImage(prod.model)
                });
            });
        }
    });

    return products;
};

// Function to get all products including access point controllers (for search, sitemap, etc.)
export const getAllProductsIncludingAccessPoints = (): Product[] => {
    const regularProducts = getAllProducts();
    const accessPointControllers = getAccessPointControllers();
    const accessPoints = getAccessPoints();

    // Merge all products together
    return [...regularProducts, ...accessPointControllers, ...accessPoints];
};

export const getAllCategories = (): string[] => {
    const products = getAllProducts();
    const categories = new Set(products.map(p => p.category));
    return ["All Products", ...Array.from(categories)];
};

// Helper to convert camelCase to Title Case
const toTitleCase = (str: string) => {
    const result = str.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
};

export const getProductDetail = (slug: string): ProductDetail | null => {
    // Product details that are maintained outside the JSON product catalog
    // (such as HMS) still use the shared DetailsPage flow.
    const staticProductDetail = getProductDetailBySlug(slug);
    if (staticProductDetail) return staticProductDetail;

    const data = productData as any[];
    const accessData = accessPointData as any[];
    const access1Data = accessPoint1Data as any[];
    let foundProduct: any = null;

    // Search for the product by model (slug is assumed to be model)
    // Slug might be lowercased, so we compare case-insensitively

    // First search in regular product data
    for (const item of data) {
        if (item.category && item.products) {
            const match = item.products.find((p: any) => p.model.toLowerCase() === slug.toLowerCase());
            if (match) {
                foundProduct = match;
                break;
            }
        } else if (item.model && item.model.toLowerCase() === slug.toLowerCase()) {
            foundProduct = item;
            break;
        }
    }

    // If not found, search in access point data
    if (!foundProduct) {
        for (const item of accessData) {
            if (item.category && item.products) {
                const match = item.products.find((p: any) => p.model.toLowerCase() === slug.toLowerCase());
                if (match) {
                    foundProduct = match;
                    break;
                }
            }
        }
    }

    // If still not found, search in accesspoint1 data
    if (!foundProduct) {
        for (const item of access1Data) {
            if (item.category && item.products) {
                const match = item.products.find((p: any) => p.model.toLowerCase() === slug.toLowerCase());
                if (match) {
                    foundProduct = match;
                    break;
                }
            }
        }
    }

    if (!foundProduct) return null;

    // Map foundProduct to ProductDetail
    const p = foundProduct;

    // Determine Hero Info
    const heroTitle = p.productType || p.title || p.model;
    const heroSubtitle = p.model;
    const heroDescription = p.description || (Array.isArray(p.productOverview) ? p.productOverview[0] : p.productOverview) || "";

    // Determine Key Stats
    let keyStats = {
        switchingCapacity: "Not Available",
        forwardingRate: "Not Available",
        connectivity: "Not Available"
    };

    if (p.performanceSummary) {
        keyStats.switchingCapacity = p.performanceSummary.switchingCapacity || "Not Available";
        keyStats.forwardingRate = p.performanceSummary.forwardingRate || "Not Available";
    } else if (p.performance) {
        keyStats.switchingCapacity = p.performance.switchingCapacity || "Not Available";
        keyStats.forwardingRate = p.performance.forwardingRate || "Not Available";
    } else if (p.technicalSpecification?.chipParameters) {
        keyStats.switchingCapacity = p.technicalSpecification.chipParameters.switchingCapacity || "Not Available";
        keyStats.forwardingRate = p.technicalSpecification.chipParameters.forwardingRate || "Not Available";
    } else if (p.technicalSpecifications?.throughput) {
        // Access point structure
        keyStats.switchingCapacity = p.technicalSpecifications.throughput.withoutAuthentication || "Not Available";
        keyStats.forwardingRate = p.technicalSpecifications.throughput.withAuthentication || "Not Available";
    } else if (p.connectivity) {
        // Access point connectivity info
        keyStats.connectivity = p.connectivity.ports || "Not Available";
        keyStats.switchingCapacity = p.connectivity.powerConsumption || "Not Available";
    }

    // Determine Features (Top 3 Cards)
    const features: any[] = [];
    let keyFeaturesObj: any = {};
    let featureKeys: string[] = [];

    // Handle different keyFeatures structures
    if (Array.isArray(p.keyFeatures)) {
        // Access point structure: array of {category, features}
        p.keyFeatures.forEach((item: any) => {
            if (item.category && item.features) {
                keyFeaturesObj[item.category] = item.features;
            }
        });
        featureKeys = Object.keys(keyFeaturesObj);
    } else if (p.keyFeatures && typeof p.keyFeatures === 'object') {
        // Regular product structure: object with category keys
        keyFeaturesObj = p.keyFeatures;
        featureKeys = Object.keys(keyFeaturesObj);
    }

    const icons = ["zap", "layers", "shield"]; // Default icons

    featureKeys.slice(0, 3).forEach((key, idx) => {
        const val = keyFeaturesObj[key];
        features.push({
            icon: icons[idx % icons.length],
            title: toTitleCase(key),
            description: Array.isArray(val) ? val[0] : val
        });
    });

    // Determine Overview
    let overviewParagraphs: string[] = [];
    if (p.overview && p.overview.paragraphs) {
        // Access point structure (NAV-50, NAV-100)
        overviewParagraphs = p.overview.paragraphs;
    } else if (p.overview && Array.isArray(p.overview.description)) {
        // Access point NAV-500, NAV-1000 structure
        overviewParagraphs = p.overview.description;
    } else if (p.overview && Array.isArray(p.overview.content)) {
        // Access point NAV-2500 structure
        overviewParagraphs = p.overview.content;
    } else if (Array.isArray(p.productOverview)) {
        overviewParagraphs = p.productOverview;
    } else if (typeof p.productOverview === 'string') {
        overviewParagraphs = [p.productOverview];
    } else {
        overviewParagraphs = [p.description || ""];
    }

    // Handle highlights section (for NAV-519-VA and similar products)
    const highlights = p.highlights || [];

    // Handle applications section
    const applications = p.applications || null;

    // Handle advanced capabilities section
    const advancedCapabilities = p.advancedCapabilities || [];

    // Handle conclusion section
    const conclusion = p.conclusion || null;

    // Determine Key Features Cards (Advanced Capabilities)
    const keyFeaturesCards = featureKeys.map((key, idx) => ({
        title: toTitleCase(key),
        items: Array.isArray(keyFeaturesObj[key]) ? keyFeaturesObj[key] : [keyFeaturesObj[key]],
        highlighted: idx === featureKeys.length - 1 // Highlight last one
    }));

    // Determine Technical Specs
    const technicalSpecs: any[] = [];
    const techSpec = p.technicalSpecification || p.technicalSpecifications;
    if (techSpec) {
        Object.keys(techSpec).forEach(key => {
            if (key === 'feature' || key === 'model' || key === 'modelName') return;

            const specObj = techSpec[key];
            const specs: any[] = [];

            if (typeof specObj === 'object' && !Array.isArray(specObj)) {
                Object.keys(specObj).forEach(subKey => {
                    const subValue = specObj[subKey];
                    let description;

                    // Handle nested objects by converting them to readable format
                    if (typeof subValue === 'object' && !Array.isArray(subValue)) {
                        description = Object.entries(subValue).map(([k, v]) => `${k.replace(/_/g, '.')}: ${v}`).join(', ');
                    } else {
                        description = subValue;
                    }

                    specs.push({
                        feature: toTitleCase(subKey),
                        description: description
                    });
                });
            } else if (Array.isArray(specObj)) {
                // Handle array of specifications
                specs.push({
                    feature: toTitleCase(key),
                    description: specObj
                });
            } else {
                // Handle direct values
                specs.push({
                    feature: toTitleCase(key),
                    description: specObj
                });
            }

            if (specs.length > 0) {
                technicalSpecs.push({
                    category: toTitleCase(key),
                    specs
                });
            }
        });
    }

    // Determine Ordering Info
    const orderingInfo = (p.orderingInformation || []).map((o: any) => ({
        model: o.model,
        description: o.description,
        powerSupply: o.recommendedPowerSupply || o.powerSupply || "Not Avaliable"
    }));

    // Determine Packing List
    const packingList = (p.packingList || []).map((pl: any) => ({
        content: pl.content,
        quantity: String(pl.qty || pl.quantity),
        unit: pl.unit
    }));

    // Optional Modules
    let optionalModules: any[] = [];
    if (p.opticalModule && Array.isArray(p.opticalModule)) {
        optionalModules = p.opticalModule.map((m: any) => ({
            product: m.product || m.category || "Optical Module",
            model: m.model,
            description: m.description,
            unit: m.unit
        }));
    } else if (p.optionalModules && Array.isArray(p.optionalModules)) {
        optionalModules = p.optionalModules.map((m: any) => ({
            product: m.product || m.category || "Optional Module",
            model: m.model,
            description: m.description,
            unit: m.unit
        }));
    }

    return {
        id: p.model.toLowerCase(),
        slug: p.model.toLowerCase(),
        name: p.model,
        title: p.title || p.model,
        model: p.model,
        heroImage: getProductImage(p.model),
        images: [getProductImage(p.model)],
        heroTitle,
        heroSubtitle,
        heroDescription,
        keyStats,
        features,
        overview: {
            title: "Product Overview",
            paragraphs: overviewParagraphs
        },
        keyFeaturesCards,
        technicalSpecs,
        orderingInfo,
        packingList,
        optionalModules,
        // New fields for enhanced products like NAV-519-VA
        highlights,
        applications,
        advancedCapabilities,
        conclusion
    };
};
