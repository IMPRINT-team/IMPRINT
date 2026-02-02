import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"
import PlaygroundPage from "./pages/playground/PlaygroundPage.jsx"
import { Routes, Route } from "react-router-dom"

const App = () => {
    return(
        <Routes>
            <Route path="/playground" element={<Dashboard />}/>
            <Route path="/playground/figma" element={<PlaygroundPage />}/>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default App
