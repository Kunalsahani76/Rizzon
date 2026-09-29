const commonManagedFeatures = {
    switching: [
        "Layer 2+ managed switching with VLAN support.",
        "QoS with 802.1p CoS/DSCP priority and eight priority queues.",
        "Multicast management with IGMP and MLD snooping.",
    ],
    resilience: [
        "Spanning Tree support: STP, RSTP and MSTP.",
        "Link aggregation with 802.3ad LACP.",
        "Port isolation, loopback detection and flow control.",
    ],
    management: [
        "Cloud management and open switching technology.",
        "Designed for enterprise, campus, SMB and surveillance deployments.",
        "Three-year warranty, as stated in the datasheet.",
    ],
};

const uniSwitch = (model: string, ports: number, poe: boolean, uplinks: string, capacity: string, forwarding: string, mac: string, buffer: string, budget?: string) => ({
    model,
    category: "Switches",
    productType: poe ? `${ports}-Port Managed PoE L2+ Switch` : `${ports}-Port Managed L2 Switch`,
    title: poe ? `${ports}-Port Managed PoE L2+ Switch` : `${ports}-Port Managed L2 Switch`,
    description: poe
        ? `The UniSwitch ${model} is a cloud-managed Gigabit Ethernet switch with ${ports} PoE+ access ports and ${uplinks} Gigabit SFP uplinks. It provides managed Layer 2+ features and PoE power for network devices.`
        : `The UniSwitch ${model} is a cloud-managed Gigabit Ethernet switch with ${ports} RJ-45 access ports and ${uplinks} Gigabit SFP uplinks for managed enterprise and campus networks.`,
    productOverview: [
        poe
            ? `The Indio Networks UniSwitch ${model} is a managed Layer 2+ switch with ${ports} Gigabit Ethernet RJ-45 PoE+ ports and ${uplinks} Gigabit SFP uplink ports. It supplies power and network connectivity to devices such as wireless access points, IP cameras and IP phones.`
            : `The Indio Networks UniSwitch ${model} is a cloud-managed Layer 2+ Ethernet switch with ${ports} Gigabit RJ-45 ports and ${uplinks} Gigabit SFP uplink ports. It is designed for enterprise, carrier, campus and SMB networks that need managed connectivity and fiber uplinks.`,
        poe
            ? `The switch supports IEEE 802.3af/at PoE+ with a total power budget of ${budget} and up to 30 W per PoE port. Its management features include VLAN, QoS, spanning tree, link aggregation, multicast management and PoE controls.`
            : `The datasheet lists ${capacity} switching capacity, an ${mac} MAC address table, ${buffer} packet buffer and 15 KB jumbo frames. Cloud management, QoS, VLAN, multicast and network reliability features support flexible deployments.`,
    ],
    keyFeatures: poe ? {
        gigabitPoEAccess: [`${ports} Gigabit Ethernet PoE+ access ports.`, `IEEE 802.3af/at support, up to 30 W per PoE port.`, `${budget} total PoE power budget.`],
        fiberUplinks: [`${uplinks} Gigabit SFP uplink ports.`, "Optical modules are not included.", "Supports single-mode and multi-mode fiber modules."],
        managedNetworking: commonManagedFeatures.switching.concat(commonManagedFeatures.resilience),
    } : {
        gigabitAccess: [`${ports} Gigabit Ethernet RJ-45 access ports.`, `${uplinks} Gigabit SFP uplink ports.`, "RJ-45 console port for device management."],
        managedNetworking: commonManagedFeatures.switching,
        networkReliability: commonManagedFeatures.resilience,
    },
    performanceSummary: { switchingCapacity: capacity, forwardingRate: forwarding },
    technicalSpecification: {
        interfaceConfiguration: {
            ethernetPorts: `${ports} x 10/100/1000 Mbps RJ-45 ports`,
            opticalPorts: `${uplinks} x 10/100/1000 Mbps SFP ports`,
            consolePort: "1 x RJ-45 console port",
            poePorts: poe ? `${ports} x IEEE 802.3af/at PoE+ ports` : "Not applicable",
            poePowerBudget: budget || "Not applicable",
        },
        performance: {
            switchingCapacity: capacity,
            packetForwardingRate: forwarding,
            macAddressTable: mac,
            packetBuffer: buffer,
            jumboFrame: "15 KB",
        },
        networkManagement: {
            qualityOfService: "802.1p CoS / DSCP priority; 8 priority queues; SP, WRR and SP+WRR scheduling",
            layer2Features: "IGMP snooping v1/v2/v3; MLD snooping v1/v2; 802.3ad LACP; STP/RSTP/MSTP; EAPS ring; port isolation; BPDU filtering/guard; LLDP; 802.3x flow control; loopback detection",
            vlan: "802.1Q VLAN support; management VLAN",
            management: "Cloud management; console management",
        },
        warranty: { term: "3 years" },
    },
    orderingInformation: [{ model, description: poe ? `${ports}-port managed PoE+ switch` : `${ports}-port managed Ethernet switch`, recommendedPowerSupply: budget || "AC power; see datasheet" }],
    packingList: [],
});

