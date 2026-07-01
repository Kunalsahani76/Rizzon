
export interface MenuItem {
    id: string;
    title: string;
    description: string;
    image?: string;
    features?: string[];
    specifications?: Record<string, string>;
}

export const productData: Record<string, MenuItem> = {
    // Industrial PoE Switch
    "nav-i-l3-p24-021": {
        id: "nav-i-l3-p24-021",
        title: "10G uplink 24-port L3 managed industrial PoE - NAV-I-L3-P24-021",
        description: "The NAV-I-L3-P24-021 is a high-performance 10G uplink, 24-port L3 managed industrial PoE switch designed for robust industrial networks. It ensures stable power delivery and efficient data transmission in harsh environments.",
        image: "/slide-1.jpg",
        features: ["L3 Managed", "10G Uplink", "Industrial Grade", "PoE Support"],
    },
    "nav-i-l0-p10-037": {
        id: "nav-i-l0-p10-037",
        title: "10G uplink 28-port L2 managed industrial PoE switch - NAV-I-L0-P10-037",
        description: "The NAV-I-L0-P10-037 is a 10G uplink, 28-port L2 managed industrial PoE switch designed for stable power delivery, efficient network control, and reliable industrial-grade performance.",
        image: "/slide-2.jpg",
    },
    "nav-i-l2-p28-090": {
        id: "nav-i-l2-p28-090",
        title: "Gigabit 16-port L2 managed industrial PoE switch - NAV-I-L2-P28-090",
        description: "The NAV-I-L2-P28-090 is a Gigabit 16-port L2 managed industrial PoE switch engineered for reliable data transmission, intelligent network management, and dependable performance in demanding industrial environments.",
        image: "/slider-3.jpeg",
    },
    "nav-i-l2-p16-091": {
        id: "nav-i-l2-p16-091",
        title: "Gigabit 10-port L2 managed industrial bt PoE switch - NAV-I-L2-P16-091",
        description: "The NAV-I-L2-P16-091 is a Gigabit 10-port L2 managed industrial bt PoE switch delivering high-power PoE, efficient network control, and strong reliability for advanced industrial applications.",
        image: "/slider-4.jpeg",
    },
    "nav-i-l2-p10-092": {
        id: "nav-i-l2-p10-092",
        title: "Gigabit 8-port L2 managed industrial PoE switch - NAV-I-L2-P10-092",
        description: "The NAV-I-L2-P10-092 is a Gigabit 8-port L2 managed industrial PoE switch built to ensure stable power delivery, smart network management, and reliable performance in harsh industrial environments.",
        image: "/s1.jpeg",
    },

    // Industrial Ethernet Switch
    "nav-i-e-l2-p24-066": {
        id: "nav-i-e-l2-p24-066",
        title: "Gigabit 24-port L2 managed industrial Ethernet switch NAV-I-E-L2-P24-066",
        description: "The NAV-I-E-L2-P24-066 is a Gigabit 24-port L2 managed industrial Ethernet switch offering robust network stability, advanced management features, and reliable connectivity for mission-critical industrial operations.",
        image: "/s2.jpeg",
    },
    "nav-i-e-l2-p10-084": {
        id: "nav-i-e-l2-p10-084",
        title: "Gigabit 10-port L2 managed industrial Ethernet switch NAV-I-E-L2-P10-084",
        description: "The NAV-I-E-L2-P10-084 is a Gigabit 10-port L2 managed industrial Ethernet switch designed for reliable data transmission, intelligent network control, and seamless connectivity in industrial environments.",
        image: "/s3.jpeg",
    },
    "nav-i-e-l2-p8-085": {
        id: "nav-i-e-l2-p8-085",
        title: "Gigabit 8-port L2 managed industrial Ethernet switch NAV-I-E-L2-P8-085",
        description: "The NAV-I-E-L2-P8-085 is a Gigabit 8-port L2 managed industrial Ethernet switch built for dependable connectivity, efficient network management, and reliable performance in rugged industrial environments.",
        image: "/s4.jpeg",
    },

    // PoE Switch
    "nav-p-l2-p18-003": {
        id: "nav-p-l2-p18-003",
        title: "Gigabit 18-port L2 managed PoE switch NAV-P-L2-P18-003",
        description: "The NAV-P-L2-P18-003 is a Gigabit 18-port L2 managed PoE switch offering stable power delivery, smart network control, and reliable industrial-grade performance for critical applications.",
        image: "/slider-32.png",
    },
    "nav-p-l2-p26-004": {
        id: "nav-p-l2-p26-004",
        title: "Gigabit 26-port L2 managed PoE switch NAV-P-L2-P26-004",
        description: "The NAV-P-L2-P26-004 is a Gigabit 26-port L2 managed PoE switch engineered for efficient power distribution, robust network management, and high-performance connectivity in industrial and enterprise environments.",
        image: "/slider-5.png",
    },
    "nav-p-l2-p28-012": {
        id: "nav-p-l2-p28-012",
        title: "Gigabit 28-port L2 managed PoE switch NAV-P-L2-P28-012",
        description: "The NAV-P-L2-P28-012 is a Gigabit 28-port L2 managed PoE switch delivering reliable power, advanced network control, and high-performance connectivity suited for demanding industrial and commercial applications.",
        image: "/slider-3.jpeg",
    },
    "nav-p-l0-p28-029": {
        id: "nav-p-l0-p28-029",
        title: "Gigabit 28-port Easy managed PoE switch NAV-P-L0-P28-029",
        description: "The NAV-P-L0-P28-029 is a Gigabit 28-port easy managed PoE switch designed for simplified network management, stable power delivery, and dependable performance in industrial and commercial environments.",
        image: "/slider-3.jpeg",
    },
    "nav-p-l0-p27-034": {
        id: "nav-p-l0-p27-034",
        title: "Gigabit 27-port PoE switch NAV-P-L0-P27-034",
        description: "The NAV-P-L0-P27-034 is a Gigabit 27-port PoE switch offering reliable power transmission, easy network management, and robust connectivity for versatile industrial and commercial applications.",
        image: "/slider-3.jpeg",
    },
    "nav-p-l2-p52-052": {
        id: "nav-p-l2-p52-052",
        title: "10G uplink 52-port L2 managed PoE switch NAV-P-L2-P52-052",
        description: "The NAV-P-L2-P52-052 is a 10G uplink, 52-port L2 managed PoE switch built for large-scale networks, offering intelligent management, stable power delivery, and high-performance industrial connectivity.",
        image: "/slider-5.png",
    },
    "nav-p-l2-p36-072": {
        id: "nav-p-l2-p36-072",
        title: "10G uplink 36-port L2 managed PoE switch NAV-P-L2-P36-072",
        description: "The NAV-P-L2-P36-072 is a 10G uplink, 36-port L2 managed PoE switch delivering efficient power distribution, advanced network control, and high-speed performance for industrial and enterprise environments.",
        image: "/slider-5.png",
    },
    "nav-p-l0-p8-085": {
        id: "nav-p-l0-p8-085",
        title: "Gigabit 8-port PoE switch NAV-P-L0-P8-085",
        description: "The NAV-P-L0-P8-085 is a Gigabit 8-port PoE switch offering compact design, stable power transmission, and simple network management for small-scale industrial and commercial applications.",
        image: "/s4.jpeg",
    },
    "nav-p-l0-p12-087": {
        id: "nav-p-l0-p12-087",
        title: "Gigabit uplink 12-port PoE switch NAV-P-L0-P12-087",
        description: "The NAV-P-L0-P12-087 is a Gigabit uplink, 12-port PoE switch designed for efficient power delivery, simplified management, and reliable network performance in industrial and commercial environments.",
        image: "/s3.jpeg",
    },
    "nav-p-l2-p18-091": {
        id: "nav-p-l2-p18-091",
        title: "Gigabit uplink 18-port L2 managed PoE switch NAV-P-L2-P18-091",
        description: "The NAV-P-L2-P18-091 is a Gigabit uplink, 18-port L2 managed PoE switch delivering intelligent network control, reliable power distribution, and high-performance connectivity for industrial and commercial applications.",
        image: "/slider-32.png",
    },

    // Aggregation Core Switch (Placeholders as no specific descriptions were in the dropdown)
    "nav-e-l2-p26-003": {
        id: "nav-e-l2-p26-003",
        title: "2.5G 30-port L2 managed Ethernet switch NAV-E-L2-P26-003",
        description: "A high-performance 2.5G 30-port L2 managed Ethernet switch designed for modern network aggregation.",
        image: "/slide-1.jpg",
    },
    "nav-e-l3-p30-005": {
        id: "nav-e-l3-p30-005",
        title: "10G 54-port L3 managed core routing switch NAV-E-L3-P30-005",
        description: "A powerful 10G 54-port L3 managed core routing switch for enterprise backbone networks.",
        image: "/slide-1.jpg",
    },
    "nav-e-l3-p54-008": {
        id: "nav-e-l3-p54-008",
        title: "10G uplink 54-port L3 managed core switch NAV-E-L3-P54-008",
        description: "High-capacity 10G uplink 54-port L3 managed core switch for scalable network architectures.",
        image: "/slide-1.jpg",
    },
    "nav-e-l3-p54-010": {
        id: "nav-e-l3-p54-010",
        title: "10G uplink 28-port L3 managed core switch NAV-E-L3-P54-010",
        description: "Efficient 10G uplink 28-port L3 managed core switch for optimized network performance.",
        image: "/slide-1.jpg",
    },
    "nav-c24s2q": {
        id: "nav-c24s2q",
        title: "26-port L3 managed core routing switch NAV-C24S2Q",
        description: "A high-performance Layer 3 (L3) managed Ethernet switch designed for next-generation IP metropolitan area networks, large campus networks, and enterprise environments.",
        image: "/slide-1.jpg",
        features: ["L3 Managed", "VSS Virtualization", "880Gbps Switching Capacity", "654 Mpps Forwarding Rate"],
        specifications: {
            "Model": "NAV-C24S2Q",
            "Switching Capacity": "880Gbps (non-blocking)",
            "Forwarding Rate": "654.72Mpps @64byte",
            "Ports": "24x 1/10G SFP+ + 2x 40/100G QSFP28"
        }
    },

    // Wireless Bridge AP
    "nav-ap-002": {
        id: "nav-ap-002",
        title: "2.4G 300M wireless bridge NAV-AP-002",
        description: "Reliable 2.4G 300M wireless bridge for long-range wireless connectivity.",
        image: "/slide-1.jpg",
    },
    "nav-ap-003": {
        id: "nav-ap-003",
        title: "3000M WiFi6 dual-band 2.5G ceiling wireless NAV-AP-003",
        description: "Advanced 3000M WiFi6 dual-band 2.5G ceiling wireless AP for high-density environments.",
        image: "/slide-1.jpg",
    },
};

