import {
  Menu,
  X,
  Users,
  Bell,
  User,
  ChevronDown,
  LogOut,
  HelpCircle,
  UserRoundPlus,
  LayoutGrid,
  BookUser,
  BookOpenIcon,
  CalendarCheck2,
  IndianRupee,
  BriefcaseBusiness,
  FileChartLine,
} from "lucide-react";

export const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutGrid size={20} />,
    roles: ["superAdmin", "admin", "staff", "student", "parent"],
  },
  {
    name: "New User",
    // path: "/users",
    icon: <BookUser size={20} />,
    roles: ["superAdmin", "admin", "staff"],
    dropdown: [
      {
        name: "All Users",
        path: "/settings/usersList",
        roles: ["superAdmin", "admin"],
      },
      // { name: "Add Users", path: "/users/add", roles: ["superAdmin", "admin"]  },
    ],
  },
  {
    name: "Courses",
    // path: "/courses",
    icon: <BookOpenIcon size={20} />,
    roles: ["superAdmin", "admin", "staff"],
    dropdown: [
      {
        name: "All Courses",
        path: "/settings/courseList",
        roles: ["superAdmin", "admin", "staff"],
      },
      // { name: "Add Course", path: "/courses/add", roles: ["superAdmin", "admin"]  },
    ],
  },
  {
    name: "Students",
    // path: "/students",
    icon: <Users size={20} />,
    roles: ["superAdmin", "admin", "staff"],
    dropdown: [
      {
        name: "All Students",
        path: "/settings/studentList",
        roles: ["superAdmin", "admin", "staff"],
      },
      // { name: "Add Student", path: "/", roles: ["superAdmin", "admin"] },
    ],
  },
  {
    name: "Enquiry",
    icon: <HelpCircle size={20} />,
    roles: ["superAdmin", "admin"],
    dropdown: [
      {name: "New Enquiry", path: "/", roles: ["superAdmin", "admin"]},
      {name: "Manage Enquiry", path: "/", roles: ["superAdmin", "admin"]},
    ],
  },
  {
    name: "Enrollment",
    icon: <UserRoundPlus size={20} />,
    dropdown: [
      {
        name: "New Enrollment",
        path: "/",
        roles: ["superAdmin", "admin"],
      },
      {name: "Manage Enrollment", path: "/", roles: ["superAdmin", "admin"]},
    ],
  },
  {
    name: "Attendance",
    icon: <CalendarCheck2 size={20} />,
    roles: ["superAdmin", "admin"],
    dropdown: [
      {
        name: "Take Attendance",
        path: "/",
        roles: ["superAdmin", "admin"],
      },
      {
        name: "View Attendance",
        path: "/",
        roles: ["superAdmin", "admin"],
      },
    ],
  },
  {
    name: "Payment",
    icon: <IndianRupee size={20} />,
    roles: ["superAdmin", "admin"],
    dropdown: [
      {
        name: "Take Payment",
        path: "/",
        roles: ["superAdmin", "admin"],
      },
      {
        name: "View Payment",
        path: "/",
        roles: ["superAdmin", "admin"],
      },
    ],
  },
  {
    name: "Placement",
    icon: <BriefcaseBusiness size={20} />,
    roles: ["superAdmin", "admin"],
    dropdown: [
      {
        name: "Add Placement",
        path: "/",
        roles: ["superAdmin", "admin"],
      },
      {
        name: "Manage Placement",
        path: "/",
        roles: ["superAdmin", "admin"],
      },
    ],
  },
  {
    name: "Report",
    icon: <FileChartLine size={20} />,
    roles: ["superAdmin", "admin"],
    dropdown: [
      {
        name: "Manage Report",
        path: "/",
        roles: ["superAdmin", "admin"],
      },
    ],
  },
];

export const notifications = [
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
