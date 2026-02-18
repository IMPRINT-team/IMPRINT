import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./components/stores/useThemeStore.js";

import DashboardLayout from "./pages/DashboardLayout.jsx";
import HomeDashboard from "./pages/HomeDashboard.jsx";
import Login from "./pages/Login.jsx";
import PlaygroundPage from "./pages/playground/PlaygroundPage.jsx";
import AdminEvents from "./pages/adminEvents.jsx";
import AdminScanners from "./pages/adminScanners.jsx";
import AdminUsers from "./pages/adminUsers.jsx";
import RequireAuth from "./components/RequireAuth.jsx";

const App = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        <Route index element={<HomeDashboard />} />
        <Route path="playground" element={<HomeDashboard />} />
        <Route path="playground/figma" element={<PlaygroundPage />} />
        <Route path="admin/users" element={<AdminUsers />} />
        <Route path="admin/scanners" element={<AdminScanners />} />
        <Route path="admin/events" element={<AdminEvents />} />
      </Route>
    </Routes>
  );
};

export default App;
