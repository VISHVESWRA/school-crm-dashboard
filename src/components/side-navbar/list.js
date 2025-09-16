   export const sideMenus = [
        { name: "Home", icon: "bi-house-door" },
        { name: "Business", icon: "bi-building" },
        { name: "Zones", icon: "bi-geo-alt" },
        {
            name: "Reports",
            icon: "bi-graph-up",
            subItems: [
                "Order List",
                "Business Wise",
                "Zone Wise",
                "Feature Wise",
                "Payment Wise",
                "Order Summation",
                "Tax Wise",
                "Charge Wise",
                "Hot Locations",
                "Coupon Usage",
                "Customer Coupon Usage",
            ],
        },
        {
            name: "Settings",
            icon: "bi-gear",
            subItems: ["General", "Users", "Teachers"],
        },
    ];