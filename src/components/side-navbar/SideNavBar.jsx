import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Outlet} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Logout} from "../../express/redux/LoginSlice";
import {
  Menu,
  X,
  Bell,
  User,
  ChevronDown,
  LogOut,
  HelpCircle,
} from "lucide-react";
import {menuItems, notifications} from "./list";

const SideNavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
  const {user} = useSelector((state) => state.auth);
  console.log(user);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [settingsOpen, setSettingsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // const toggleSettings = () => {
  //   setSettingsOpen(!settingsOpen);
  // };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleFirstLetter = (data) => {
    return data.name[0];
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-52 bg-[#C72571] shadow-2xl transform transition-all duration-300 ease-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:relative md:translate-x-0 overflow-y-auto
      `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 bg-[#C72571] text-white">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-[#C72571] font-bold text-lg">N</span>
            </div>
            <div className="ml-3">
              <span className="text-xl font-semibold">NSchool</span>
              {/* <p className="text-xs text-pink-100">Management Suite</p> */}
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg text-white hover:bg-pink-400 hover:bg-opacity-20 hover:rounded-2xl transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col">
          <nav className="flex-1 px-2 py-6 space-y-2">
            {/* overflow-y-auto */}
            {menuItems
              .filter((item) => !item.roles || item.roles.includes(user.role))
              .map((item, index) => {
                const filteredDropdown = item.dropdown
                  ? item.dropdown.filter(
                      (sub) => !sub.roles || sub.roles.includes(user.role)
                    )
                  : null;

                // If this item had a dropdown but no visible sub-items, hide it entirely
                if (item.dropdown && filteredDropdown.length === 0) {
                  return null;
                }

                const isActive =
                  (item.path === "/" && location.pathname === "/") ||
                  (item.path !== "/" &&
                    location.pathname.startsWith(item.path)) ||
                  filteredDropdown?.some(
                    (sub) => location.pathname === sub.path
                  );
                return (
                  <div key={index}>
                    {/* Main Item */}
                    <div
                      className={`flex items-center justify-between px-2 py-2 cursor-pointer 
                  hover:bg-gray-100 rounded-md 
                  ${
                    isActive
                      ? "bg-pink-200 text-[#8B0F4B] shadow-sm border border-pink-950"
                      : "text-white hover:bg-pink-400 hover:text-black"
                  }
                `}
                      onClick={() =>
                        item.dropdown &&
                        setOpenMenu(openMenu === index ? null : index)
                      }
                    >
                      <Link
                        key={index}
                        to={item.path}
                        className="flex items-center space-x-2 w-full"
                        style={{textDecoration: "none", color: "inherit"}}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </Link>
                      {/* <div className="flex items-center space-x-2">
                      {item.icon}
                      <span>{item.name}</span>
                    </div> */}
                      {item.dropdown && (
                        <ChevronDown
                          className={`transform transition-transform ${
                            openMenu === index ? "rotate-180" : ""
                          }`}
                          size={16}
                        />
                      )}
                    </div>

                    {/* Dropdown */}
                    {item.dropdown && openMenu === index && (
                      <div>
                        {item.dropdown.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            to={sub.path}
                            className={`block py-1 rounded-md px-2 my-0.5
                        ${
                          location.pathname === sub.path
                            ? "bg-pink-200 text-[#8B0F4B] shadow-sm border border-pink-950"
                            : "text-white hover:bg-pink-400 hover:text-black"
                        }`}
                            style={{textDecoration: "none", color: "inherit"}}
                          >
                            <span className="flex text-center items-center gap-2 ml-4">
                              <span>|</span> <span>{sub.name}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
          </nav>

          {/* Sidebar Footer */}
          {/* <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-700 truncate">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 truncate">
                  john.doe@company.com
                </p>
                <span className="inline-block px-2 py-1 mt-1 text-xs font-medium bg-pink-100 text-pink-700 rounded-full">
                  Administrator
                </span>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0 ml-2">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div> */}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex-shrink-0">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
            {/* Left side */}
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              {/* <div className="ml-4">
                <h1 className="text-2xl font-poppins text-gray-900">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Welcome back, John!
                </p>
              </div> */}
            </div>

            {/* Center - Search */}
            {/* <div className="hidden sm:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="block w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 focus:bg-white transition-all duration-200"
                />
              </div>
            </div> */}

            {/* Right side */}
            <div className="flex items-center space-x-2">
              <button className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200">
                <HelpCircle className="w-5 h-5" />
              </button>

              {/* Notifications Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleNotifications}
                  className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-200 relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>

                {/* Notifications Dropdown Menu */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Notifications
                      </h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="flex items-start">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                                notification.unread
                                  ? "bg-blue-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900">
                                {notification.title}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <span className="text-xs text-gray-400 mt-2 block">
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-100">
                      <button className="w-full text-center text-sm text-pink-600 hover:text-pink-700 font-medium">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center 
                  hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  style={{borderRadius: "2rem"}}
                >
                  <span className="text-white font-semibold text-sm">
                    {handleFirstLetter(user)}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                    {/* User Info Header */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {handleFirstLetter(user)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-semibold text-gray-900">
                            {user.name}
                          </p>
                          {/* <p className="text-xs text-gray-500">
                            john.doe@company.com
                          </p> */}
                          <span className="inline-block px-2 py-1 mt-1 text-xs font-medium bg-pink-100 text-pink-700 rounded-full">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        href="#"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        style={{textDecoration: "none", color: "inherit"}}
                      >
                        <User className="w-4 h-4 mr-3 text-gray-400" />
                        View Profile
                      </Link>

                      {/* <Link
                        href="#"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <Settings className="w-4 h-4 mr-3 text-gray-400" />
                        Account Settings
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <Bell className="w-4 h-4 mr-3 text-gray-400" />
                        Notifications
                        <span className="ml-auto text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
                          3
                        </span>
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <Shield className="w-4 h-4 mr-3 text-gray-400" />
                        Privacy & Security
                      </Link>
                      <Link
                        href="#"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        style={{ textDecoration: "none", color: "inherit" }}>
                        <HelpCircle className="w-4 h-4 mr-3 text-gray-400" />
                        Help & Support
                      </Link> */}
                    </div>

                    {/* Logout Section */}
                    <div className="border-t border-gray-100 py-2">
                      <button
                        className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        onClick={() => dispatch(Logout())}
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-[#FCDDEC]">
          <div className="max-w-screen mx-auto space-y-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Click outside to close dropdowns */}
      {notificationsOpen && (
        <div className="fixed inset-0 z-30" onClick={toggleNotifications} />
      )}

      {userMenuOpen && (
        <div className="fixed inset-0 z-30" onClick={toggleUserMenu} />
      )}
    </div>
  );
};

export default SideNavBar;
