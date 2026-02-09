import Dashboard from "./components/pages/Dashboard.jsx"
import Login from "./components/pages/Login.jsx"
import PlaygroundPage from "./components/pages/playground/PlaygroundPage.jsx"
import AdminEvents from "./components/pages/adminEvents.jsx"
import AdminScanners from "./components/pages/adminScanners.jsx"
import AdminUsers from "./components/pages/adminUsers.jsx"
import { Routes, Route } from "react-router-dom"
import { useThemeStore } from "./components/stores/useThemeStore.js"
import { useState, useEffect } from "react"

const App = () => {
    const theme = useThemeStore((state) => state.theme)
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme)
    }, [theme]);
    return(
        <Routes>
            <Route path="/playground" element={<Dashboard />}/>
            <Route path="/playground/figma" element={<PlaygroundPage />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/admin/events" element={<AdminEvents />}/>
            <Route path="/admin/scanners" element={<AdminScanners />}/>
            <Route path="/admin/users" element={<AdminUsers />}/>
        </Routes>
    )
}
export default App
