import { FaBars } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../express/redux/LoginSlice";

function NavBar({ sideNav, onSetSideNav }) {
  // const toggleTheme = () => {
  //     setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  // };
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="h-16 bg-white shadow flex items-center justify-between px-4 text-black">
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
          {/* <img
            src="https://i.pravatar.cc/40"
            alt="User"
            className="w-13 h-13 rounded-full border"
          /> */}
        </div>

        <Menu as="div" className="relative inline-block">
          <MenuButton className="inline-flex w-full justify-center items-center gap-x-3 rounded-md bg-white px-3 py-2 
          text-sm font-semibold text-black shadow-xs inset-ring-1 inset-ring-gray-300
           hover:bg-gray-50 dark:bg-white/10 dark:text-white dark:shadow-none dark:inset-ring-white/5 dark:hover:bg-white/20">
            <div className="flex items-center gap-6">
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="w-12 h-12 rounded-full border"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-poppins text-md">
                {user.name}
              </span>
              <span className="text-sm font-poppins font-light">
                {user.role}
              </span>
            </div>
            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in dark:bg-gray-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                >
                  Account settings
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                >
                  Support
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                >
                  License
                </a>
              </MenuItem>
              <form action="#" method="POST">
                <MenuItem>
                  <button
                    type="submit"
                    onClick={() => dispatch(Logout())}
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden dark:text-gray-300 dark:data-focus:bg-white/5 dark:data-focus:text-white"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </form>
            </div>
          </MenuItems>
        </Menu>
      </div>

      {/* <LoginPage /> */}
      <main className="p-3 bg-[#FCDDEC] h-full">
        {/* <div className="p-4 border-2 border-dashed border-gray-400 bg-gray-300 rounded-lg min-h-[calc(100vh-8rem)]"> */}
        <Outlet />
        {/* </div> */}
      </main>
    </>
  );
}

export default NavBar;
