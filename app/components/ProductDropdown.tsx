"use client";

import { useState } from "react";
import { productCategories } from "./ProductCategories";
import MegaMenuDropdown from "./MegaMenuDropdown";
import { getProductsMenuColumns } from "./MegaMenuConfig";

interface ProductDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDropdown({ isOpen, onClose }: ProductDropdownProps) {
  // Set Access Point Controllers as default, fallback to first category
  const defaultCategory = productCategories.find(cat => cat.title === "Access Point Controllers")?.title || productCategories[0]?.title || null;
  const [openCategory, setOpenCategory] = useState<string | null>(defaultCategory);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);

  const switchCategories = productCategories.filter(
    category => category.title !== "Access Point Controllers" && category.title !== "Access Point"
  );
  const switchesCategory = {
    title: "Switches",
    href: "/products/switches",
    subItems: switchCategories.flatMap(category => category.subItems || []),
  };
  const aaaProduct = productCategories
    .find(category => category.title === "Access Point Controllers")
    ?.subItems?.find(product => product.model === "U-5050");
  const aaaCategory = {
    title: "AAA",
    href: "/products/aaa",
    subItems: aaaProduct ? [aaaProduct] : [],
  };
  const activeCategory = openCategory === "Switches"
    ? switchesCategory
    : openCategory === "AAA"
      ? aaaCategory
    : productCategories.find((c) => c.title === openCategory) || productCategories[0];

  const columns = getProductsMenuColumns(activeCategory, hoveredSubItem, setOpenCategory, setHoveredSubItem);

  return <MegaMenuDropdown isOpen={isOpen} onClose={onClose} columns={columns} gridCols="grid-cols-[350px_1fr]" />;
}
