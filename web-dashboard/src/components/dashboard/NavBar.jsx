import ThemeSelector from "./ThemeSelector.jsx"
import {useThemeStore} from "../stores/useThemeStore.js"

const BASE_URL = "http://localhost:5173/"

const NavBar = () => {
  return (
    <div>
      <div aria-label="Primary" className="navbar flex rounded-3xl border border-primary bg-base-100 px-6 pt-4 shadow-sm row-span-2 align-content-center justify-around">
        <a href="">Users</a>
        <a href="">Scanners</a>
        <a href="">Events</a>
        <a href="">Users</a>
        <ThemeSelector />
      </div>
    </div>
  );
  }

export default NavBar
