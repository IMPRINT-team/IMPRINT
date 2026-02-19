import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/dashboard/NavBar.jsx";
import ImprintLogo from "../components/branding/ImprintLogo.jsx";

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-base-100 text-base-content">
      {/* Sidebar: Visible on MD+ screens, Drawer on small screens */}
      <NavBar
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      {/* Main Content Area */}
      <div className="relative flex h-full min-w-0 flex-1 flex-col">
        {/* Mobile Header: ONLY visible on screens SMALLER than MD (768px) */}
        <div className="flex shrink-0 items-center justify-between border-b border-base-300 p-3 md:hidden">
          <ImprintLogo className="text-primary size-8" />
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="btn btn-square btn-ghost btn-sm"
            aria-label="Open navigation menu"
            aria-controls="dashboard-drawer"
            aria-expanded={isDrawerOpen}
          >
            <Menu className="size-5" />
          </button>
        </div>

        {/* Page Content: Locked to screen height, handles its own scrolling */}
        <main className="flex-1 overflow-hidden p-2 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
