export const sideMenus = [
  { name: "Home", icon: "bi-house-door", path: "/" },
  { name: "Business", icon: "bi-building", path: "/" },
  { name: "Zones", icon: "bi-geo-alt", path: "/" },
  {
    name: "Reports",
    icon: "bi-graph-up",
    subItems: [
      { name: "Order List", path: "/" },
      { name: "Business Wise", path: "/" },
      { name: "Zone Wise", path: "/" },
      { name: "Feature Wise", path: "/" },
      { name: "Payment Wise", path: "/" },
      { name: "Order Summation", path: "/" },
      { name: "Tax Wise", path: "/" },
      { name: "Charge Wise", path: "/" },
      { name: "Hot Locations", path: "/" },
      { name: "Coupon Usage", path: "/" },
      { name: "Customer Coupon Usage", path: "/" },
    ],
  },
  {
    name: "Settings",
    icon: "bi-gear",
    subItems: [
      { name: "General", path: "/" },
      { name: "Users", path: "/" },
      { name: "Teachers", path: "/settings/teachersForm" },
    ],
  },
];
