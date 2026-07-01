# Product Details System - Setup Guide

## How It Works

### 1. Product Route Structure
Products are accessed via: `/products/[category]/[slug]`

Example: `/products/ethernet-switch/nav-c24s2q`

### 2. Data Flow

```
URL → Product Route → menuData → DetailsPage → productDetails
```

1. **URL**: User navigates to `/products/ethernet-switch/nav-c24s2q`
2. **Route** (`app/products/[category]/[slug]/page.tsx`): Extracts slug and looks up in `productData`
3. **menuData.ts**: Returns basic product info (MenuItem)
4. **DetailsPage.tsx**: Receives MenuItem, checks for enhanced data using `id`
5. **productDetails.ts**: If match found, displays professional layout with all sections

### 3. Adding New Products with Detailed Pages

#### Step 1: Add to menuData.ts
```typescript
"your-product-slug": {
    id: "your-product-slug",
    title: "Your Product Name",
    description: "Product description",
    image: "/image.jpg",
    features: ["Feature 1", "Feature 2"],
    specifications: {
        "Spec Name": "Spec Value"
    }
}
```

#### Step 2: Add to productDetails.ts (Optional - for enhanced view)
```typescript
"your-product-slug": {
    id: "your-product-slug",
    slug: "your-product-slug",
    name: "Product Name",
    title: "Product Title",
    model: "MODEL-NUMBER",
    heroImage: "/image.jpg",
    images: ["/img1.jpg", "/img2.jpg"],
    
    heroTitle: "Main Title",
    heroSubtitle: "Subtitle",
    heroDescription: "Description",
    
    keyStats: {
        switchingCapacity: "880Gbps",
        forwardingRate: "654 Mpps"
    },
    
    features: [
        {
            icon: "zap", // or "layers", "shield"
            title: "Feature Title",
            description: "Feature description"
        }
    ],
    
    overview: {
        title: "Product Overview",
        paragraphs: ["Paragraph 1", "Paragraph 2"]
    },
    
    keyFeaturesCards: [
        {
            title: "Feature Card Title",
            items: ["Item 1", "Item 2"],
            highlighted: false // true for dark background
        }
    ],
    
    technicalSpecs: [
        {
            category: "Hardware",
            specs: [
                { 
                    feature: "Model", 
                    description: "MODEL-NUMBER" 
                }
            ]
        }
    ],
    
    orderingInfo: [
        {
            model: "MODEL",
            description: "Description",
            powerSupply: "75W x 2"
        }
    ],
    
    packingList: [
        { 
            content: "Product", 
            quantity: "1", 
            unit: "Set" 
        }
    ],
    
    optionalModules: [
        {
            product: "Module Name",
            model: "Z630",
            description: "Module description",
            unit: "PC"
        }
    ]
}
```

### 4. Current Products

#### With Enhanced Details:
- **nav-c24s2q**: 26-port L3 managed core routing switch
  - Route: `/products/ethernet-switch/nav-c24s2q`
  - Has full professional layout

#### Basic Products (MenuItem only):
- All other products in `productData`
- Display simplified layout
- Can be enhanced by adding to `productDetails.ts`

### 5. Icon Options

For features, use these icon identifiers:
- `"zap"` - Lightning bolt (for performance/power)
- `"layers"` - Stacked layers (for virtualization)
- `"shield"` - Shield (for security/reliability)

### 6. Category Routes

Products are organized by category:
- Industrial PoE Switch: `/products/industrial-poe-switch/[slug]`
- Industrial Ethernet Switch: `/products/industrial-ethernet-switch/[slug]`
- PoE Switch: `/products/poe-switch/[slug]`
- Ethernet Switch: `/products/ethernet-switch/[slug]`
- Wireless Bridge AP: `/products/wireless-bridge-ap/[slug]`

## Testing

Visit: `http://localhost:3000/products/ethernet-switch/nav-c24s2q`

You should see the professional product page with:
- Hero section with product image
- Connectivity features with stats
- Product overview
- Key features cards
- Technical specifications table
- Ordering information
- Packing list
- Optional modules

## Notes

- If a product only exists in `menuData.ts`, it shows basic layout
- If a product exists in both `menuData.ts` and `productDetails.ts`, it shows enhanced layout
- The `id` field must match between both files
- All products must exist in `menuData.ts` first
