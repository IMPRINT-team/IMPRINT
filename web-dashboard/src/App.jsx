import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import PlaygroundPage from "./pages/playground/PlaygroundPage.jsx";
import AdminEvents from "./pages/adminEvents.jsx";
import AdminScanners from "./pages/adminScanners.jsx";
import AdminUsers from "./pages/adminUsers.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import { useThemeStore } from "./components/stores/useThemeStore.js";

const App = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (

    
    <Routes>
        {/* Root */}
        <Route
            path="/"
            element={
                <RequireAuth>
                <Dashboard />
                </RequireAuth>
            }
         />
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
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
        path="/admin/events"
        element={
          <RequireAuth>
            <AdminEvents />
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
        path="/admin/users"
        element={
          <RequireAuth>
            <AdminUsers />
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default App;

