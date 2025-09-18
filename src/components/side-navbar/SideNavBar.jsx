import { useState } from "react";
import NavBar from "../navbar/NavBar";
import { sideMenus } from "./list";
import { useNavigate } from "react-router-dom";
import { iconList } from "../../assets/iconMap";

function SideNavBar() {
  const [activeMenu, setActiveMenu] = useState("Home");
  const [activeSubMenu, setSubActiveMenu] = useState();
  const [isChildMenuOpen, setIsChildMenuOpen] = useState(false);
  const [sideNav, setSideNav] = useState(true);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu.name);

    if (menu.subItems) {
      setIsChildMenuOpen(!isChildMenuOpen && menu.subItems);
    } else {
      setIsChildMenuOpen(!isChildMenuOpen && menu.subItems);
      if (menu.path) {
        navigate(menu.path);
      }
    }
  };

  const handleSubMenuClick = (sub) => {
    setSubActiveMenu(sub.name);
    if (sub.path) {
      navigate(sub.path);
      setIsChildMenuOpen(!isChildMenuOpen);
    }
  };

  const searchIcon = (iconName) => {
    const IconComponent = iconList[iconName];
    return IconComponent ? <IconComponent size={20} /> : null;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {sideNav && (
        <aside className="w-20 md:w-24 bg-[#C72571] text-brand-light flex flex-col">
          <div className="p-4 flex flex-col items-center gap-2">
            {/* <div className="bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center font-bold">
            </div> */}
            <span className="hidden md:block font-poppins">NSCHOOL</span>
          </div>

          <nav className="flex-1 p-2 space-y-2">
            {sideMenus.map((menu) => (
              <div
                key={menu.name}
                onClick={() => handleMenuClick(menu)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-[#FCDDEC] hover:text-black cursor-pointer ${activeMenu === menu.name ? "bg-[#FCDDEC] text-black" : ""
                  }`}
              >
                <i className={`bi ${menu.icon}`}></i>
                <span className="hidden md:block">{menu.name}</span>
              </div>
            ))}
          </nav>
        </aside>
      )}

      {isChildMenuOpen && (
        <aside
          style={isChildMenuOpen ? { display: "block" } : { display: "none" }}
          className="relative md:absolute h-screen md:left-24 w-52 bg-[#C72571] border-x border-gray-200 p-4 overflow-y-auto"
        >
          <h3 className="text-xs font-bold text-white uppercase mb-3">
            {activeMenu}
          </h3>
          <ul className="space-y-2" style={{ paddingLeft: "0px" }}>
            {sideMenus
              .find((m) => m.name === activeMenu)
              ?.subItems?.map((sub, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSubMenuClick(sub)}
                  className={`flex items-center gap-2 cursor-pointer p-2 rounded  hover:bg-[#FCDDEC] hover:text-black text-white text-md  ${activeSubMenu === sub.name ? "bg-[#FCDDEC] text-black" : ""
                    }`}
                >
                  {sub.icon && searchIcon(sub.icon)}
                  {sub.name}
                </li>
              ))}
          </ul>
        </aside>
      )}

      {/* {isChildMenuOpen && (
        <aside className="relative md:absolute h-screen md:left-24 w-52 bg-[#0f172a] border-x border-gray-200 p-4 overflow-y-auto">
          <h3 className="text-xs font-bold text-white uppercase mb-3">
            {activeMenu}
          </h3>
          <ul className="space-y-2">
            {sideMenus
              .find((m) => m.name === activeMenu)
              ?.subItems?.map((item, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer p-2 rounded hover:bg-blue-400 text-white text-md"
                >
                  {item}
                </li>
              ))}
          </ul>
        </aside>
      )} */}

      <main className="flex-1 bg-gray-50 overflow-auto">
        <NavBar sideNav={sideNav} onSetSideNav={setSideNav} />
      </main>
    </div>
  );
}

export default SideNavBar;
