import { useEffect, useState } from "react";
import NavBar from "../navbar/NavBar";

function SideNavBar() {
  const [activeMenu, setActiveMenu] = useState("Home");

  const subMenus = {
    Reports: [
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
    Settings: ["General", "Users", "Permissions"],
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div className="w-20 md:w-25 bg-[#0f172a] text-white flex flex-col">
          <div className="p-4 flex flex-col items-center justify-center md:justify-start gap-2 border-b border-gray-700">
            <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center font-bold">
              X
            </div>
            <span className="hidden md:block font-bold">Meture.io</span>
          </div>

          <nav className="flex-1 p-2 space-y-2">
            <div
              onClick={() => setActiveMenu("Home")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-700 cursor-pointer ${
                activeMenu === "Home" && "bg-gray-700"
              }`}
            >
              <i className="bi bi-house-door"></i>
              <span className="hidden md:block">Home</span>
            </div>
            <div
              onClick={() => setActiveMenu("Business")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-700 cursor-pointer ${
                activeMenu === "Business" && "bg-gray-700"
              }`}
            >
              <i className="bi bi-building"></i>
              <span className="hidden md:block">Business</span>
            </div>
            <div
              onClick={() => setActiveMenu("Zones")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-700 cursor-pointer ${
                activeMenu === "Zones" && "bg-gray-700"
              }`}
            >
              <i className="bi bi-geo-alt"></i>
              <span className="hidden md:block">Zones</span>
            </div>
            <div
              onClick={() => setActiveMenu("Reports")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-700 cursor-pointer ${
                activeMenu === "Reports" && "bg-gray-700"
              }`}
            >
              <i className="bi bi-graph-up"></i>
              <span className="hidden md:block">Reports</span>
            </div>
            <div
              onClick={() => setActiveMenu("Settings")}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-gray-700 cursor-pointer ${
                activeMenu === "Settings" && "bg-gray-700"
              }`}
            >
              <i className="bi bi-gear"></i>
              <span className="hidden md:block">Settings</span>
            </div>
          </nav>
        </div>

        {subMenus[activeMenu] && (
          <div className="w-52 bg-[#0f172a] border-x border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-xs font-bold text-white uppercase mb-3">
              {activeMenu}
            </h3>
            <ul className="space-y-2">
              {subMenus[activeMenu].map((item, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer p-2 rounded hover:bg-blue-400 text-white text-md"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
          <NavBar />
          <h2 className="text-xl font-semibold">{activeMenu} Page</h2>
          <p className="mt-2 text-gray-600">
            Content for <strong>{activeMenu}</strong> will go here.
          </p>
        </div>
      </div>
    </>
  );
}

export default SideNavBar;
