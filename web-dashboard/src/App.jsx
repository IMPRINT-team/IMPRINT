import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"
import { Routes, Route } from "react-router-dom"

const App = () => {
    return(
        <Routes>
            <Route path="/playground" element={<Dashboard />}/>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default App