export const switchProductsData: Array<Record<string, any>> = [
    uniSwitch("US-8M", 8, false, "2", "20 Gbps", "12 Mbps", "4K", "1.5 MB"),
    uniSwitch("US-8MP", 8, true, "2", "20 Gbps", "12 Mbps", "4K", "1.5 MB", "120 W"),
    uniSwitch("US-16M", 16, false, "2", "36 Gbps", "41.7 Mbps", "8K", "4.1 MB"),
    uniSwitch("US-16MP", 16, true, "2", "36 Gbps", "41.7 Mbps", "8K", "4.1 MB", "300 W"),
    uniSwitch("US-24M", 24, false, "2 or 4", "56 Gbps", "41.7 Mbps", "8K", "4.1 MB"),
    uniSwitch("US-24MP", 24, true, "2 or 4", "56 Gbps", "41.7 Mbps", "8K", "4.1 MB", "400 W"),
    {
        model: "ECS4150-28T", displayModel: "ECS4150-28T / ECS4150-28P", category: "Switches", title: "L2+/Lite L3 Gigabit Ethernet Switch", productType: "L2+/Lite L3 Gigabit Ethernet Switch",
        description: "The Edgecore ECS4150-28T/ECS4150-28P family combines Gigabit access ports with 10G SFP+ uplinks, L2+/Lite L3 features and multi-method management.",
        productOverview: ["The ECS4150-28T is a 24-port Gigabit Ethernet access switch with four 10G SFP+ uplinks. The ECS4150-28P variant adds PoE+ on all 24 access ports, with up to 30 W per port and a 370 W total PoE budget.", "Designed for ISP, SMB, enterprise and campus access, the series includes ring protection, IPv6 features, security and QoS. Management is available through Web, CLI, SNMP, ecCLOUD and TIP OLS."],
        keyFeatures: { gigabitAccess: ["24 x 10/100/1000BASE-T RJ-45 ports.", "4 x 10G SFP+ uplink ports.", "PoE+ available on ECS4150-28P, up to 30 W per port."], switchingAndResilience: ["128 Gbps switching capacity and 95 Mpps forwarding rate.", "ITU-T G.8032 ERPS ring protection with under 50 ms convergence.", "L2+/Lite L3 features, IPv6 security and multicast control."], management: ["Web, CLI, SNMP, ecCLOUD and TIP OLS management.", "6 kV surge protection.", "Three-year warranty."] },
        performanceSummary: { switchingCapacity: "128 Gbps", forwardingRate: "95 Mpps" },
        technicalSpecification: { interfaces: { accessPorts: "24 x 10/100/1000BASE-T RJ-45", uplinks: "4 x 10G SFP+", console: "1 x RJ-45 console", management: "1 x RJ-45 out-of-band management; 1 x USB management" }, performance: { switchingCapacity: "128 Gbps", forwardingRate: "95 Mpps", packetBuffer: "1.5 MB", macAddressTable: "16K", jumboFrames: "10 KB" }, poeVariant: { model: "ECS4150-28P", standard: "IEEE 802.3af/at", portPower: "Up to 30 W per port", totalBudget: "370 W" }, environment: { operatingTemperature: "-5 to 45 °C", storageTemperature: "-40 to 70 °C", humidity: "5% to 95%", surgeProtection: "6 kV" }, management: { protocols: "Web, CLI, SNMP, ecCLOUD, TIP OLS", protection: "ITU-T G.8032 ERPS; IPv6; QoS; multicast control" } },
        orderingInformation: [{ model: "ECS4150-28T / ECS4150-28P", description: "Gigabit Ethernet access switch; PoE+ is available on the -28P model", recommendedPowerSupply: "AC 100-240 VAC, 50/60 Hz" }], packingList: [],
    },
    {
        model: "ECS4150-54T", displayModel: "ECS4150-54T / ECS4150-54P", category: "Switches", title: "L2+/Lite L3 Gigabit Ethernet Switch", productType: "L2+/Lite L3 Gigabit Ethernet Switch",
        description: "The Edgecore ECS4150-54T/ECS4150-54P family provides 48 Gigabit access ports and six 25G SFP28 uplinks with L2+/Lite L3 management features.",
        productOverview: ["The ECS4150-54T provides 48 Gigabit Ethernet access ports and six 25G SFP28 uplinks. The ECS4150-54P variant supports PoE on all 48 ports: PoE+ up to 30 W on ports 1–40 and PoE++ up to 90 W on ports 41–48, with a 740 W budget.", "The series is designed for high-performance enterprise, SMB and campus access, and supports ring protection, IPv6, multicast control, QoS and management through Web, CLI, SNMP, ecCLOUD and TIP OLS."],
        keyFeatures: { gigabitAccess: ["48 x 10/100/1000BASE-T RJ-45 ports.", "6 x 25G SFP28 uplink ports.", "PoE+ and PoE++ support on ECS4150-54P."], performance: ["396 Gbps switching capacity and 295 Mpps forwarding rate.", "3 MB packet buffer and 16K MAC address table.", "6 kV surge protection."], management: ["L2+/Lite L3, IPv6, QoS and multicast features.", "Web, CLI, SNMP, ecCLOUD and TIP OLS management.", "Three-year warranty."] },
        performanceSummary: { switchingCapacity: "396 Gbps", forwardingRate: "295 Mpps" },
        technicalSpecification: { interfaces: { accessPorts: "48 x 10/100/1000BASE-T RJ-45", uplinks: "6 x 25G SFP28", console: "1 x RJ-45 console", management: "1 x RJ-45 out-of-band management; 1 x USB management" }, performance: { switchingCapacity: "396 Gbps", forwardingRate: "295 Mpps", packetBuffer: "3 MB", macAddressTable: "16K", jumboFrames: "10 KB" }, poeVariant: { model: "ECS4150-54P", ports: "40 x PoE+ up to 30 W; 8 x PoE++ up to 90 W", totalBudget: "740 W" }, environment: { operatingTemperature: "-5 to 45 °C", storageTemperature: "-40 to 70 °C", humidity: "5% to 95%", surgeProtection: "6 kV" }, management: { protocols: "Web, CLI, SNMP, ecCLOUD, TIP OLS", protection: "ITU-T G.8032 ERPS; IPv6; QoS; multicast control" } },
        orderingInformation: [{ model: "ECS4150-54T / ECS4150-54P", description: "48-port Gigabit Ethernet access switch; PoE is available on the -54P model", recommendedPowerSupply: "AC 100-240 VAC, 50/60 Hz" }], packingList: [],
    },
    {
        model: "ECS4155-30T", displayModel: "ECS4155-30T / ECS4155-30P", category: "Switches", title: "L2+/Lite L3 2.5G Multi-Gigabit Ethernet Switch", productType: "L2+/Lite L3 2.5G Multi-Gigabit Ethernet Switch",
        description: "The Edgecore ECS4155-30T/ECS4155-30P family pairs 24 multi-Gigabit access ports with six 25G SFP28 uplinks for ISP and enterprise networks.",
        productOverview: ["The ECS4155-30T/ECS4155-30P is a 1G/2.5G multi-Gigabit access and aggregation switch with 24 RJ-45 access ports and six 1G/10G/25G SFP28 uplinks. The -30P model adds PoE, including up to 90 W per port and a 750 W total power budget.", "The series supports L2+/Lite L3 upgrades, IPv6, multicast control, security, QoS and ITU-T G.8032 ERPS ring protection. Management options include CLI, SNMP, Web, ecCLOUD and TIP OLS."],
        keyFeatures: { multigigabitAccess: ["24 x 1G/2.5GBASE-T access ports.", "6 x 1G/10G/25G SFP28 uplinks.", "PoE up to 90 W per port on ECS4155-30P."], performance: ["420 Gbps switching capacity and 310 Mpps forwarding rate.", "32K MAC address table.", "6 kV RJ-45 surge protection."], management: ["L2+/Lite L3, IPv6, multicast and QoS features.", "Web, CLI, SNMP, ecCLOUD and TIP OLS.", "Three-year warranty."] },
        performanceSummary: { switchingCapacity: "420 Gbps", forwardingRate: "310 Mpps" },
        technicalSpecification: { interfaces: { accessPorts: "24 x 1G/2.5GBASE-T RJ-45", uplinks: "6 x 1G/10G/25G SFP28", console: "1 x RJ-45 console", management: "1 x RJ-45 out-of-band management; USB Type A" }, performance: { switchingCapacity: "420 Gbps", forwardingRate: "310 Mpps", macAddressTable: "32K", jumboFrames: "10 KB" }, poeVariant: { model: "ECS4155-30P", standard: "IEEE 802.3af/at/bt", maximumPerPort: "90 W", totalBudget: "750 W" }, environment: { operatingTemperature: "-5 to 50 °C", storageTemperature: "-40 to 70 °C", humidity: "5% to 95%", surgeProtection: "6 kV (RJ-45), 4 kV (power)" }, management: { protocols: "Web, CLI, SNMP, ecCLOUD, TIP OLS", protection: "ITU-T G.8032 ERPS ring protection; IPv6; QoS; multicast control" } },
        orderingInformation: [{ model: "ECS4155-30T / ECS4155-30P", description: "2.5G multi-Gigabit access switch; PoE is available on the -30P model", recommendedPowerSupply: "AC 100-240 VAC, 50/60 Hz" }], packingList: [],
    },
    {
        model: "ECS5550-30X", displayModel: "ECS5550-30X / ECS5550-54X", category: "Switches", title: "L3 10G Ethernet Switch", productType: "L3 10G Ethernet Switch",
        description: "The Edgecore ECS5550-30X/ECS5550-54X series is a 10G aggregation switch family with six 100G uplinks and redundant power options.",
        productOverview: ["The ECS5550 series offers 24 or 48 10GbE SFP+ ports and six 100GbE QSFP28 uplinks for carrier and enterprise aggregation or data-center top-of-rack deployments.", "The series includes high availability, security, multicast control, QoS, IPv6 management and ITU-T G.8032 ERPS. Advanced L3 routing protocols are available with the specified license and software version noted in the datasheet."],
        keyFeatures: { highSpeedInterfaces: ["24 x 10G SFP+ ports on ECS5550-30X; 48 on ECS5550-54X.", "6 x 100G QSFP28 uplink ports.", "Downlink ports support 1G/10G and 2.5G transceivers."], performance: ["1.68 Tbps switching capacity for ECS5550-30X; 2.16 Tbps for ECS5550-54X.", "600 Mpps forwarding rate.", "6 MB packet buffer and 32K MAC address table."], availabilityAndManagement: ["Dual CRPS power modules.", "Web, CLI, SNMP, cloud management and ERPS ring protection.", "Advanced L3 routing requires the optional license identified in the datasheet."] },
        performanceSummary: { switchingCapacity: "1.68 Tbps (30X) / 2.16 Tbps (54X)", forwardingRate: "600 Mpps" },
        technicalSpecification: { interfaces: { downlinks: "24 x 10G SFP+ (ECS5550-30X) or 48 x 10G SFP+ (ECS5550-54X)", uplinks: "6 x 100G/40G QSFP28/QSFP+", management: "RJ-45 console and out-of-band management; USB Type A" }, performance: { switchingCapacity: "1.68 Tbps (30X); 2.16 Tbps (54X)", forwardingRate: "600 Mpps", packetBuffer: "6 MB", macAddressTable: "32K", jumboFrames: "10 KB" }, powerAndEnvironment: { power: "Dual CRPS AC PSU (100-240 VAC) or DC PSU (36-72 VDC)", operatingTemperature: "-5 to 50 °C", storageTemperature: "-40 to 70 °C", humidity: "5% to 95%" }, management: { protocols: "Web, CLI, SNMP, cloud, ecCLOUD/TIP OLS", protection: "ITU-T G.8032 ERPS; IPv6 management/security/multicast; QoS", routing: "OSPF, BGP4+, VRRP, PIM and related advanced routing require the optional L3 license and specified software version" } },
        orderingInformation: [{ model: "ECS5550-30X / ECS5550-54X", description: "10G Ethernet aggregation switch family with six 100G uplinks", recommendedPowerSupply: "AC or DC power supply; dual CRPS modules" }], packingList: [],
    },
    {
        model: "NAV-I-4R2S-X", category: "Switches", title: "Industrial Web Smart PoE Switch", productType: "Industrial Web Smart PoE Switch",
        description: "The NAV-I-4R2S-X is a fanless industrial PoE switch with four Gigabit PoE ports, two 1/10G SFP+ uplinks and three redundant DC inputs.",
        productOverview: ["The NAV-I-4R2S-X is a web-smart industrial Ethernet PoE fiber switch with four Gigabit RJ-45 ports and two 1/10G SFP+ fiber ports. All four RJ-45 ports support IEEE 802.3af/at PoE. It is designed for long-term operation in harsh industrial environments.", "Fanless cooling, IP30 protection, three redundant 12/24/48 VDC inputs and DIN-rail or wall mounting support deployments in transportation, power, mining, oil, shipping, metallurgy and renewable-energy systems."],
        keyFeatures: { industrialPoE: ["4 x Gigabit RJ-45 PoE ports; IEEE 802.3af/at.", "2 x 1/10G SFP+ uplinks.", "Three redundant 12/24/48 VDC power inputs."], performance: ["12 Gbps switching capacity and 8.928 Mpps forwarding rate.", "2K MAC address table and 1.5 Mb packet buffer.", "IP30 protection and fanless cooling."], management: ["Web management; VLAN, QoS, port mirroring and storm control.", "DIN-rail or wall mounting.", "Operating temperature from -40 to 75 °C."] },
        performanceSummary: { switchingCapacity: "12 Gbps", forwardingRate: "8.928 Mpps" },
        technicalSpecification: { interfaces: { accessPorts: "4 x 10/100/1000 Mbps RJ-45 PoE ports", uplinks: "2 x 1/10 Gbps SFP+ ports", poeStandard: "IEEE 802.3af/at", powerInput: "44-57 VDC, 2 A maximum; three redundant 12/24/48 VDC inputs" }, performance: { switchingCapacity: "12 Gbps", forwardingRate: "8.928 Mpps", macAddressTable: "2K", packetBufferMemory: "1.5 Mb", forwarding: "Store-and-forward; full wire-speed" }, industrialHardware: { protection: "IP30", cooling: "Fanless", dimensions: "136 x 108 x 38.5 mm", mounting: "DIN-rail or wall mount" }, environment: { operatingTemperature: "-40 to 75 °C", storageTemperature: "-40 to 85 °C", operatingHumidity: "10%-90%, non-condensing", storageHumidity: "5%-95%, non-condensing" }, networkManagement: { vlan: "Up to 32 VLANs; Port VLAN and IEEE 802.1Q", qos: "Port-based / 802.1p / DSCP; 4 priority queues", layer2: "IGMP snooping up to 128 groups; static aggregation, 8 groups up to 4 ports/group; port mirroring; port isolation; storm control", management: "Web interface; default IP 192.168.1.199" } },
        orderingInformation: [{ model: "NAV-I-4R2S-X", description: "Industrial Web Smart PoE switch", recommendedPowerSupply: "44-57 VDC; redundant 12/24/48 VDC inputs" }], packingList: [],
    },
    {
        model: "US-4MP", category: "Switches", title: "4-Port Managed PoE L2+ Switch", productType: "4-Port Managed PoE L2+ Switch",
        description: "The UniSwitch US-4MP is a managed Gigabit PoE+ switch with four RJ-45 access ports, two SFP uplinks and a 65 W PoE budget.",
        productOverview: ["The Indio Networks UniSwitch US-4MP is a Layer 2 managed switch for small offices, SMB, home office, surveillance and other small-network environments. It provides four Gigabit Ethernet RJ-45 PoE+ ports and two Gigabit SFP uplinks for connectivity and power to access points, cameras and IP phones.", "The switch provides a 65 W total PoE budget, up to 30 W per PoE port, and managed features including VLAN, QoS, spanning tree, LACP, IGMP snooping, port mirroring, loopback detection and PoE management."],
        keyFeatures: { poeAccess: ["4 x Gigabit Ethernet PoE+ ports.", "IEEE 802.3af/at; up to 30 W per port.", "65 W total PoE budget."], uplinksAndPerformance: ["2 x Gigabit SFP uplink ports.", "12 Gbps switching capacity; 9 Mbps forwarding rate.", "8K MAC table, 4 MB packet buffer and 10 KB jumbo frames."], management: ["Layer 2+ management, VLAN, QoS and multicast features.", "Cloud management and open switching technology.", "Three-year warranty."] },
        performanceSummary: { switchingCapacity: "12 Gbps", forwardingRate: "9 Mbps" },
        technicalSpecification: { interfaces: { ethernetPorts: "4 x Gigabit Ethernet RJ-45 PoE ports", opticalPorts: "2 x Gigabit SFP uplink ports", poeStandard: "IEEE 802.3af/at", maximumPoEPerPort: "30 W", totalPoEBudget: "65 W" }, performance: { switchingCapacity: "12 Gbps", packetForwardingRate: "9 Mbps", macAddressTable: "8K", packetBuffer: "4 MB", jumboFrame: "10 KB" }, networkManagement: { qualityOfService: "802.1p CoS / DSCP; 8 priority queues; SP, WRR and SP+WRR scheduling", layer2Features: "IGMP snooping v1/v2/v3; MLD snooping v1/v2; 802.3ad LACP; STP/RSTP/MSTP; EAPS; port isolation; BPDU filtering/guard; LLDP; 802.3x flow control; loopback detection", vlan: "4K VLAN support; management VLAN", management: "Cloud management" }, warranty: { term: "3 years" } },
        orderingInformation: [{ model: "US-4MP", description: "4-port managed PoE+ switch", recommendedPowerSupply: "See datasheet" }], packingList: [],
    },
];
