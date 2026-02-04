import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"
import PlaygroundPage from "./pages/playground/PlaygroundPage.jsx"
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
        </Routes>
    )
}
export default App
