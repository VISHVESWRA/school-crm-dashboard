import { FaBars } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import Login from "../../pages/auth/Login";
import LoginPage from "../../pages/auth/Login";

function NavBar({ sideNav, onSetSideNav }) {
  // const toggleTheme = () => {
  //     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  // };

  return (
    <>
      <div className="h-16 bg-white shadow flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSetSideNav((sideNav = !sideNav))}
            className="text-2xl text-gray-700"
          >
            <FaBars size={20} />
          </button>
        </div>

        <div className="flex items-center gap-6">
          <FaBell className="hover:text-blue-500" size={20} />
          <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-13 h-13 rounded-full border"
          />
        </div>
      </div>

      <LoginPage />
      <main className="p-3 bg-[#FCDDEC] h-full">
        {/* <div className="p-4 border-2 border-dashed border-gray-400 bg-gray-300 rounded-lg min-h-[calc(100vh-8rem)]"> */}
        <Outlet />
        {/* </div> */}
      </main>
    </>
  );
}

export default NavBar;
