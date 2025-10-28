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
    roles: ["admin", "staff", "student", "parent"],
  },
  {
    name: "New User",
    // path: "/users",
    icon: <BookUser size={20} />,
    roles: ["admin"],
    dropdown: [
      {name: "All Users", path: "/settings/usersList", roles: ["admin"]},
      // { name: "Add Users", path: "/users/add", roles: ["admin"]  },
    ],
  },
  {
    name: "Courses",
    // path: "/courses",
    icon: <BookOpenIcon size={20} />,
    roles: ["admin", "staff"],
    dropdown: [
      {
        name: "All Courses",
        path: "/settings/courseList",
        roles: ["admin", "staff"],
      },
      // { name: "Add Course", path: "/courses/add", roles: ["admin"]  },
    ],
  },
  {
    name: "Students",
    // path: "/students",
    icon: <Users size={20} />,
    roles: ["admin", "staff"],
    dropdown: [
      {
        name: "All Students",
        path: "/settings/studentList",
        roles: ["admin", "staff"],
      },
      // { name: "Add Student", path: "/", roles: ["admin"] },
    ],
  },
  {
    name: "Enquiry",
    icon: <HelpCircle size={20} />,
    roles: ["admin", "staff"],
    dropdown: [
      {name: "New Enquiry", path: "/", roles: ["admin", "staff"]},
      {name: "Manage Enquiry", path: "/", roles: ["admin"]},
    ],
  },
  {
    name: "Enrollment",
    icon: <UserRoundPlus size={20} />,
    dropdown: [
      {name: "New Enrollment", path: "/", roles: ["admin", "staff"]},
      {name: "Manage Enrollment", path: "/", roles: ["admin"]},
    ],
  },
  {
    name: "Attendance",
    icon: <CalendarCheck2 size={20} />,
    roles: ["admin", "staff"],
    dropdown: [
      {name: "Take Attendance", path: "/", roles: ["admin", "staff"]},
      {name: "View Attendance", path: "/", roles: ["admin", "staff"]},
    ],
  },
  {
    name: "Payment",
    icon: <IndianRupee size={20} />,
    roles: ["admin", "staff"],
    dropdown: [
      {name: "Take Payment", path: "/", roles: ["admin", "staff"]},
      {name: "View Payment", path: "/", roles: ["admin", "staff"]},
    ],
  },
  {
    name: "Placement",
    icon: <BriefcaseBusiness size={20} />,
    roles: ["admin", "staff"],
    dropdown: [
      {name: "Add Placement", path: "/", roles: ["admin", "staff"]},
      {name: "Manage Placement", path: "/", roles: ["admin", "staff"]},
    ],
  },
  {
    name: "Report",
    icon: <FileChartLine size={20} />,
    roles: ["admin", "staff"],
    dropdown: [{name: "Manage Report", path: "/", roles: ["admin", "staff"]}],
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
