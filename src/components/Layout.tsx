
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import AnnouncementBanner from "./AnnouncementBanner";
import { useAuth } from "@/hooks/useAuth";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        <main className="flex-1 p-4 md:p-6 transition-all duration-300">
          {user && (
            <div className="container mx-auto px-4 py-2">
              <AnnouncementBanner />
            </div>
          )}
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
