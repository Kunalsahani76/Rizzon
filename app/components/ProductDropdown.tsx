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
  const defaultCategory = "Access Point";
  const [openCategory, setOpenCategory] = useState<string | null>(defaultCategory);
  const [hoveredSubItem, setHoveredSubItem] = useState<string | null>(null);

  const switchCategories = productCategories.filter(
    category => !["Access Point Controllers", "Access Point", "NMS", "UVSS"].includes(category.title)
  );
  const switchesCategory = {
    title: "Switches",
    href: "/products/switches",
    subItems: switchCategories.flatMap(category => category.subItems || []),
  };
  const aaaProducts = productCategories
    .find(category => category.title === "Access Point Controllers")
    ?.subItems?.filter(product => ["U-50", "U-100", "U-200", "U-500", "U-1000", "U-5050"].includes(product.model || "")) || [];
  const aaaCategory = {
    title: "AAA",
    href: "/products/aaa",
    subItems: aaaProducts,
  };
  const dcimCategory = {
    title: "DCIM",
    href: "/products/dcim",
    subItems: [{
      title: "Data Center Infrastructure Management",
      href: "/products/dcim",
      img: "/banner-images/DCIM.jpg",
      description: "Data Center Infrastructure Management",
    }],
  };
  const hmsCategory = {
    title: "HMS",
    href: "/products/hms",
    subItems: [{
      title: "Health Monitoring System",
      href: "/products/hms",
      img: "/banner-images/HMS.jpg",
      description: "Health Monitoring System",
    }],
  };
  const activeCategory = openCategory === "Switches"
    ? switchesCategory
    : openCategory === "AAA"
      ? aaaCategory
      : openCategory === "DCIM"
        ? dcimCategory
        : openCategory === "HMS"
          ? hmsCategory
          : productCategories.find((c) => c.title === openCategory) || productCategories[0];

  const columns = getProductsMenuColumns(activeCategory, hoveredSubItem, setOpenCategory, setHoveredSubItem);

  return <MegaMenuDropdown isOpen={isOpen} onClose={onClose} columns={columns} gridCols="grid-cols-[350px_1fr]" />;
}
