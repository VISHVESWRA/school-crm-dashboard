import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  BarChart3,
  Mail,
  Bell,
  Search,
  User,
  ChevronDown,
  Shield,
  Palette,
  Globe,
  LogOut,
  HelpCircle,
  FileText,
  Calendar,
  TrendingUp,
  Activity,
  Split,
  SquareCode,
  GraduationCap,
  BookOpenText,
  UserRoundPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import BreadcrumbNav from "../bredCrumbs/BredCrumb";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../express/redux/LoginSlice";

const SideNavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("Home");
  const [activeSettingsItem, setActiveSettingsItem] = useState();

  const dispatch = useDispatch();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    {
      icon: Home,
      label: "Home",
      active: activeMenuItem === "Home",
      badge: null,
      path: "/",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      active: activeMenuItem === "Analytics",
      badge: null,
      path: "/",
    },
    // { icon: Users, label: "Users", active: activeMenuItem  === "Users", badge: "24", path: "/users" },
    // { icon: FileText, label: "Reports", active: activeMenuItem  === "Reports", badge: null, path: "/reports" },
    // { icon: Mail, label: "Messages", active: activeMenuItem  === "Messages", badge: "12", path: "/messages" },
    // { icon: Calendar, label: "Calendar", active: activeMenuItem  === "Calendar", badge: null, path: "/calendar" },
  ];

  const settingsItems = [
    {
      icon: Users,
      label: "Teachers",
      active: activeSettingsItem === "Teachers",
      path: "/settings/teachersList",
    },
    {
      icon: BookOpenText,
      label: "Course",
      active: activeSettingsItem === "Course",
      path: "/settings/courseForm",
    },
    {
      icon: UserRoundPlus,
      label: "Student",
      active: activeSettingsItem === "Student",
      path: "/settings/studentForm",
    },
    // { icon: Palette, label: "Appearance", active: activeSettingsItem  === "Users", path: "/appearance" },
    // { icon: Bell, label: "Notifications", active: activeSettingsItem  === "Users", path: "/settings/notifications" },
    // { icon: Globe, label: "Language & Region", active: activeSettingsItem  === "Users", path: "/settings/language" },
  ];

  const notifications = [
    {
      id: 1,
      title: "New user registered",
      message: "John Doe just signed up",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Report generated",
      message: "Monthly analytics ready",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "System update",
      message: "Maintenance completed successfully",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

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
        lg:relative lg:translate-x-0
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
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col h-full">
          <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                {/* <div
                  href="#"
                  className={`
                    group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
                    ${
                      item.active
                        ? "bg-pink-200 text-[#8B0F4B] shadow-sm border border-pink-950"
                        : "text-white hover:bg-pink-400 hover:text-black"
                    }
                  `}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`w-5 h-5 mr-3 ${
                        item.active
                          ? "text-[#8B0F4B]"
                          : "text-white group-hover:text-gray-600"
                      }`}
                    />
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div> */}

                <Link
                  to={item.path}
                  onClick={() => {
                    setActiveMenuItem(item.label);
                  }}
                  className={`group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
    ${
      item.active
        ? "bg-pink-200 text-[#8B0F4B] shadow-sm border border-pink-950"
        : "text-white hover:bg-pink-400 hover:text-black"
    }
  `}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`w-5 h-5 mr-3 ${
                        item.active
                          ? "text-[#8B0F4B]"
                          : "text-white group-hover:text-gray-600"
                      }`}
                    />
                    {item.label}
                  </div>
                  {/* badge */}
                  {item.badge && (
                    <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </div>
            ))}

            {/* Settings Dropdown */}
            <div className="border-gray-100 mb-5">
              <button
                onClick={toggleSettings}
                className="group w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl text-white hover:bg-pink-400 hover:text-gray-900 transition-all duration-200"
              >
                <div className="flex items-center text-white group-hover:text-gray-600">
                  <Settings className="w-5 h-5 mr-3 group-hover:text-gray-600" />
                  Settings
                </div>
                <div
                  className={`transform transition-transform duration-200 ${
                    settingsOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </div>
              </button>

              {/* Settings Dropdown Menu */}
              <div
                className={`mt-2 space-y-1 transition-all duration-300 ease-out ${
                  settingsOpen
                    ? "max-h-64 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {settingsItems.map((item, index) => (
                  // <div
                  //   key={index}
                  //   href="#"
                  //   className="flex items-center px-4 py-3 text-sm text-white hover:bg-pink-400 hover:text-gray-900 rounded-lg transition-colors duration-200"
                  // >
                  //   <item.icon className="w-4 h-4 mr-3" />
                  //   {item.label}
                  // </div>
                  <Link
                    onClick={() => {
                      setActiveSettingsItem(item.label);
                    }}
                    key={index}
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm hover:text-gray-900 rounded-lg transition-colors duration-200
                      ${
                        item.active
                          ? "bg-pink-200 text-[#8B0F4B] shadow-sm border border-pink-950"
                          : "text-white hover:bg-pink-400 hover:text-black"
                      }`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
          <div className="h-1 mb-5"></div>

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
                className="lg:hidden p-2 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="ml-4">
                <h1 className="text-2xl font-poppins text-gray-900">
                  Dashboard
                </h1>
                {/* <p className="text-sm text-gray-500 hidden sm:block">
                  Welcome back, John!
                </p> */}
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden sm:flex flex-1 max-w-md mx-8">
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
            </div>

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
                  className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
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
                        style={{ textDecoration: "none", color: "inherit" }}
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

        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="p-3 bg-white border-t-2 border-gray-300">
            <BreadcrumbNav items={breadcrumbs} />
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-[#FCDDEC] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <Outlet context={{ setBreadcrumbs }} />

            {/* Stats Cards */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-pink-50">
                    <Users className="w-8 h-8 text-pink-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-900">2,847</h2>
                    <p className="text-gray-600 text-sm">Total Users</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-xs font-medium">
                        +12.5%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-green-50">
                    <BarChart3 className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-900">94.2%</h2>
                    <p className="text-gray-600 text-sm">Success Rate</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-xs font-medium">
                        +2.1%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-purple-50">
                    <Mail className="w-8 h-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-900">1,249</h2>
                    <p className="text-gray-600 text-sm">Messages</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-xs font-medium">
                        +8.3%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-orange-50">
                    <Activity className="w-8 h-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold text-gray-900">89.7%</h2>
                    <p className="text-gray-600 text-sm">Uptime</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-green-500 text-xs font-medium">
                        +0.5%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* Main Content Grid */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              Recent Activity
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Recent Activity
                    </h3>
                    <button className="text-sm text-pink-600 hover:text-pink-700 font-medium">
                      View All
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          New user registration
                        </p>
                        <p className="text-xs text-gray-500">
                          Sarah Johnson joined the platform
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        2 minutes ago
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          Report generated
                        </p>
                        <p className="text-xs text-gray-500">
                          Monthly analytics report is ready
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        15 minutes ago
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          System maintenance
                        </p>
                        <p className="text-xs text-gray-500">
                          Scheduled backup completed successfully
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">1 hour ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          New message received
                        </p>
                        <p className="text-xs text-gray-500">
                          Customer support ticket #1247
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>

              Quick Actions
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Quick Actions
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-pink-50 text-pink-700 rounded-xl hover:bg-pink-100 transition-colors duration-200">
                    <Users className="w-5 h-5 mr-2" />
                    Add New User
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors duration-200">
                    <FileText className="w-5 h-5 mr-2" />
                    Generate Report
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors duration-200">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Notification
                  </button>
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-orange-50 text-orange-700 rounded-xl hover:bg-orange-100 transition-colors duration-200">
                    <Settings className="w-5 h-5 mr-2" />
                    System Settings
                  </button>
                </div>
              </div>
            </div> */}
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
//                 className={`flex flex-col items-center gap-1 p-2 rounded-lg text-black hover:bg-[#FCDDEC] cursor-pointer ${activeMenu === menu.name ? "bg-[#FCDDEC] text-black" : ""
//                   }`}
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
//           className="md:absolute h-screen md:left-24 w-52 bg-[#C72571] border-x border-gray-200 p-4 overflow-y-auto"
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
