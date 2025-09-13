import { Outlet } from "react-router-dom";
import SideNavBar from "./side-navbar/SideNavBar";
import NavBar from "./navbar/NavBar";

export default function AppLayout() {
    return (
        <>
            <SideNavBar />
        </>
    );
}