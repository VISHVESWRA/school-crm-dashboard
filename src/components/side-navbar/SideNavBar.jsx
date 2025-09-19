import { useState } from "react";
import NavBar from "../navbar/NavBar";
import { sideMenus } from "./list";
import { useNavigate } from "react-router-dom";
import { iconList } from "../../assets/iconMap";
import "./SideNavBar.css";

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
        <aside className="w-20 md:w-24 bg-[#C72571] flex flex-col">
          <div className="p-4 flex flex-col items-center gap-2">
            <span className="font-poppins text-black text-lg hidden md:block">
              NSCHOOL
            </span>
          </div>

          <nav className="flex-1 p-2 space-y-2">
            {sideMenus.map((menu) => (
              <div
                key={menu.name}
                onClick={() => handleMenuClick(menu)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg text-black hover:bg-[#FCDDEC] cursor-pointer ${
                  activeMenu === menu.name ? "bg-[#FCDDEC] text-black" : ""
                }`}
              >
                {menu.icon && searchIcon(menu.icon)}
                <span className="font-poppins hidden md:block">
                  {menu.name}
                </span>
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
          <h3 className="text-xs font-bold text-white font-poppins uppercase mb-3">
            {activeMenu}
          </h3>
          <ul className="space-y-2" style={{ paddingLeft: "0px" }}>
            {sideMenus
              .find((m) => m.name === activeMenu)
              ?.subItems?.map((sub, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSubMenuClick(sub)}
                  style={
                    activeSubMenu === sub.name
                      ? { backgroundColor: "#FCDDEC", color: "black" }
                      : { backgroundColor: "", color: "" }
                  }
                  className="flex items-center gap-2 cursor-pointer p-2 rounded font-poppins text-black hover:bg-[#FCDDEC] text-md"
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
