import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useThemeStore } from "./components/stores/useThemeStore.js";

import Dashboard from "./pages/Dashboard.jsx";
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
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/playground"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/playground/figma"
        element={
          <RequireAuth>
            <PlaygroundPage />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/users"
        element={
          <RequireAuth>
            <AdminUsers />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/scanners"
        element={
          <RequireAuth>
            <AdminScanners />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/events"
        element={
          <RequireAuth>
            <AdminEvents />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;