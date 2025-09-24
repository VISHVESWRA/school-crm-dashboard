import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ChevronRight, Menu, X, Home, Settings } from "lucide-react";
import NavBar from "../navbar/NavBar";
import { sideMenus } from "./list";
import { iconList } from "../../assets/iconMap";
import { Logout } from "../../express/redux/LoginSlice";
import "./SideNavBar.css";

function SideNavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("Home");
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [sideNavOpen, setSideNavOpen] = useState(false); // Start closed on mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  const [breadcrumbs, setBreadcrumbs] = useState([]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      setIsMobile(mobile);
      setIsTablet(tablet);

      // Auto-close on mobile, auto-open on desktop
      if (mobile) {
        setSideNavOpen(false);
        setExpandedMenu(null);
      } else if (window.innerWidth >= 1024) {
        setSideNavOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (menu) => {
    if (menu.subItems) {
      // Toggle submenu expansion
      setExpandedMenu(expandedMenu === menu.name ? null : menu.name);
      setActiveMenu(menu.name);
    } else {
      // Navigate directly for items without submenus
      setActiveMenu(menu.name);
      setExpandedMenu(null);

      // Close mobile menu after navigation
      if (isMobile) {
        setSideNavOpen(false);
      }

      if (menu.path) {
        navigate(menu.path);
      }
    }
  };

  const handleSubMenuClick = (sub, parentMenu) => {
    setActiveSubMenu(sub.name);

    if (sub.path) {
      navigate(sub.path);

      // Close mobile menu after navigation
      if (isMobile) {
        setSideNavOpen(false);
        setExpandedMenu(null);
      }
    }
  };

  const renderIcon = (iconName) => {
    const IconComponent = iconList[iconName];
    return IconComponent ? <IconComponent size={isMobile ? 22 : 20} /> : null;
  };

  const toggleSideNav = () => {
    setSideNavOpen(!sideNavOpen);
    if (!sideNavOpen === false) {
      setExpandedMenu(null);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Overlay */}
      {isMobile && sideNavOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
          onClick={() => setSideNavOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          ${
            sideNavOpen
              ? isMobile
                ? "w-64"
                : isTablet
                ? "w-56"
                : "w-56"
              : isMobile
              ? "w-0"
              : "w-12"
          }
          ${
            isMobile
              ? sideNavOpen
                ? "translate-x-0"
                : "-translate-x-full"
              : "translate-x-0"
          }
          bg-gradient-to-br from-[#C72571] via-[#B91E66] to-[#9A1A56]
          transition-all duration-300 ease-in-out
          flex flex-col shadow-2xl
          ${isMobile ? "rounded-r-2xl" : ""}
        `}
      >
        {/* Header */}
        <div
          className={`
          ${sideNavOpen ? "p-2 lg:p-3" : "p-1.5"}
          border-b border-white/20 transition-all duration-300
        `}
        >
          <div className="flex items-center justify-between">
            {sideNavOpen && (
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">N</span>
                </div>
                <div>
                  <h1 className="text-white font-bold text-base lg:text-lg font-poppins">
                    NSCHOOL
                  </h1>
                  <p className="text-white/70 text-xs font-poppins leading-tight">
                    Education Platform
                  </p>
                </div>
              </div>
            )}

            {!isMobile && (
              <button
                onClick={toggleSideNav}
                className={`
                  p-2 text-white hover:bg-white/20 rounded-xl 
                  transition-all duration-200 group
                  ${!sideNavOpen ? "mx-auto" : ""}
                `}
              >
                {sideNavOpen ? (
                  <X
                    size={20}
                    className="group-hover:rotate-90 transition-transform"
                  />
                ) : (
                  <Menu
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                )}
              </button>
            )}

            {isMobile && sideNavOpen && (
              <button
                onClick={() => setSideNavOpen(false)}
                className="p-3 text-white hover:bg-white/20 rounded-xl transition-colors"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`
          flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20
          ${sideNavOpen ? "p-1.5 lg:p-2" : "p-1.5"}
        `}
        >
          <div className="space-y-1">
            {sideMenus.map((menu) => (
              <div key={menu.name} className="group">
                {/* Main Menu Item */}
                <div
                  onClick={() => handleMenuClick(menu)}
                  className={`
                    flex items-center gap-3 rounded-xl cursor-pointer
                    transition-all duration-200 ease-in-out group/item
                    ${
                      sideNavOpen
                        ? isMobile
                          ? "p-2.5"
                          : "p-2"
                        : "p-2 justify-center"
                    }
                    ${
                      activeMenu === menu.name
                        ? "bg-white/25 text-white shadow-lg backdrop-blur-sm"
                        : "text-white/80 hover:bg-white/15 hover:text-white hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex-shrink-0 group-hover/item:scale-110 transition-transform">
                    {menu.icon && renderIcon(menu.icon)}
                  </div>

                  {sideNavOpen && (
                    <>
                      <span
                        className={`
                        font-poppins font-medium flex-1 select-none
                        ${isMobile ? "text-sm" : "text-xs"}
                      `}
                      >
                        {menu.name}
                      </span>
                      {menu.subItems && (
                        <ChevronRight
                          size={isMobile ? 18 : 16}
                          className={`
                            transition-all duration-300 group-hover/item:text-white
                            ${
                              expandedMenu === menu.name
                                ? "rotate-90 text-white"
                                : "text-white/70"
                            }
                          `}
                        />
                      )}
                    </>
                  )}

                  {/* Tooltip for collapsed state */}
                  {!sideNavOpen && !isMobile && (
                    <div
                      className="
                      absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm 
                      rounded-lg opacity-0 group-hover:opacity-100 transition-opacity
                      pointer-events-none whitespace-nowrap z-50 shadow-xl
                    "
                    >
                      {menu.name}
                      <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2">
                        <div className="w-2 h-2 bg-gray-900 rotate-45"></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Submenu Items */}
                {menu.subItems && sideNavOpen && (
                  <div
                    className={`
                      overflow-hidden transition-all duration-300 ease-in-out
                      ${
                        expandedMenu === menu.name
                          ? "max-h-96 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    <div
                      className={`
                      space-y-1 border-l-2 border-white/20 
                      ${isMobile ? "ml-4 pl-3" : "ml-3 pl-2.5"}
                    `}
                    >
                      {menu.subItems.map((sub, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleSubMenuClick(sub, menu)}
                          className={`
                            flex items-center gap-3 rounded-lg cursor-pointer
                            transition-all duration-200 ease-in-out group/subitem
                            ${isMobile ? "p-2" : "p-1.5"}
                            ${
                              activeSubMenu === sub.name
                                ? "bg-white/20 text-white shadow-md"
                                : "text-white/70 hover:bg-white/15 hover:text-white"
                            }
                          `}
                        >
                          <div className="flex-shrink-0 group-hover/subitem:scale-110 transition-transform">
                            {sub.icon && renderIcon(sub.icon)}
                          </div>
                          <span
                            className={`
                            font-poppins font-medium select-none
                            ${isMobile ? "text-xs" : "text-xs"}
                          `}
                          >
                            {sub.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Footer */}
        {sideNavOpen && (
          <div className="p-2 border-t border-white/20">
            <div className="flex items-center gap-2 text-white/60">
              <div className="w-5 h-5 bg-white/10 rounded flex items-center justify-center">
                <span className="text-xs font-bold">N</span>
              </div>
              <div>
                <p className="text-xs font-poppins font-medium leading-tight">
                  NSCHOOL
                </p>
                <p className="text-xs font-poppins opacity-80 leading-tight">
                  v2.1.0
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <main
        className={`
        flex-1 flex flex-col min-h-screen
        transition-all duration-300 ease-in-out
        ${!isMobile && sideNavOpen ? "lg:ml-0" : ""}
      `}
      >
        <NavBar
          sideNav={sideNavOpen}
          onSetSideNav={setSideNavOpen}
          toggleSideNav={toggleSideNav}
          isMobile={isMobile}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="h-full overflow-auto transition-all duration-300...">
            {/* Content Wrapper */}
            <div className="min-h-[calc(100vh-8rem)] transition-all duration-300...">
              {/* React Router Outlet - Your page content renders here */}
              <Outlet context={{ setBreadcrumbs }} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SideNavBar;

// import { useState } from "react";
// import NavBar from "../navbar/NavBar";
// import { sideMenus } from "./list";
// import { useNavigate } from "react-router-dom";
// import { iconList } from "../../assets/iconMap";
// import "./SideNavBar.css";
// import { useDispatch } from "react-redux";
// import { Logout } from "../../express/redux/LoginSlice";

// function SideNavBar() {
//   const dispatch = useDispatch();
//   const [activeMenu, setActiveMenu] = useState("Home");
//   const [activeSubMenu, setSubActiveMenu] = useState();
//   const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);
//   const [sideNav, setSideNav] = useState(true);
//   const navigate = useNavigate();

//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu.name);

//     if (menu.subItems) {
//       setIsChildMenuOpen(!isChildMenuOpen && menu.subItems);
//     } else {
//       setIsChildMenuOpen(!isChildMenuOpen && menu.subItems);
//       if (menu.path) {
//         navigate(menu.path);
//       }
//     }
//   };

//   const handleSubMenuClick = (sub) => {
//     setSubActiveMenu(sub.name);
//     if (sub.path) {
//       navigate(sub.path);
//       setIsChildMenuOpen(!isChildMenuOpen);
//     }
//   };

//   const searchIcon = (iconName) => {
//     const IconComponent = iconList[iconName];
//     return IconComponent ? <IconComponent size={20} /> : null;
//   };

//   return (
//     <div className="flex h-screen overflow-hidden">
//       {sideNav && (
//         <aside className="w-20 md:w-24 bg-[#C72571] flex flex-col relative">
//           <div className="p-4 flex flex-col items-center gap-2">
//             <span className="font-poppins text-black text-lg hidden md:block">
//               NSCHOOL
//             </span>
//           </div>

//           <nav className="flex-1 p-2 space-y-2">
//             {sideMenus.map((menu) => (
//               <div
//                 key={menu.name}
//                 onClick={() => handleMenuClick(menu)}
//                 className={`flex flex-col items-center gap-1 p-2 rounded-lg text-black hover:bg-[#FCDDEC] cursor-pointer ${
//                   activeMenu === menu.name ? "bg-[#FCDDEC] text-black" : ""
//                 }`}
//               >
//                 {menu.icon && searchIcon(menu.icon)}
//                 <span className="font-poppins hidden md:block">
//                   {menu.name}
//                 </span>
//               </div>
//             ))}
//           </nav>
//         </aside>
//       )}

//       {isChildMenuOpen && (
//         <aside
//           style={isChildMenuOpen ? { display: "block" } : { display: "none" }}
//           className="relative md:absolute h-screen md:left-24 w-52 bg-[#C72571] border-x border-gray-200 p-4 overflow-y-auto"
//         >
//           <h3 className="text-xs font-bold text-white font-poppins uppercase mb-3">
//             {activeMenu}
//           </h3>
//           <ul className="space-y-2" style={{ paddingLeft: "0px" }}>
//             {sideMenus
//               .find((m) => m.name === activeMenu)
//               ?.subItems?.map((sub, idx) => (
//                 <li
//                   key={idx}
//                   onClick={() => handleSubMenuClick(sub)}
//                   style={
//                     activeSubMenu === sub.name
//                       ? { backgroundColor: "#FCDDEC", color: "black" }
//                       : { backgroundColor: "", color: "" }
//                   }
//                   className="flex items-center gap-2 cursor-pointer p-2 rounded font-poppins text-black hover:bg-[#FCDDEC] text-md"
//                 >
//                   {sub.icon && searchIcon(sub.icon)}
//                   {sub.name}
//                 </li>
//               ))}
//           </ul>
//         </aside>
//       )}

//       <main className="flex-1 bg-gray-50 overflow-auto">
//         <NavBar sideNav={sideNav} onSetSideNav={setSideNav} />
//       </main>
//     </div>
//   );
// }

// export default SideNavBar;