export const networkingData: Record<string, MenuItem> = {
    "indio-cloud": {
        id: "indio-cloud",
        title: "Indio Cloud",
        description: "Indio Cloud is a full-featured, cloud-based Wi-Fi management platform that provides centralized control and monitoring of your entire wireless network infrastructure. With intuitive dashboards and real-time analytics, managing your Wi-Fi has never been easier.",
        image: "/slide-1.jpg",
    },
    "indio-connect": {
        id: "indio-connect",
        title: "Indio Connect",
        description: "Indio Connect effortlessly manages and monitors community Wi-Fi, providing seamless connectivity for public spaces. Designed for simplicity and reliability, it ensures optimal performance for community networks.",
        image: "/slide-1.jpg",
    },
    "wireless-access-points": {
        id: "wireless-access-points",
        title: "Wireless Access Points",
        description: "Powered by OpenWiFi technology, our wireless access points are designed for modern enterprise networks. These access points deliver high-performance connectivity with advanced security features and easy management.",
        image: "/slide-1.jpg",
    },
    "um-225ax": {
        id: "um-225ax",
        title: "UM-225AX",
        description: "The UM-225AX is a high-performance wireless access point that delivers reliable Wi-Fi connectivity for demanding enterprise environments. With support for the latest Wi-Fi standards, it ensures optimal performance and coverage.",
        image: "/slide-1.jpg",
    },
    "um-325ax": {
        id: "um-325ax",
        title: "UM-325AX",
        description: "The UM-325AX is an advanced wireless access point designed for high-density environments. Featuring enhanced throughput and intelligent traffic management, it provides seamless connectivity for large numbers of devices.",
        image: "/slide-1.jpg",
    },
    "um-525ax": {
        id: "um-525ax",
        title: "UM-525AX",
        description: "The UM-525AX is a premium wireless access point engineered for mission-critical applications. With enterprise-grade security and advanced analytics, it delivers unparalleled performance and reliability.",
        image: "/slide-1.jpg",
    },
    "um-525ax-m": {
        id: "um-525ax-m",
        title: "UM-525AX(M)",
        description: "The UM-525AX(M) is a managed version of our premium wireless access point, offering additional configuration options and enhanced control features for IT administrators who require granular network management capabilities.",
        image: "/slide-1.jpg",
    },
    "unibox-controllers": {
        id: "unibox-controllers",
        title: "UniBox Controllers",
        description: "UniBox Controllers provide comprehensive network access and hotspot management capabilities. These controllers offer centralized management of multiple access points, user authentication, and detailed analytics for optimized network performance.",
        image: "/slide-1.jpg",
    },
    "smb-series": {
        id: "smb-series",
        title: "SMB Series",
        description: "The SMB Series UniBox Controllers are designed for small to medium businesses, providing essential network management features with an intuitive interface that simplifies deployment and maintenance.",
        image: "/slide-1.jpg",
    },
    "u-50": {
        id: "u-50",
        title: "U-50",
        description: "The U-50 is an entry-level UniBox controller designed for small businesses with up to 50 access points. It provides essential management features and easy setup for simplified network administration.",
        image: "/slide-1.jpg",
    },
    "u-100": {
        id: "u-100",
        title: "U-100",
        description: "The U-100 is a mid-tier UniBox controller suitable for growing businesses with up to 100 access points. It offers enhanced management capabilities and scalability for expanding network infrastructures.",
        image: "/slide-1.jpg",
    },
    "enterprise-series": {
        id: "enterprise-series",
        title: "Enterprise Series",
        description: "The Enterprise Series UniBox Controllers are built for large organizations with complex networking requirements. These controllers provide advanced features for managing extensive networks with thousands of devices.",
        image: "/slide-1.jpg",
    },
    "u-500": {
        id: "u-500",
        title: "U-500",
        description: "The U-500 is a high-capacity UniBox controller designed for enterprise environments with up to 500 access points. It offers advanced analytics, security features, and redundancy options for mission-critical deployments.",
        image: "/slide-1.jpg",
    },
    "u-1000": {
        id: "u-1000",
        title: "U-1000",
        description: "The U-1000 is our flagship UniBox controller, capable of managing up to 1000 access points. It provides enterprise-grade features including AI-driven optimization, advanced threat protection, and multi-site management capabilities.",
        image: "/slide-1.jpg",
    },
    "campus-series": {
        id: "campus-series",
        title: "Campus Series",
        description: "The Campus Series UniBox Controllers are specifically designed for large educational institutions, corporate campuses, and similar environments. These controllers offer specialized features for managing distributed networks across multiple buildings.",
        image: "/slide-1.jpg",
    },
    "u-2500": {
        id: "u-2500",
        title: "U-2500",
        description: "The U-2500 is a campus-grade UniBox controller capable of managing up to 2500 access points. It features advanced location services, centralized policy management, and integration with campus security systems.",
        image: "/slide-1.jpg",
    },
    "u-5000": {
        id: "u-5000",
        title: "U-5000",
        description: "The U-5000 is our most powerful UniBox controller, designed for large-scale deployments with up to 5000 access points. It provides cloud-scale management capabilities with on-premises control for maximum security and performance.",
        image: "/slide-1.jpg",
    },
    "managed-poe-switches": {
        id: "managed-poe-switches",
        title: "Managed PoE Switches",
        description: "Our Managed PoE Switches are designed to provide high throughput in demanding networks. These switches offer advanced management features, Quality of Service (QoS) controls, and Power over Ethernet capabilities for simplified device deployment.",
        image: "/slide-1.jpg",
    },
    "us-8mp": {
        id: "us-8mp",
        title: "US-8MP Port Switch",
        description: "The US-8MP Port Switch is a compact managed PoE switch with 8 ports, perfect for small offices or remote locations. It provides reliable power and data connectivity with essential management features for network administrators.",
        image: "/slide-1.jpg",
    },
    "us-16mp": {
        id: "us-16mp",
        title: "US-16MP Port Switch",
        description: "The US-16MP Port Switch is a mid-sized managed PoE switch with 16 ports, ideal for growing businesses. It offers enhanced management capabilities and higher power budgets for supporting more PoE devices.",
        image: "/slide-1.jpg",
    },
    "us-24mp": {
        id: "us-24mp",
        title: "US-24MP Port Switch",
        description: "The US-24MP Port Switch is a full-featured managed PoE switch with 24 ports, designed for enterprise environments. It provides advanced Layer 2 management, high power budgets, and redundant power options for mission-critical applications.",
        image: "/slide-1.jpg",
    },
    "4g-5g-routers": {
        id: "4g-5g-routers",
        title: "4G 5G Routers",
        description: "Our 4G/5G Routers provide seamless connectivity on the go, ensuring reliable internet access in remote locations or during network outages. These routers offer enterprise-grade security and performance for mobile and backup connectivity solutions.",
        image: "/slide-1.jpg",
    },
    "mx-705n": {
        id: "mx-705n",
        title: "MX-705N",
        description: "The MX-705N is a versatile 4G/5G router that provides reliable connectivity for remote offices and mobile applications. With support for multiple carrier networks, it ensures optimal performance and uptime.",
        image: "/slide-1.jpg",
    },
    "mx-720ac": {
        id: "mx-720ac",
        title: "MX-720AC",
        description: "The MX-720AC is an advanced 4G/5G router with dual SIM support and automatic failover capabilities. It provides enterprise-grade security features and high-speed connectivity for mission-critical applications.",
        image: "/slide-1.jpg",
    },
};

