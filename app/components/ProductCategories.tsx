import { getAllProducts, getAccessPointControllers, getAccessPoints } from "@/lib/productUtils";

export interface ProductCategory {
  title: string;
  href: string;
  subItems?: {
    title: string;
    href: string;
    img?: string;
    video?: string;
    model?: string;
    description?: string;
    subItems?: { title: string; href: string }[]
  }[];
}

const generateProductCategories = (): ProductCategory[] => {
  const regularProducts = getAllProducts();
  const accessPointControllerProducts = getAccessPointControllers();
  const accessPointProducts = getAccessPoints();
  const allProducts = [...accessPointControllerProducts, ...accessPointProducts, ...regularProducts]; // Put access points first
  const categoriesMap = new Map<string, ProductCategory>();

  allProducts.forEach((product) => {
    if (!categoriesMap.has(product.category)) {
      categoriesMap.set(product.category, {
        title: product.category,
        href: `/products/${product.category.toLowerCase().replace(/\s+/g, '-')}`,
        subItems: []
      });
    }

    const category = categoriesMap.get(product.category)!;
    category.subItems?.push({
      title: product.title,
      href: `/products/${product.category.toLowerCase().replace(/\s+/g, '-')}/${product.model.toLowerCase()}`,
      img: product.img,
      video: product.video,
      model: product.model,
      description: product.description
    });
  });

  return Array.from(categoriesMap.values());
};

export const productCategories: ProductCategory[] = generateProductCategories();
