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
    },
    {
        name: "New User",
        // path: "/users",
        icon: <BookUser size={20} />,
        dropdown: [
            { name: "All Users", path: "/settings/usersList" },
            // { name: "Add Users", path: "/users/add" },
        ],
    },
    {
        name: "Students",
        // path: "/students",
        icon: <Users size={20} />,
        dropdown: [
            { name: "All Students", path: "/settings/studentList" },
            // { name: "Add Student", path: "/" },
        ],
    },
    {
        name: "Courses",
        // path: "/courses",
        icon: <BookOpenIcon size={20} />,
        dropdown: [
            { name: "All Courses", path: "/settings/courseForm" },
            // { name: "Add Course", path: "/courses/add" },
        ],
    },
    {
        name: "Enquiry",
        icon: <HelpCircle size={20} />,
        dropdown: [
            { name: "New Enquiry", path: "/" },
            { name: "Manage Enquiry", path: "/" },
        ],
    },
    {
        name: "Enrollment",
        icon: <UserRoundPlus size={20} />,
        dropdown: [
            { name: "New Enrollment", path: "/" },
            { name: "Manage Enrollment", path: "/" },
        ],
    },
    {
        name: "Attendance",
        icon: <CalendarCheck2 size={20} />,
        dropdown: [
            { name: "Take Attendance", path: "/" },
            { name: "View Attendance", path: "/" },
        ],
    },
    {
        name: "Payment",
        icon: <IndianRupee size={20} />,
        dropdown: [
            { name: "Take Payment", path: "/" },
            { name: "View Payment", path: "/" },
        ],
    },
    {
        name: "Placement",
        icon: <BriefcaseBusiness size={20} />,
        dropdown: [
            { name: "Add Placement", path: "/" },
            { name: "Manage Placement", path: "/" },
        ],
    },
    {
        name: "Report",
        icon: <FileChartLine size={20} />,
        dropdown: [{ name: "Manage Report", path: "/" }],
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