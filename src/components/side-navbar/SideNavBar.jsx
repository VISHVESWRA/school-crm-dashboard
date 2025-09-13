import { useEffect, useState } from 'react';
import NavBar from '../navbar/NavBar';
import { FaHome } from "react-icons/fa";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa";

function SideNavBar() {

    const navItems = [
        { name: "Dashboard", href: "#" },
        { name: "Profile", href: "#" },
        { name: "Settings", href: "#" },
        { name: "Logout", href: "#" },
    ];

    return (
        <>
            <div className="flex">
                {/* Sidebar */}
                <aside className="h-screen w-30 bg-black text-white flex flex-col">
                    <div className="p-3 flex justify-center">
                        <FaReact size={40} />
                    </div>
                    <nav className="flex-1 space-y-2 p-2">
                        <div className='flex flex-col items-center hover:bg-gray-100 hover:text-black'>
                            <FaHome size={30} />
                            Home
                        </div>
                        <div className='flex flex-col justify-between items-center hover:bg-gray-100 hover:text-black'>
                            <IoPersonCircleOutline size={30} />
                            Profile
                        </div>
                        <a
                            style={{ textDecoration: 'none' }}
                            href="#"
                            className="block px-4 py-2 text-white rounded-md hover:bg-blue-500 no-underline"
                        >
                            Settings
                        </a>
                        <a
                            style={{ textDecoration: 'none' }}
                            href="#"
                            className="block px-4 py-2 text-white rounded-md hover:bg-blue-500 no-underline"
                        >
                            Logout
                        </a>
                    </nav>
                </aside>

                {/* Main Content */}
                {/* <main className="flex-1 p-6 bg-gray-100">
                    <h1 className="text-2xl font-semibold">Welcome!</h1>
                    <p className="mt-2 text-gray-600">
                        This is your main content area.
                    </p>
                </main> */}
                <main className='w-full'>
                    <>
                        <NavBar />
                    </>
                </main>
            </div>
        </>
    )
}

export default SideNavBar;