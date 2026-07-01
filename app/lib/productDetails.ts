// Product Details Data Structure
export interface ProductDetail {
    id: string;
    slug: string;
    name: string;
    title: string;
    model: string;
    heroImage: string;
    images: string[];

    // Hero Section
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;

    // Key Stats
    keyStats: {
        switchingCapacity: string;
        forwardingRate: string;
        connectivity?: string;
    };

    // Features
    features: {
        icon: string;
        title: string;
        description: string;
    }[];

    // Overview
    overview: {
        title: string;
        paragraphs: string[];
    };

    // Key Features Cards
    keyFeaturesCards: {
        title: string;
        items: string[];
        highlighted?: boolean;
    }[];

    // Technical Specifications
    technicalSpecs: {
        category: string;
        specs: {
            feature: string;
            description: string | string[];
        }[];
    }[];

    // Ordering Information
    orderingInfo: {
        model: string;
        description: string;
        powerSupply: string;
    }[];

    // Packing List
    packingList: {
        content: string;
        quantity: string;
        unit: string;
    }[];

    // Optional Modules
    optionalModules?: {
        product: string;
        model: string;
        description: string;
        unit: string;
    }[];

    // New fields for enhanced products (like NAV-519-VA)
    highlights?: {
        title: string;
        description: string;
    }[];

    applications?: {
        title: string;
        categories: {
            name: string;
            items: string[];
        }[];
    };

    advancedCapabilities?: {
        title: string;
        description: string;
    }[];

    conclusion?: string;
}

