import { PiStudentFill } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaPersonSwimming } from "react-icons/fa6";
import { BsPersonSlash } from "react-icons/bs";


export default function Home() {

    return (
        <>
            <div className="grid grid-cols-3 gap-5 sm:gap-3 mt-4">
                <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
                    <PiStudentFill size={35} className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-13" />
                    <span className="flex sm:justify-end">Students</span>
                    <span className="flex justify-end">200</span>
                </div>
                <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
                    <GiTeacher size={35} className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-13" />
                    <span className="sm:flex sm:justify-end">Total Staffs</span>
                    <span className="flex justify-end">80</span>
                </div>
                <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
                    <FaIndianRupeeSign size={35} className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-12" />

                    <span className="flex sm:justify-end">Revenue</span>
                    <span className="flex justify-end">20000</span>
                </div>
                <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
                    <FaPersonSwimming size={33} className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-12" />

                    <span className="flex sm:justify-end">Active Students</span>
                    <span className="flex justify-end">180</span>
                </div>
                <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
                    <BsPersonSlash size={35} className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-13" />

                    <span className="flex sm:justify-end">Inactive Students</span>
                    <span className="flex justify-end">20</span>
                </div>
            </div>
        </>
    )
}