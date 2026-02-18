import React, { useState } from "react";
import { Menu } from "lucide-react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/dashboard/NavBar.jsx";
import ImprintLogo from "../components/branding/ImprintLogo.jsx";
import ThemeSelector from "../components/dashboard/ThemeSelector.jsx";

const DashboardLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-base-100 text-base-content">
      <div className="mx-auto flex h-full max-w-screen-2xl flex-col p-3 lg:p-4">
        {/* Header */}
        <header className="shrink-0">
          <div className="flex items-center justify-between gap-4">
            <ImprintLogo
              className="text-primary size-14 shrink-0"
              aria-hidden="true"
            />
            <ThemeSelector />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className="btn btn-sm btn-outline border-primary"
              aria-label="Open navigation menu"
              aria-controls="dashboard-drawer"
              aria-expanded={isDrawerOpen}
            >
              <Menu className="size-4" aria-hidden="true" />
              Menu
            </button>

            <div className="divider divider-primary my-0 flex-1" />
          </div>
        </header>

        {/* Drawer */}
        <NavBar
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />

        {/* Page Content */}
        <main className="mt-3 min-h-0 flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