export const productDetailsData: Record<string, ProductDetail> = {
    "nav-c24s2q": {
        id: "nav-c24s2q",
        slug: "nav-c24s2q",
        name: "26-port L3 managed core routing switch",
        title: "26-port L3 managed core routing switch",
        model: "NAV-C24S2Q",
        heroImage: "/slide-1.jpg",
        images: ["/slide-1.jpg", "/slide-2.jpg", "/slider-3.jpeg", "/slider-4.jpeg"],

        heroTitle: "26-port L3 managed core routing switch",
        heroSubtitle: "(NAV-C24S2Q)",
        heroDescription: "High-Speed Layer 3 Industrial Connectivity",

        keyStats: {
            switchingCapacity: "880Gbps",
            forwardingRate: "654 Mpps",
            connectivity: "Non-blocking"
        },

        features: [
            {
                icon: "zap",
                title: "Advanced Architecture",
                description: "Equipped with ASIC switching chip and multi-core processor with 1.28Tbps switching capacity for high-density data centers."
            },
            {
                icon: "layers",
                title: "Virtualization (VSS)",
                description: "Virtualizes multiple physical devices into one logical device, extending clusters up to 80km and eliminating STP blocking."
            },
            {
                icon: "shield",
                title: "High Reliability",
                description: "Supports ISSU for uninterrupted upgrades, Ethernet OAM for fault detection, and redundant hot-swappable power supplies."
            }
        ],

        overview: {
            title: "Product Overview",
            paragraphs: [
                "The NAV-C24S2Q is a high-performance Layer 3 (L3) managed Ethernet switch designed for next-generation IP metropolitan area networks, large campus networks, and enterprise environments. It features 24x 1/10G SFP+ fiber ports and 2x 40/100G QSFP28 fiber ports housed in a standard 1U/19-inch chassis.",
                "Designed to meet the resource pooling demands of cloud computing data centers, the NAV-C24S2Q supports advanced virtualization features (such as BVSS). When deployed as a data center core switch, it scales to support access for over 15,000 10G servers, offering a comprehensive solution for ultra-large data centers.",
                "Beyond high-performance L2/L3/L4 line-speed switching, it integrates critical network services including IPv6 support, network security, traffic analysis, and virtualization. It ensures maximum uptime through high-reliability technologies like continuous upgrades, graceful restarts, and redundant protection."
            ]
        },

        keyFeaturesCards: [
            {
                title: "Ultra-High Connectivity",
                items: [
                    "24x 1/10G SFP+ fiber ports and 2x 40/100G QSFP28 uplinks for massive throughput.",
                    "1.28Tbps switching capacity with line-speed forwarding for high-density data centers."
                ]
            },
            {
                title: "VSS Virtualization",
                items: [
                    "Virtualizes multiple physical devices into one logical unit, extending clusters up to 80km.",
                    "Bullet 2: Eliminates STP blocking to double performance and simplify management."
                ]
            },
            {
                title: "Rich L3 Service Features",
                items: [
                    "Full IPv4/IPv6 stack with static routing, RIP, OSPF, BGP, and IS-IS.",
                    "Supports VRRP, BFD for OSPF, and ECMP for load balancing.",
                    "Advanced multicast with IGMP v1/v2/v3 and PIM-SM/DM for HD video.",
                    "4K VLANs, QinQ, and private VLAN support for flexible segmentation."
                ]
            },
            {
                title: "Comprehensive Security",
                items: [
                    "IEEE 802.1x, Radius, and Tacacs+ authentication with hierarchical user permissions.",
                    "Hardware defense against DoS, TCP/UDP floods, and broadcast storms.",
                    "uRPF reverse routing lookup and deep packet inspection."
                ]
            },
            {
                title: "Carrier-Grade Reliability",
                items: [
                    "ISSU support for uninterrupted in-service software upgrades.",
                    "Modular 1+1 redundant hot-swappable power supplies.",
                    "Ethernet OAM (802.3ah) and BFD for millisecond-level fault detection"
                ]
            },
            {
                title: "Next-Gen Core Solution",
                items: [
                    "A next-gen core routing switch for cloud computing and large-scale campus networks, it features 100G uplinks and VSS virtualization, supporting access for over 15,000 servers with zero-downtime operations through advanced redundancy and hitless protection."
                ],
                highlighted: true
            }
        ],

        technicalSpecs: [
            {
                category: "Hardware",
                specs: [
                    { feature: "Model", description: "NAV-C24S2Q" },
                    { feature: "Fixed Port", description: ["24x 1/10G SFP+ fiber ports (Data)", "2x 40G/100G QSFP28 fiber ports (Data)"] },
                    { feature: "Power Port", description: "2 ports" },
                    { feature: "Fan", description: "4 (built-in)" },
                    { feature: "Switching Capacity", description: "880Gbps (non-blocking)" },
                    { feature: "Forwarding Rate@64byte", description: "654.72Mpps" },
                    { feature: "MAC", description: "32K" },
                    { feature: "Buffer Memory", description: "32M" },
                    { feature: "Power Supply", description: "AC100-240V 50Hz±10%" },
                    { feature: "Operation Temp/Humidity", description: "-10°C~+50°C, 5%~90% RH non-condensing" },
                    { feature: "Storage Temp/Humidity", description: "-20°C~+70°C, 5%~95% RH non-condensing" },
                    { feature: "Dimension (L*W*H)", description: "442.5*300*44.5mm" }
                ]
            },
            {
                category: "Layer 2 Features",
                specs: [
                    { feature: "Datacenter Feature", description: ["Support VSS virtualization technology", "Configurable MAC address aging time", "Black hole MAC, MAC address learning quantity limit"] },
                    { feature: "MAC Exchange", description: ["Static configuration and dynamic learning of MAC addresses", "View and clear MAC addresses, MAC address filtering function"] },
                    { feature: "VLAN", description: ["GVRP, Private VLAN, 4K VLAN", "1:1 and N:1 VLAN Mapping, Basic QinQ and QinQ functions"] },
                    { feature: "STP", description: ["802.1D (STP), 802.1W (RSTP), 802.1S (MSTP)", "BPDU protection, Root protection, Loop protection", "Multicast traffic cross-VLAN replication"] }
                ]
            },
            {
                category: "Layer 3 Features",
                specs: [
                    { feature: "Multicast", description: ["Support multicast group policy and multicast group quantity limit", "IGMP v1/v2/v3, PIM-SM, PIM-DM, IGMP Snooping, IGMP Fast Leave"] },
                    { feature: "IPv4", description: ["Policy routing, BFD for OSPF, BGP", "Equal-cost routing to achieve load balancing", "Static routing, RIP v1/v2, OSPF, BGP, IS-IS, IBEIGRP"] },
                    { feature: "IPv6", description: ["MLD v1/v2, MLD Snooping", "ICMPv6, DHCPv6, ACLv6, IPv6 Telnet", "Manual tunnel, ISATAP tunnel, 6to4 tunnel", "IPv6 static routing, RIPng, OSPFv3, BGP4+", "IPv6 neighbor discovery, Path MTU discovery"] }
                ]
            }
        ],

        orderingInfo: [
            {
                model: "NAV-C24S2Q",
                description: "L3 managed Ethernet core routing switch with 24x 1/10G SFP+ fiber ports and 2x 40/100G QSFP28 fiber ports. Redundant dual AC power supply (75W*2). Supports 1U/19\" cabinet mount.",
                powerSupply: "75W x 2"
            }
        ],

        packingList: [
            { content: "NAV-C24S2Q (26-port 10G Switch)", quantity: "1", unit: "Set" },
            { content: "AC Power Cable", quantity: "2", unit: "PC" },
            { content: "RJ45-DB9 Adapter Cable", quantity: "1", unit: "PC" },
            { content: "Mounting Ear", quantity: "1", unit: "Set" },
            { content: "User Guide", quantity: "1", unit: "PC" },
            { content: "Warranty Card & Certificate", quantity: "1", unit: "PC" }
        ],

        optionalModules: [
            {
                product: "1.25G Optical Module",
                model: "Z630",
                description: "SFP optical module, 1.25G multi-mode dual fiber 850nm, transmission distance: 550m, LC interface. Supports DDM function and hot plugging.",
                unit: "PC"
            },
            {
                product: "1.25G Optical Module",
                model: "Z632",
                description: "SFP optical module, 1.25G single-mode dual fiber 1310nm, transmission distance: 20km, LC interface. Supports DDM function and hot plugging.",
                unit: "PC"
            },
            {
                product: "1.25G Optical Module",
                model: "Z612-T",
                description: "SFP optical module, 1.25G single-mode single fiber TX1310nm/ RX1550nm, transmission distance: 20km, LC interface. Supports DDM function and hot plugging.",
                unit: "PC"
            },
            {
                product: "1.25G Optical Module",
                model: "Z613-R",
                description: "SFP optical module, 1.25G single-mode single fiber TX1550nm/ RX1310nm, transmission distance: 20km, LC interface. Supports DDM function and hot plugging.",
                unit: "PC"
            },
            {
                product: "1.25G Optical Module",
                model: "Z612-T-SC",
                description: "SFP optical module, 1.25G single-mode single fiber TX1310nm/ RX1550nm, transmission distance: 20km, SC interface. Supports DDM function and hot plugging.",
                unit: "PC"
            }
        ]
    }
};

// Helper function to get product details by slug
export function getProductDetailBySlug(slug: string): ProductDetail | null {
    return productDetailsData[slug] || null;
}
