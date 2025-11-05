import {PiStudentFill} from "react-icons/pi";
import {GiTeacher} from "react-icons/gi";
import {FaIndianRupeeSign} from "react-icons/fa6";
import {FaPersonSwimming} from "react-icons/fa6";
import {BsPersonSlash} from "react-icons/bs";
import {
  Users,
  TrendingUp,
  Activity,
  SquareCode,
  FileSearch2,
  ShieldUser,
} from "lucide-react";
import {useEffect, useState} from "react";
import {getTotalLength} from "../../express/api/GetDataApi";
import {Spinner} from "react-bootstrap";

export default function Home() {
  const [stats, setStats] = useState({students: 0, courses: 0, users: 0});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setError("");
        const res = await getTotalLength();
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(
          err.response?.data?.message || err.message || "Something went wrong"
        );
      }
    };
    fetchStats();
  }, []);

  // if (!stats && !error) return <Spinner />;

  // if (error) return <div className="text-red-500">{error}</div>;

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-center bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between w-full">
            <div className="p-3 rounded-xl bg-pink-50">
              <Users className="w-8 h-8 text-pink-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Total Students</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">
                {stats.students}
              </h2>
              {/* <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +12.5%
                </span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between w-full">
            <div className="p-3 rounded-xl bg-pink-50">
              <SquareCode className="w-8 h-8 text-pink-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Total Courses</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">
                {stats.courses}
              </h2>
              {/* <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +12.5%
                </span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between w-full">
            <div className="p-3 rounded-xl bg-pink-50">
              <ShieldUser className="w-8 h-8 text-pink-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Total Users</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">
                {stats.users}
              </h2>
              {/* <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +12.5%
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between w-full">
            <div className="p-3 rounded-xl bg-green-50">
              <FileSearch2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Total Enquiry</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">150</h2>
              {/* <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +2.1%
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between w-full">
            <div className="p-3 rounded-xl bg-purple-50">
              <Activity className="w-8 h-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Active Students</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">1,249</h2>
              {/* <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +8.3%
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between w-full">
            <div className="p-3 rounded-xl bg-orange-50">
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Discontinued Students</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">10</h2>
              {/* <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +0.5%
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center justify-between w-full">
            <div className="p-3 rounded-xl bg-orange-50">
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Placement Details</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">180</h2>
              {/* <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +0.5%
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-orange-50">
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Course Completion</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">89.7%</h2>
              {/* <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +0.5%
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-orange-50">
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Total Collections</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">89.7%</h2>
              {/* <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +0.5%
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="flex items-center">
            <div className="p-3 rounded-xl bg-orange-50">
              <Activity className="w-8 h-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600 text-sm">Payment Pending</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-0">89.7%</h2>
              {/* <div className="flex items-center mt-1">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-500 text-xs font-medium">
                  +0.5%
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-3 gap-5 sm:gap-3 mt-4">
        <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
          <PiStudentFill
            size={35}
            className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-13"
          />
          <span className="flex sm:justify-end">Students</span>
          <span className="flex justify-end">200</span>
        </div>
        <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
          <GiUser
            size={35}
            className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-13"
          />
          <span className="sm:flex sm:justify-end">Total Staffs</span>
          <span className="flex justify-end">80</span>
        </div>
        <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
          <FaIndianRupeeSign
            size={35}
            className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-12"
          />

          <span className="flex sm:justify-end">Revenue</span>
          <span className="flex justify-end">20000</span>
        </div>
        <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
          <FaPersonSwimming
            size={33}
            className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-12"
          />

          <span className="flex sm:justify-end">Active Students</span>
          <span className="flex justify-end">180</span>
        </div>
        <div className="col-span-3 sm:col-span-1 border-2 border-gray-500 p-2 relative">
          <BsPersonSlash
            size={35}
            className="bg-[#FCDDEC] relative sm:absolute bottom-8 sm:bottom-13"
          />

          <span className="flex sm:justify-end">Inactive Students</span>
          <span className="flex justify-end">20</span>
        </div>
      </div> */}
    </>
  );
}
