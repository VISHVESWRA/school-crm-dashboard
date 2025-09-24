import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  Menu as MenuIcon,
  Bell,
  ChevronDown,
  Settings,
  HelpCircle,
  FileText,
  LogOut,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { Logout } from "../../express/redux/LoginSlice";
import BreadcrumbNav from "../bredCrumbs/BredCrumb";

function NavBar({ sideNav, onSetSideNav, toggleSideNav, isMobile }) {
  const dispatch = useDispatch();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3); // Sample notification count
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  // Handle escape key for search
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("keydown", handleEscKey);
      return () => document.removeEventListener("keydown", handleEscKey);
    }
  }, [isSearchOpen]);

  const handleMenuToggle = () => {
    if (toggleSideNav) {
      toggleSideNav();
    } else {
      onSetSideNav(!sideNav);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // You can add theme persistence logic here
  };

  const handleLogout = () => {
    dispatch(Logout());
  };

  return (
    <>
      {/* Main Navigation Bar */}
      <header
        className={`
        sticky top-0 z-30 border-b backdrop-blur-md transition-all duration-200
        ${
          isDarkMode
            ? "bg-gray-900/95 border-gray-700 text-white"
            : "bg-white/95 border-gray-200 text-gray-900"
        }
        ${isMobile ? "h-14" : "h-16"}
      `}
      >
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left Section */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Menu Toggle Button */}
            <button
              onClick={handleMenuToggle}
              className={`
                p-2 rounded-xl transition-all duration-200 group
                ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }
                ${isMobile ? "p-2.5" : "p-2"}
              `}
              aria-label="Toggle navigation menu"
            >
              <MenuIcon
                size={isMobile ? 22 : 20}
                className="group-hover:scale-110 transition-transform"
              />
            </button>

            {/* Search Bar - Desktop Only */}
            {!isMobile && (
              <div className="relative hidden md:block">
                <div
                  className={`
                  relative flex items-center transition-all duration-300
                  ${isSearchOpen ? "w-80" : "w-64"}
                `}
                >
                  <Search
                    size={18}
                    className={`absolute left-3 ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setIsSearchOpen(false)}
                    className={`
                      w-full pl-10 pr-4 py-2.5 rounded-xl border transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-[#C72571]/20
                      ${
                        isDarkMode
                          ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-[#C72571]"
                          : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-[#C72571] focus:bg-white"
                      }
                    `}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Search Button - Mobile Only */}
            {isMobile && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`
                  p-2.5 rounded-xl transition-colors
                  ${
                    isDarkMode
                      ? "hover:bg-gray-700 text-gray-300"
                      : "hover:bg-gray-100 text-gray-600"
                  }
                `}
              >
                <Search size={20} />
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`
                p-2 rounded-xl transition-all duration-200 group
                ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-yellow-400"
                    : "hover:bg-gray-100 text-gray-600"
                }
                ${isMobile ? "p-2.5" : "p-2"}
              `}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Sun
                  size={isMobile ? 22 : 20}
                  className="group-hover:rotate-90 transition-transform"
                />
              ) : (
                <Moon
                  size={isMobile ? 22 : 20}
                  className="group-hover:-rotate-12 transition-transform"
                />
              )}
            </button>

            {/* Notifications */}
            <button
              className={`
                relative p-2 rounded-xl transition-all duration-200 group
                ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-gray-300 hover:text-white"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }
                ${isMobile ? "p-2.5" : "p-2"}
              `}
              aria-label="Notifications"
            >
              <Bell
                size={isMobile ? 22 : 20}
                className="group-hover:scale-110 transition-transform"
              />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notifications > 9 ? "9+" : notifications}
                </span>
              )}
            </button>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <MenuButton
                className={`
                flex items-center gap-2 lg:gap-3 rounded-xl transition-all duration-200
                ${
                  isDarkMode
                    ? "hover:bg-gray-700 text-white"
                    : "hover:bg-gray-100 text-gray-900"
                }
                ${isMobile ? "p-1.5" : "p-2"}
              `}
              >
                {/* User Avatar */}
                <div className="relative">
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="User avatar"
                    className={`
                      rounded-full border-2 border-[#C72571]/20 object-cover
                      ${isMobile ? "w-9 h-9" : "w-10 h-10"}
                    `}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* User Info - Hidden on mobile */}
                {!isMobile && (
                  <div className="hidden md:flex flex-col items-start min-w-0">
                    <span className="font-poppins font-semibold text-sm truncate max-w-24 lg:max-w-none">
                      {user?.name || "User"}
                    </span>
                    <span
                      className={`
                      text-xs font-poppins truncate max-w-24 lg:max-w-none
                      ${isDarkMode ? "text-gray-400" : "text-gray-500"}
                    `}
                    >
                      {user?.role || "Student"}
                    </span>
                  </div>
                )}

                <ChevronDown
                  size={16}
                  className={`
                    transition-transform group-data-[open]:rotate-180
                    ${isDarkMode ? "text-gray-400" : "text-gray-500"}
                    ${isMobile ? "hidden" : "block"}
                  `}
                />
              </MenuButton>

              <MenuItems
                className={`
                absolute right-0 mt-2 w-56 origin-top-right rounded-2xl shadow-xl
                border backdrop-blur-md transition-all duration-200
                ${
                  isDarkMode
                    ? "bg-gray-800/95 border-gray-600"
                    : "bg-white/95 border-gray-200"
                }
                data-[closed]:scale-95 data-[closed]:opacity-0
                data-[enter]:duration-100 data-[leave]:duration-75
              `}
              >
                <div className="p-2">
                  {/* User Info in Dropdown - Mobile */}
                  {isMobile && (
                    <div className="px-3 py-3 border-b border-gray-200 dark:border-gray-600 mb-2">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://i.pravatar.cc/40"
                          alt="User"
                          className="w-12 h-12 rounded-full border-2 border-[#C72571]/20"
                        />
                        <div>
                          <p className="font-poppins font-semibold text-sm">
                            {user?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.role || "Student"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Menu Items */}
                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors
                        ${
                          active
                            ? isDarkMode
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-gray-900"
                            : isDarkMode
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                      `}
                      >
                        <Settings size={16} />
                        Account Settings
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors
                        ${
                          active
                            ? isDarkMode
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-gray-900"
                            : isDarkMode
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                      `}
                      >
                        <HelpCircle size={16} />
                        Help & Support
                      </button>
                    )}
                  </MenuItem>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors
                        ${
                          active
                            ? isDarkMode
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-gray-900"
                            : isDarkMode
                            ? "text-gray-300"
                            : "text-gray-700"
                        }
                      `}
                      >
                        <FileText size={16} />
                        Documentation
                      </button>
                    )}
                  </MenuItem>

                  <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>

                  <MenuItem>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`
                          flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm transition-colors
                          ${
                            active
                              ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                              : "text-red-600 dark:text-red-400"
                          }
                        `}
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </header>

      {/* Breadcrumbs Section - Under the main header */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div
          className={`
          px-4 lg:px-6 py-3 border-b transition-all duration-200
          ${
            isDarkMode
              ? "bg-gray-800/95 border-gray-700"
              : "bg-gray-50/95 border-gray-200"
          }
        `}
        >
          <BreadcrumbNav items={breadcrumbs} />
        </div>
      )}

      {/* Mobile Search Overlay */}
      {isMobile && isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C72571]/20 focus:border-[#C72571]"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-4 py-2 text-[#C72571] font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;

// import { FaBars } from "react-icons/fa6";
// import { FaBell } from "react-icons/fa";
// import { Outlet } from "react-router-dom";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { useDispatch, useSelector } from "react-redux";
// import { Logout } from "../../express/redux/LoginSlice";
// import { useState } from "react";
// import Card from "react-bootstrap/Card";
// import BreadcrumbNav from "../bredCrumbs/BredCrumb";

// function NavBar({ sideNav, onSetSideNav }) {
//   // const toggleTheme = () => {
//   //     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
//   // };
//   const dispatch = useDispatch();
//   const [breadcrumbs, setBreadcrumbs] = useState([]);
//   const { user } = useSelector((state) => state.auth);
//   console.log(breadcrumbs);

//   return (
//     <>
//       <div className="h-16 bg-white shadow flex items-center justify-between px-4 text-black">
//         <div className="flex items-center gap-3">
//           <button
//             onClick={() => onSetSideNav((sideNav = !sideNav))}
//             className="text-2xl text-gray-700"
//           >
//             <FaBars size={20} />
//           </button>
//         </div>

//         <div className="flex items-center gap-6">
//           <FaBell className="hover:text-blue-500" size={20} />
//           {/* <img
//             src="https://i.pravatar.cc/40"
//             alt="User"
//             className="w-13 h-13 rounded-full border"
//           /> */}
//         </div>

//         <Menu as="div" className="relative inline-block">
//           <MenuButton
//             className="inline-flex w-full justify-center items-center gap-x-3 rounded-md bg-white px-3 py-2
//           text-sm font-semibold text-black shadow-xs inset-ring-1 inset-ring-gray-300
//            hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20"
//           >
//             <div className="flex items-center gap-6">
//               <img
//                 src="https://i.pravatar.cc/40"
//                 alt="User"
//                 className="w-12 h-12 rounded-full border"
//               />
//             </div>
//             <div className="flex flex-col items-start">
//               <span className="font-poppins text-md">{user.name}</span>
//               <span className="text-sm font-poppins font-light">
//                 {user.role}
//               </span>
//             </div>
//             <ChevronDownIcon
//               aria-hidden="true"
//               className="-mr-1 size-5 text-gray-400"
//             />
//           </MenuButton>

//           <MenuItems
//             transition
//             className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
//           >
//             <div className="py-1">
//               <MenuItem>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
//                 >
//                   Account settings
//                 </a>
//               </MenuItem>
//               <MenuItem>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
//                 >
//                   Support
//                 </a>
//               </MenuItem>
//               <MenuItem>
//                 <a
//                   href="#"
//                   className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
//                 >
//                   License
//                 </a>
//               </MenuItem>
//               <form action="#" method="POST">
//                 <MenuItem>
//                   <button
//                     type="submit"
//                     onClick={() => dispatch(Logout())}
//                     className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
//                   >
//                     Sign out
//                   </button>
//                 </MenuItem>
//               </form>
//             </div>
//           </MenuItems>
//         </Menu>
//       </div>
//       {breadcrumbs && breadcrumbs.length > 0 && (
//         <div className="p-4 bg-white shadow">
//           <BreadcrumbNav items={breadcrumbs} />
//         </div>
//       )}

//       {/* <LoginPage /> */}
//       <main className="p-3 bg-[#FCDDEC] h-full">
//         {/* <div className="p-4 border-2 border-dashed border-gray-400 bg-gray-300 rounded-lg min-h-[calc(100vh-8rem)]"> */}
//         <Outlet context={{ setBreadcrumbs }} />
//         {/* </div> */}
//       </main>
//     </>
//   );
// }

// export default NavBar;
