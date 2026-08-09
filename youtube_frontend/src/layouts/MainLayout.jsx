import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import MobileSideBar from "../components/MobileSideBar.jsx";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        setIsSidebarOpen={setIsSidebarOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <MobileSideBar open={isMobileOpen} setOpen={setIsMobileOpen} />

      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />

        <main className="flex-1 p-4  overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