export const solutionsData: Record<string, MenuItem> = {
    "huddle": {
        id: "huddle",
        title: "Huddle Room Solutions",
        description: "Perfect for quick sync-ups and small group collaborations. Our Huddle Room Solutions are designed to maximize space efficiency while providing top-tier audio and video quality for intimate meetings.",
        image: "/slide-1.jpg",
    },
    "small": {
        id: "small",
        title: "Small Room Solutions",
        description: "Optimized for small teams, these solutions ensure everyone is seen and heard clearly. Featuring wide-angle cameras and crystal-clear audio, our Small Room Solutions make every meeting productive.",
        image: "/slide-1.jpg",
    },
    "medium": {
        id: "medium",
        title: "Medium Room Solutions",
        description: "Designed for standard meeting rooms, our Medium Room Solutions offer professional-grade video conferencing capabilities. With intelligent framing and advanced noise cancellation, they deliver a premium meeting experience.",
        image: "/slide-1.jpg",
    },
    "large": {
        id: "large",
        title: "Large Room Solutions",
        description: "Built for boardrooms and large conference spaces, these solutions provide cinema-quality video and immersive audio. Support for multiple screens and microphones ensures that even the largest gatherings are connected seamlessly.",
        image: "/slide-1.jpg",
    },
    "alliance": {
        id: "alliance",
        title: "Strategic Alliance",
        description: "Partnering with industry leaders to deliver integrated and certified solutions. Our Alliance program ensures compatibility and optimized performance with major collaboration platforms.",
        image: "/slide-1.jpg",
    },
};
