import {useThemeStore} from "../stores/useThemeStore.js"

const BASE_URL = "http://localhost:5173/"

const NavBar = () => {
  return (
    <div>
      <div aria-label="Primary" className="navbar flex rounded-full border border-primary bg-base-100 shadow-sm row-span-2 align-content-center justify-around">
        <a href="">Users</a>
        <a href="">Scanners</a>
        <a href="">Events</a>
      </div>
    </div>
  );
  }

export default NavBar
